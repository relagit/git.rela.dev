"use server";

import type { APIRoute } from "astro";

import { json } from "../_shared";

let release:
    | {
          tag_name: string;
          published_at: string;
          assets: { download_count: number; name: string }[];
      }[]
    | undefined;

export const GET: APIRoute = async () => {
    const release = await getRelease();

    const downloads = release?.reduce(
        (acc, curr) =>
            acc +
            curr.assets.reduce((a, c) => {
                if (!c.name.includes("latest-")) {
                    return a + c.download_count;
                }

                return a;
            }, 0),
        0,
    );

    if (!release) {
        return json({ error: "Failed to fetch release" });
    }

    return json(
        {
            tag: release[0].tag_name,
            published: release[0].published_at,
            downloads,
        },
        {
            "Cache-Control":
                "max-age=0, s-maxage=86400, stale-while-revalidate",
        },
    );
};

export const getRelease = async (): Promise<
    | {
          tag_name: string;
          published_at: string;
          assets: { download_count: number; name: string }[];
      }[]
    | undefined
> => {
    if (!release) {
        release = await fetch(
            "https://api.github.com/repos/relagit/relagit/releases",
            {
                headers: {
                    Authorization: `token ${import.meta.env.GITHUB_TOKEN}`,
                },
            },
        ).then((res) => res.json());
    }

    return release;
};
