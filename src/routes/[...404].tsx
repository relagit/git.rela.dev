import { HttpStatusCode } from "solid-start/server";
import { createSignal, onMount } from "solid-js";
import { Title } from "solid-start";

import Button from "~/components/Button";
import Header from "~/components/Header";

import "./404.scss";

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
            <Header top={() => 700} innerWidth={innerWidth} />
            <main class="error">
                <div class="error__text">
                    <h1 class="error__text__header">404</h1>
                    <h2 class="error__text__subheader">Are you sure there's meant to be something here? Try again or go back.</h2>
                    <div class="error__text__buttons">
                        <Button
                            type="brand"
                            onClick={() => {
                                history.back();
                            }}
                        >
                            Go Back
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
};
