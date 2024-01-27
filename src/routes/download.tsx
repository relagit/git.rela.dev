import { Show, createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Icon from "~/components/Icon";

import "./subpage.scss";
import { Meta } from "solid-start";

export default () => {
    const [os, setOS] = createSignal<"mac" | "windows" | "linux" | "mobile" | "mac-arm">();
    const [url, setURL] = createSignal<string>();

    const isReleased = Date.now() > new Date("Sat Feb 10 2024 0:01:00 PST").getTime();
    // const isReleased = true;

    onMount(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();

        if (userAgent.includes("iPhone") || userAgent.includes("iPad") || userAgent.includes("android")) {
            setOS("mobile");
        }

        if (userAgent.includes("win")) {
            setOS("windows");
        } else if (userAgent.includes("mac")) {
            setOS("mac");
        } else if (userAgent.includes("linux")) {
            setOS("linux");
        }

        // https://stackoverflow.com/questions/65146751/detecting-apple-silicon-mac-in-javascript
        const w = document.createElement("canvas").getContext("webgl");
        const d = w?.getExtension("WEBGL_debug_renderer_info");
        const g = (d && w?.getParameter(d.UNMASKED_RENDERER_WEBGL)) || "";

        if (g.match(/Apple/) && !g.match(/Apple GPU/)) {
            setOS("mac-arm");
        } else if (g.match(/Apple GPU/) && w?.getSupportedExtensions()?.indexOf("WEBKIT_WEBGL_compressed_texture_pvrtc") !== -1) {
            setOS("mac-arm");
        }

        switch (os()) {
            case "mac":
                setURL("https://github.com/relagit/relagit/releases/latest/download/RelaGit-mac-x64.dmg");

                break;
            case "mac-arm":
                setURL("https://github.com/relagit/relagit/releases/latest/download/RelaGit-mac-arm64.dmg");

                break;
            case "windows":
                setURL("https://github.com/relagit/relagit/releases/latest/download/RelaGit-win.zip");

                break;
            case "linux":
                setURL("https://github.com/relagit/relagit/releases/latest");

                break;
        }

        if (!isReleased) return;

        if (url()) window.open(url(), "_blank");
    });

    return (
        <>
            <Meta property="og:title" content="RelaGit - Download" />
            <Meta property="og:description" content="The elegant solution to graphical version control. Built by developers, for developers." />
            <Meta property="og:image" content="https://git.rela.dev/assets/opengraph.png" />
            <Meta property="og:url" content="https://git.rela.dev/enterprise" />

            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:title" content="RelaGit - Download" />
            <Meta name="twitter:description" content="The elegant solution to graphical version control. Built by developers, for developers." />
            <Meta name="twitter:image" content="https://git.rela.dev/assets/opengraph.png" />

            <Header />
            <Show
                when={isReleased}
                fallback={
                    <div class="sub-page">
                        <div class="sub-page__text">
                            <h1 class="sub-page__text__heading">
                                <div class="sub-page__text__heading__detail">We haven't released anything yet.</div>
                                You're too early!
                            </h1>
                        </div>
                    </div>
                }
            >
                <div class="sub-page">
                    <div class="sub-page__text">
                        <h1 class="sub-page__text__heading">
                            <div class="sub-page__text__heading__detail">You just levelled up!</div>
                            Next Steps
                        </h1>
                    </div>
                    <div class="sub-page__steps">
                        <a href="/docs" class="sub-page__steps__step">
                            Check out the RelaGit documentation to learn more about the client.
                            <Icon name="book" />
                        </a>
                        <a href="https://www.npmjs.com/search?q=relagit" class="sub-page__steps__step">
                            Search for community Workflows on npm.
                            <Icon name="workflow" />
                        </a>
                        <a href="/redirect/github" class="sub-page__steps__step">
                            Check out relagit/relagit on GitHub.
                            <Icon name="mark-github" />
                        </a>
                    </div>
                    <div class="sub-page__note">
                        <a class="sub-page__note__link" href={url()} target="_blank">
                            Didn't download?
                        </a>
                        <a class="sub-page__note__tag" href="https://github.com/relagit/relagit/releases/latest">
                            {os() === "mac"
                                ? "macOS"
                                : os() === "mac-arm"
                                ? "macOS (Apple Silicon)"
                                : os() === "windows"
                                ? "Windows"
                                : os() === "linux"
                                ? "Linux"
                                : os() === "mobile"
                                ? "Unavailable on mobile"
                                : "Unknown"}
                        </a>
                    </div>
                </div>
            </Show>
            <img loading="lazy" src="/assets/landing/decorations.webp" aria-hidden="true" alt="Blurry background gradient blobs" class="decorations" />
        </>
    );
};
