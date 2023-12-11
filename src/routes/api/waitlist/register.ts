import { ApiHandler } from "solid-start/api/types";
import { json } from "solid-start";

import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY");
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const GET: ApiHandler = async () => {
    return json({
        type: "error",
        message: "Method not allowed",
    });
};

export const POST: ApiHandler = async ({ request }) => {
    const { email } = await request.json();

    if (!email) {
        return json({
            type: "error",
            message: "Email is required",
        });
    }

    const { data, error } = await supabase.from("waitlist").insert({ email });

    if (error) {
        return json({
            type: "error",
            message: error.message,
        });
    }

    return json({
        type: "success",
        message: "You have been added to the waitlist",
    });
};
