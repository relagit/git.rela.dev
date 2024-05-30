import type { APIRoute } from "astro";
import { json } from "../_shared";

export const POST: APIRoute = async () => {
    return json(
        { error: "This endpoint is no longer available." },
        undefined,
        410,
    );
};

export const GET: APIRoute = async () => {
    return json({ error: "Invalid method" });
};
