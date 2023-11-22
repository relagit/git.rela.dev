// @refresh reload
import { A, Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from "solid-start";
import { Suspense, onMount } from "solid-js";

import { inject } from "@vercel/analytics";

import "./root.scss";

export default () => {
    onMount(() => {
        inject();
    });

    return (
        <Html lang="en">
            <Head>
                <Title>RelaGit</Title>
                <Meta name="description" content="RelaGit is a next-generation git client that is built to empower the development workflow." />
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
                <Link rel="icon" href="https://rela.dev/assets/relagit-light.svg" />

                <Meta name="theme-color" content="#1c84ec" />
                <Meta name="msapplication-navbutton-color" content="#1c84ec" />
                <Meta name="apple-mobile-web-app-status-bar-style" content="#1c84ec" />

                <Meta property="og:title" content="RelaGit" />
                <Meta property="og:description" content="RelaGit is a next-generation git client that is built to empower the development workflow." />
                <Meta property="og:image" content="https://git.rela.dev/assets/opengraph.png" />
                <Meta property="og:url" content="https://git.rela.dev" />
                <Meta property="og:type" content="website" />

                <Meta name="twitter:card" content="summary_large_image" />
                <Meta name="twitter:title" content="RelaGit" />
                <Meta name="twitter:description" content="RelaGit is a next-generation git client that is built to empower the development workflow." />
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
