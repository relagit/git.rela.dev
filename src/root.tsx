// @refresh reload
import { A, Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from "solid-start";
import { Suspense, onMount } from "solid-js";

import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";

import "./root.scss";

export default () => {
    onMount(() => {
        inject();

        injectSpeedInsights({});
    });

    return (
        <Html lang="en">
            <Head>
                <script defer src="https://eu.umami.is/script.js" data-website-id="2cbb5a7f-ca34-49cd-8c74-03a9509e9964"></script>
                <Title>RelaGit</Title>
                <Meta name="description" content="The elegant solution to graphical version control. Built by developers, for developers." />
                <Meta charset="utf-8" />
                <Meta
                    name="keywords"
                    content="git, github, gitlab, git workflow, git management, git productivity, git tools, git desktop, git desktop app, git desktop application, git desktop client, git desktop software, git desktop tool, git desktop tools, git desktop utility, relagit"
                />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
                <Link rel="icon" href="https://rela.dev/assets/relagit-light.svg" />

                <Meta name="theme-color" content="#1c84ec" />
                <Meta name="msapplication-navbutton-color" content="#1c84ec" />
                <Meta name="apple-mobile-web-app-status-bar-style" content="#1c84ec" />

                <Meta property="og:title" content="RelaGit" />
                <Meta property="og:description" content="The elegant solution to graphical version control. Built by developers, for developers." />
                <Meta property="og:image" content="https://git.rela.dev/assets/opengraph.png" />
                <Meta property="og:url" content="https://git.rela.dev" />
                <Meta property="og:type" content="website" />

                <Meta name="twitter:card" content="summary_large_image" />
                <Meta name="twitter:title" content="RelaGit" />
                <Meta name="twitter:description" content="The elegant solution to graphical version control. Built by developers, for developers." />
                <Meta name="twitter:image" content="https://git.rela.dev/assets/opengraph.png" />
                <Meta name="twitter:url" content="https://git.rela.dev" />
            </Head>
            <Body>
                <Suspense>
                    <ErrorBoundary>
                        <Routes>
                            <FileRoutes />
                        </Routes>
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    );
};
