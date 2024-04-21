import { type APIRoute } from "astro";

export const GET: APIRoute = () => {
    return new Response(undefined, {
        status: 302,
        headers: {
            location: "https://rela.dev/docs/press/branding",
        },
    });
};
