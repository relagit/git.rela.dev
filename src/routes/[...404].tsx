import { HttpStatusCode } from "solid-start/server";
import { createSignal, onMount } from "solid-js";
import { Title } from "solid-start";

import Button from "~/components/Button";
import Header from "~/components/Header";

import "./subpage.scss";

export default () => {
    const [innerWidth, setInnerWidth] = createSignal(0);

    onMount(() => {
        setInnerWidth(window.innerWidth);

        window.addEventListener("resize", () => {
            setInnerWidth(window.innerWidth);
        });
    });

    return (
        <>
            <HttpStatusCode code={404} />
            <Title>404</Title>
            <Header />
            <main class="sub-page">
                <div class="sub-page__text">
                    <h1 class="sub-page__text__heading">404</h1>
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
                <img loading="lazy" src="/assets/landing/beta-decorations.png" aria-hidden="true" alt="decorations" class="decorations" />
            </main>
        </>
    );
};
