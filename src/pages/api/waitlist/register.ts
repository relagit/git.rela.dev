import type { APIRoute } from "astro";
import { json } from "../_shared";

import { createClient } from "@supabase/supabase-js";

if (!import.meta.env.SUPABASE_URL || !import.meta.env.SUPABASE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY");
}

const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_KEY,
);

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

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
        const knownError = error.message.includes("waitlist_email_key")
            ? "Email already registered"
            : null;
        return json({
            type: "error",
            message: knownError || error.message,
        });
    }

    return json({
        type: "success",
        message: "You have been added to the waitlist",
    });
};
