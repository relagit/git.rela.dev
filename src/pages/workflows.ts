import { type APIRoute } from "astro";

export const GET: APIRoute = () => {
    return new Response(undefined, {
        status: 302,
        headers: {
            location: "https://git.rela.dev/docs/workflows/creating-workflows",
        },
    });
};
