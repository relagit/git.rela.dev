// @refresh reload
import { A, Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from "solid-start";
import { Suspense, onMount } from "solid-js";

import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";

import FourOhFour from "~/routes/[...404]";

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
                <link rel="preload" href="https://rsms.me/inter/inter.css" as="style" />
                <Meta name="description" content="The elegant solution to graphical version control. Built by developers, for developers." />
                <Meta charset="utf-8" />
                <Meta
                    name="keywords"
                    content="git, github, gitlab, git workflow, git management, git productivity, git tools, git desktop, git desktop app, git desktop application, git desktop client, git desktop software, git desktop tool, git desktop tools, git desktop utility, relagit"
                />
                <Link rel="icon" href="https://git.rela.dev/assets/favicon.svg" />

                <Meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta name="theme-color" content="#000" />
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
                    <ErrorBoundary fallback={(e, reset) => (e.toString().includes("Hydration") ? reset() : null, (<FourOhFour error={e} code={500} />))}>
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
