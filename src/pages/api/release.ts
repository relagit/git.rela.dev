import type { APIRoute } from "astro";

import { json } from "./_shared";

let release: any;

export const GET: APIRoute = async () => {
    release = await fetch(
        "https://api.github.com/repos/relagit/relagit/releases/latest",
        {
            headers: {
                Authorization: `token ${import.meta.env.GITHUB_TOKEN}`,
            },
        },
    ).then((res) => res.json());

    return json({
        tag: release.tag_name,
        published: release.published_at,
    });
};
