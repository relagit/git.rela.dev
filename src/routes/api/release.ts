import { json } from "solid-start";

let release: any;

export const GET = async () => {
    release = await fetch("https://api.github.com/repos/relagit/relagit/releases/latest", {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    }).then((res) => res.json());

    return json({
        tag: release.tag_name,
        published: release.published_at,
    });
};
