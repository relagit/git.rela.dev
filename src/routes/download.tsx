import { createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Icon from "~/components/Icon";

import "./subpage.scss";

export default () => {
    const [innerWidth, setInnerWidth] = createSignal(0);
    const [os, setOS] = createSignal<"mac" | "windows" | "linux" | "mobile" | "mac-arm">("mac");
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

        return;

        switch (os()) {
            case "mac":
                window.location.href = "https://github.com/relagit/relagit/releases/latest/download/RelaGit-mac-x64.dmg";

                break;
            case "mac-arm":
                window.location.href = "https://github.com/relagit/relagit/releases/latest/download/RelaGit-mac-arm64.dmg";

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
            <div class="sub-page">
                <div class="sub-page__text">
                    <h1 class="sub-page__text__heading">Nothing here.</h1>
                    <h2 class="sub-page__text__subheading">You're too early! We haven't released anything yet.</h2>
                </div>
            </div>
            <img src="/assets/landing/decorations.png" aria-hidden="true" alt="decorations" class="decorations" />
        </>
    );
};
