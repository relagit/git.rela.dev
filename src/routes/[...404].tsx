import { HttpStatusCode } from "solid-start/server";
import { Show } from "solid-js";
import { isDev } from "solid-js/web";
import { Meta, Title } from "solid-start";

import Button from "~/components/Button";
import Header from "~/components/Header";

import "./subpage.scss";

export default (props: { code?: number; error?: string | Error }) => {
    return (
        <>
            <Meta property="og:title" content="RelaGit" />
            <Meta property="og:description" content="The elegant solution to graphical version control. Built by developers, for developers." />
            <Meta property="og:image" content="https://git.rela.dev/assets/opengraph.png" />
            <Meta property="og:url" content="https://git.rela.dev" />

            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:title" content="RelaGit" />
            <Meta name="twitter:description" content="The elegant solution to graphical version control. Built by developers, for developers." />
            <Meta name="twitter:image" content="https://git.rela.dev/assets/opengraph.png" />

            <HttpStatusCode code={props.code || 404} />
            <Title>{props.code || 404}</Title>
            <Header />
            <main class="sub-page">
                <div class="sub-page__text">
                    <h1 class="sub-page__text__heading">{props.code || 404}</h1>
                    <h2 class="sub-page__text__subheading">Are you sure there's meant to be something here? Try again or go back.</h2>
                </div>
                <div class="sub-page__buttons">
                    <Button
                        onClick={() => {
                            history.back();
                        }}
                    >
                        Go Back
                    </Button>
                </div>
                <img loading="lazy" src="/assets/landing/beta-decorations.webp" aria-hidden="true" alt="Blurry background gradient blobs" class="decorations" />
            </main>
        </>
    );
};
