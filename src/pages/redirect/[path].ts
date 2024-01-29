import { type APIRoute } from "astro";

const redirects: Record<string, string> = {
    github: "https://github.com/relagit/relagit",
    producthunt: "https://www.producthunt.com/products/relagit",
    sponsor: "https://github.com/sponsors/TheCommieAxolotl",
    twitter: "https://twitter.com/withrela",
};

export const GET: APIRoute = ({ params }) => {
    if (!params.path || !redirects[params.path])
        new Response(undefined, {
            status: 304,
            headers: {
                location: "/404",
            },
        });

    return new Response(undefined, {
        status: 302,
        headers: {
            location: redirects[params.path!],
        },
    });
};
