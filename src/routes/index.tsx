import { createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Button from "~/components/Button";

import "./index.scss";
import Icon from "~/components/Icon";

export default () => {
    const [innerWidth, setInnerWidth] = createSignal(0);
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
    });

    return (
        <>
            <Header top={top} innerWidth={innerWidth} />
            <div class="hero">
                <div class="hero__text">
                    <h1 class="hero__text__header">RelaGit</h1>
                    <h2 class="hero__text__subheader">The git client that lets you decide how your work gets done.</h2>
                    <div class="hero__text__buttons">
                        <Button type="brand" href="/download">
                            Download v0.0.0
                            <Icon name="arrow-right" />
                        </Button>
                    </div>
                </div>
                <div class="hero__images">
                    <picture>
                        <source media="(prefers-color-scheme: dark)" srcset="/assets/dark.png" />
                        <source media="(prefers-color-scheme: light)" srcset="/assets/light.png" />
                        <img
                            classList={{
                                hero__images__client: true,
                                shrink: top() > 150,
                            }}
                            alt="RelaGit client"
                            src="/assets/light.png"
                        />
                    </picture>
                    <picture>
                        <source media="(prefers-color-scheme: dark)" srcset="/assets/laptop-dark.png" />
                        <source media="(prefers-color-scheme: light)" srcset="/assets/laptop-light.png" />
                        <img
                            classList={{
                                hero__images__laptop: true,
                                shrink: top() > 150,
                            }}
                            alt="Laptop"
                            src="/assets/laptop-light.png"
                        />
                    </picture>
                    <img class="hero__images__blob-one" alt="blob" src="/assets/blur-one.svg" />
                    <img class="hero__images__blob-two" alt="blob" src="/assets/blur-two.svg" />
                </div>
            </div>
            <div class="features">
                <div class="features__feature">
                    <div class="features__feature__title">
                        <Icon name="cpu" />
                        <h3 class="features__feature__title__header">Speedy</h3>
                    </div>
                    <p class="features__feature__text">RelaGit is built with next-generation tooling and a custom built in-house git wrapper to deliver the best possible experience.</p>
                </div>
                <div class="features__feature">
                    <div class="features__feature__title">
                        <Icon name="paper-airplane" />
                        <h3 class="features__feature__title__header">Elegantly... Elegant</h3>
                    </div>
                    <p class="features__feature__text">
                        We use{" "}
                        <a href="https://macromates.com/manual/en/language_grammars" target="_blank" rel="noopener noreferrer">
                            TextMate
                        </a>{" "}
                        based highlighting and a combined diff preview to present your changes in a wonderfully digestible manner.
                    </p>
                </div>
                <div class="features__feature">
                    <div class="features__feature__title">
                        <Icon name="code" />
                        <h3 class="features__feature__title__header">Open Source</h3>
                    </div>
                    <p class="features__feature__text">RelaGit is built on transparency, trust, and the collective wisdom of the our developer community.</p>
                </div>
                <div class="features__feature">
                    <div class="features__feature__title">
                        <Icon name="table" />
                        <h3 class="features__feature__title__header">Fits Your Workflow</h3>
                    </div>
                    <p class="features__feature__text">Whatever your style, RelaGit molds itself to you, because we know that the best tools are the ones that fit like a glove.</p>
                </div>
            </div>
            <div style="height: 100vh"></div>
        </>
    );
};
