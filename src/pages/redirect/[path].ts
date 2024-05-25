import { type APIRoute } from "astro";

const redirects: Record<string, string> = {
    github: "https://github.com/relagit/relagit",
    producthunt: "https://www.producthunt.com/posts/relagit",
    sponsor: "https://github.com/sponsors/TheCommieAxolotl",
    twitter: "https://twitter.com/withrela",
    discord: "https://discord.gg/ptc9nku6tD",
};

export const GET: APIRoute = ({ params, redirect }) => {
    if (!params.path || !redirects[params.path]) return redirect("/404");

    return new Response(undefined, {
        status: 302,
        headers: {
            location: redirects[params.path!],
        },
    });
};
