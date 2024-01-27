import { createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Button from "~/components/Button";

import "./subpage.scss";
import { Meta } from "solid-start";

export default () => {
    const [os, setOS] = createSignal<"mac" | "windows" | "linux" | "mobile">("mac");

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
    });

    return (
        <>
            <Meta property="og:title" content="RelaGit - Enterprise" />
            <Meta property="og:description" content="The elegant solution to graphical version control. Built by developers, for developers." />
            <Meta property="og:image" content="https://git.rela.dev/assets/opengraph.png" />
            <Meta property="og:url" content="https://git.rela.dev/enterprise" />

            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:title" content="RelaGit - Enterprise" />
            <Meta name="twitter:description" content="The elegant solution to graphical version control. Built by developers, for developers." />
            <Meta name="twitter:image" content="https://git.rela.dev/assets/opengraph.png" />

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
            <img loading="lazy" src="/assets/landing/beta-decorations.webp" aria-hidden="true" alt="Blurry background gradient blobs" class="decorations" />
        </>
    );
};
