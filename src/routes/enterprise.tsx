import { createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Button from "~/components/Button";

import "./subpage.scss";

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
    });

    return (
        <>
            <Header />
            <div class="sub-page">
                <div class="sub-page__text">
                    <h1 class="sub-page__text__heading">RelaGit Enterprise Program.</h1>
                    <h2 class="sub-page__text__subheading">If you or your company are interested in using RelaGit in the workplace, consider paying for an Enterprise license.</h2>
                </div>
                <div class="sub-page__buttons">
                    <Button disabled>Make an Inquiry</Button>
                </div>
            </div>
            <img loading="lazy" src="/assets/landing/beta-decorations.png" aria-hidden="true" alt="Blurry background gradient blobs" class="decorations" />
        </>
    );
};
