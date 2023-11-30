import { createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Icon from "~/components/Icon";

import "./download.scss";

export default () => {
    const [innerWidth, setInnerWidth] = createSignal(0);
    const [os, setOS] = createSignal<"mac" | "windows" | "linux" | "mobile">("mac");
    const [top, setTop] = createSignal(0);

    onMount(() => {
        setTop(window.scrollY);
        setInnerWidth(window.innerWidth);

        window.addEventListener("scroll", () => {
            setTop(window.scrollY);
        });

        window.addEventListener("resize", () => {
            setInnerWidth(window.innerWidth);
        });

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

        switch (os()) {
            case "mac":
                window.location.href = "https://github.com/relagit/relagit/releases/latest/download/RelaGit-mac.dmg";

                break;
            case "windows":
                window.location.href = "https://github.com/relagit/relagit/releases/latest/download/RelaGit-win.zip";

                break;
            case "linux":
                window.location.href = "https://github.com/relagit/relagit/releases/latest";

                break;
        }
    });

    return (
        <>
            <Header top={() => 1000} innerWidth={innerWidth} />
            <div class="download-page">
                <div class="download-page__text">
                    <h1 class="download-page__text__heading">Nothing here.</h1>
                    <h2 class="download-page__text__subheading">You're too early! We haven't released anything yet.</h2>
                </div>
                {/* <div class="download-page__text">
                    <h1 class="download-page__text__heading">You just levelled up!</h1>
                    <h2 class="download-page__text__subheading">Downloading RelaGit is just the beginning...</h2>
                </div>
                <div class="download-page__steps">
                    <a class="download-page__steps__step" href="/redirect/workflows">
                        <div class="download-page__steps__step__text">Browse the awesome community made workflows.</div>
                        <Icon name="arrow-right" />
                    </a>
                    <a class="download-page__steps__step" href="/redirect/themes">
                        <div class="download-page__steps__step__text">Find a theme that fits your style.</div>
                        <Icon name="paintbrush" />
                    </a>
                    <a class="download-page__steps__step" href="/docs">
                        <div class="download-page__steps__step__text">Read up on how to develop your own addons.</div>
                        <Icon name="book" />
                    </a>
                </div>
                <a href="https://github.com/relagit/relagit/releases/latest" class="download-page__link" target="_blank" rel="noopener noreferrer">
                    Didn't open?
                </a> */}
            </div>
            <img src="/assets/landing/decorations.png" aria-hidden="true" alt="decorations" class="decorations" />
        </>
    );
};
