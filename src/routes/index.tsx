import { createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Button from "~/components/Button";
import Icon from "~/components/Icon";

import "./index.scss";

export default () => {
    const [innerWidth, setInnerWidth] = createSignal(0);
    const [top, setTop] = createSignal(0);
    const [os, setOS] = createSignal<"mac" | "windows" | "linux" | "mobile">("mac");
    const [tag, setTag] = createSignal("v0.0.0");

    onMount(() => {
        setTop(window.scrollY);
        setInnerWidth(window.innerWidth);

        fetch(new URL("/api/release", location.href)).then(async (res) => {
            setTag((await res.json()).tag);
        });

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
        <main class="index">
            <Header static />
            <Header top={top} innerWidth={innerWidth} />
            <div class="hero">
                <div class="hero__text">
                    <h1 class="hero__text__header">RelaGit</h1>
                    <h2 class="hero__text__subheader">The git client that lets you decide how your work gets done.</h2>
                    <div class="hero__text__buttons">
                        <Button type="brand" href="/download">
                            Download {tag()}
                            <Icon name="download" />
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
                    <img class="hero__images__blob-one" alt="blob" src="/assets/blur-one.png" />
                    <img class="hero__images__blob-two" alt="blob" src="/assets/blur-two.png" />
                </div>
            </div>
            <div class="features" id="features">
                <div class="features__feature">
                    <div class="features__feature__text">
                        <h3 class="features__feature__text__heading">Creativity is the limit.</h3>
                        <h4 class="features__feature__text__subheading">Create simple programmatic workflows to automate actions and awesome tasks.</h4>
                    </div>
                    <div class="features__feature__image creativity">
                        <div class="images">
                            <img src="/assets/landing/workflow-code.png" alt="Workflow Code" class="code" />
                            <img src="/assets/landing/workflow-card.png" alt="Workflow Card" class="card" />
                        </div>
                    </div>
                </div>
                <div class="features__feature">
                    <div class="features__feature__text">
                        <h3 class="features__feature__text__heading">Fundamentally familiar.</h3>
                        <h4 class="features__feature__text__subheading">We've observed and built off of common layouts, patterns, and actions to deliver an intuitive experience.</h4>
                    </div>
                    <div class="features__feature__image familiar">
                        <img src="/assets/landing/familiar-diff.png" alt="Familiar Diff" class="diff" />
                        <img src="/assets/landing/commit-window.png" alt="RelaGit Window" class="window" />
                    </div>
                </div>
                <div class="features__feature">
                    <div class="features__feature__text">
                        <h3 class="features__feature__text__heading">And so much more...</h3>
                    </div>
                    <div class="features__feature__bento">
                        <div class="features__feature__bento__card speedy">
                            <div class="features__feature__bento__card__text">
                                <div class="features__feature__bento__card__text__icon">
                                    <Icon name="cpu" />
                                </div>
                                <h4 class="features__feature__bento__card__text__heading">Speedy</h4>
                                <p class="features__feature__bento__card__text__details">
                                    RelaGit is built with next-generation tooling and a custom built in-house git wrapper to deliver the best possible experience.
                                </p>
                            </div>
                        </div>
                        <div class="features__feature__bento__card two open">
                            <img src="/assets/landing/open.png" alt="Open Source" aria-hidden="true" class="features__feature__bento__card__decoration" />

                            <div class="features__feature__bento__card__text">
                                <div class="features__feature__bento__card__text__icon">
                                    <Icon name="project-roadmap" />
                                </div>
                                <h4 class="features__feature__bento__card__text__heading">Completely Open</h4>
                                <p class="features__feature__bento__card__text__details">RelaGit is built on transparency, trust, and the collective wisdom of our open-source developer community.</p>
                            </div>
                        </div>
                        <div class="features__feature__bento__card two github">
                            <div class="features__feature__bento__card__text">
                                <div class="features__feature__bento__card__text__icon">
                                    <Icon name="mark-github" />
                                </div>
                                <h4 class="features__feature__bento__card__text__heading">GitHub Integration</h4>
                                <p class="features__feature__bento__card__text__details">Import repositories and interact with GitHub straight from your Git client.</p>
                            </div>
                            <img src="/assets/landing/github.png" alt="Github Integration" aria-hidden="true" class="features__feature__bento__card__decoration" />
                        </div>
                        <div class="features__feature__bento__card speedy">
                            <div class="features__feature__bento__card__text">
                                <div class="features__feature__bento__card__text__icon">
                                    <Icon name="paper-airplane" />
                                </div>
                                <h4 class="features__feature__bento__card__text__heading">Elegantly... Elegant</h4>
                                <p class="features__feature__bento__card__text__details">
                                    We use TextMate based highlighting and a combined diff preview to present your changes in a wonderfully digestible manner.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cta-banner">
                    <div class="features__feature">
                        <div class="features__feature__text">
                            <h3 class="features__feature__text__heading">Ready to level up?</h3>
                        </div>
                        <div class="features__feature__buttons">
                            <div class="download">
                                <Button type="brand" href="/download" size="large">
                                    <Icon name="download" />
                                    Download {tag()}
                                </Button>
                                <p>{os() === "mac" ? "MacOS 10.12+ required." : os() === "windows" ? "Windows 10+ required." : os() === "mobile" ? "Only available on desktop." : ""}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};
