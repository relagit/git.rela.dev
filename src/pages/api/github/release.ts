"use server";

import type { APIRoute } from "astro";

import { json } from "../_shared";

let release:
    | {
          tag_name: string;
          published_at: string;
      }
    | undefined;

export const GET: APIRoute = async () => {
    const release = await getRelease();

    if (!release) {
        return json({ error: "Failed to fetch release" });
    }

    return json(
        {
            tag: release.tag_name,
            published: release.published_at,
        },
        {
            "Cache-Control":
                "max-age=0, s-maxage=86400, stale-while-revalidate",
        },
    );
};

export const getRelease = async (): Promise<
    { tag_name: string; published_at: string } | undefined
> => {
    if (!release) {
        release = await fetch(
            "https://api.github.com/repos/relagit/relagit/releases/latest",
            {
                headers: {
                    Authorization: `token ${import.meta.env.GITHUB_TOKEN}`,
                },
            },
        ).then((res) => res.json());
    }

    return release;
};
