import { drizzle } from "drizzle-orm/postgres-js";
import type { APIRoute } from "astro";
import { waitlist } from "~/schema";
import { json } from "../_shared";
import postgres from "postgres";

if (!import.meta.env.SUPABASE_URL) {
    throw new Error("Missing SUPABASE_URL");
}

const client = postgres(import.meta.env.SUPABASE_URL);
const db = drizzle(client);

export const GET: APIRoute = async () => {
    return json({
        type: "error",
        message: "Method not allowed",
    });
};

export const POST: APIRoute = async ({ request }) => {
    const { email } = await request.json();

    if (!email) {
        return json({
            type: "error",
            message: "Email is required",
        });
    }

    let _error = null;

    try {
        await db.insert(waitlist).values({
            email,
        });
    } catch (e) {
        _error = e;
    }

    if (_error) {
        const error = _error as Error;

        const knownError =
            error.message?.includes("waitlist_email_key") ?
                "Email already registered"
            :   null;

        return json({
            type: "error",
            message: knownError || error.message || "An error occurred",
        });
    }

    return json({
        type: "success",
        message: "You have been added to the waitlist",
    });
};
