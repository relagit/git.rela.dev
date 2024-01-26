import { createConfetti } from "@neoconfetti/solid";
import { For, Show, createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Logo from "~/components/Logo";
import server$ from "solid-start/server";
import Icon, { ProductHunt } from "~/components/Icon";

import "./index.scss";
import { renderDate } from "~/utils/time";
import Button from "~/components/Button";
import Codeblock from "~/components/Codeblock";

const { confetti } = createConfetti(); // THIS VARIABLE IS USED BY THE use:confetti DIRECTIVE, DO NOT REMOVE IT

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            highlightOnScroll: boolean;
        }
    }
}

let _upvoteCount = 0; // value will be used for ssr

export default () => {
    const [os, setOS] = createSignal<"mac" | "windows" | "linux" | "mobile">("mac");
    const [tag, setTag] = createSignal("v0.0.0");
    const [upvoteCount, setUpvoteCount] = createSignal<number>(_upvoteCount);

    const isReleased = Date.now() > new Date("Sat Feb 10 2024 0:00:00 PST").getTime();
    // const isReleased = true;

    onMount(() => {
        server$(async () => {
            try {
                const res = await fetch("https://producthunt.com/posts/relagit");

                if (!res.ok) return;

                const count = (await res.text()).match(/Upvoted?(?:<!-- --> <!-- -->)?(\d+)/)?.[1] ?? 0;

                return count;
            } catch (e) {
                console.log(e);
            }

            return 0;
        })().then((res) => {
            setUpvoteCount(Number(res));
            _upvoteCount = Number(res);
        });

        fetch(new URL("/api/release", location.href)).then(async (res) => {
            setTag((await res.json()).tag);
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

    const highlightOnScroll = (element: HTMLElement) => {
        const observer = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    element.classList.add("highlighted");
                } else {
                    element.classList.remove("highlighted");
                }
            },
            { threshold: [0.65] }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    };

    return (
        <main class="index">
            <Header />
            <div class="hero-banner">
                <Show when={isReleased}>
                    <div
                        class="hero-banner-confetti"
                        use:confetti={{
                            particleCount: 100,
                            particleSize: 4,
                            force: 0.7,
                            colors: [
                                "var(--color-blue-500)",
                                "var(--color-green-500)",
                                "var(--color-yellow-500)",
                                "var(--color-red-500)",
                                "var(--color-purple-500)",
                                "var(--color-pink-500)",
                                "var(--color-orange-500)",
                                "var(--color-cyan-500)",
                            ],
                        }}
                    ></div>
                </Show>
                <div class="hero-banner-text">
                    <Show
                        when={isReleased}
                        fallback={
                            <>
                                <p>✨</p> <p>RelaGit Public Beta</p>
                                <div class="sep"></div>
                                <p style="width: 80px; color: var(--fill-secondary-vibrant);">{renderDate(new Date("Sat Feb 10 2024 0:00:00 PST").getTime())()}</p>
                            </>
                        }
                    >
                        <p>✨</p> <p>RelaGit Public Beta now available</p>
                    </Show>
                </div>
                <div class="hero-banner-sep"></div>
                <Show
                    when={isReleased}
                    fallback={
                        <a
                            class="hero-banner-text"
                            href="#waitlist"
                            onClick={(e) => {
                                e.preventDefault();

                                const waitlist = document.getElementById("waitlist");

                                if (waitlist) {
                                    waitlist.scrollIntoView({
                                        behavior: "smooth",
                                    });

                                    waitlist.focus();
                                }
                            }}
                        >
                            Get Notified
                        </a>
                    }
                >
                    <a class="hero-banner-text" href="/download">
                        Download
                    </a>
                </Show>
            </div>
            <h1 class="hero-text" use:highlightOnScroll>
                <span class="hero-text-highlight">The elegant solution to graphical version control.</span>
                <br /> <span>Built by developers, for developers.</span>
                <div class="hero-text-badges">
                    <Show
                        when={isReleased}
                        fallback={
                            <a
                                class="hero-text-badges-badge highlight"
                                href="#waitlist"
                                onClick={(e) => {
                                    e.preventDefault();

                                    const waitlist = document.getElementById("waitlist");

                                    if (waitlist) {
                                        waitlist.scrollIntoView({
                                            behavior: "smooth",
                                        });

                                        waitlist.focus();
                                    }
                                }}
                            >
                                <div class="hero-text-badges-badge-text">Get Notified</div>
                                <div class="hero-text-badges-badge-icon">
                                    <Icon name="bell" />
                                </div>
                            </a>
                        }
                    >
                        <a class="hero-text-badges-badge highlight" href="/download">
                            <div class="hero-text-badges-badge-text">Download</div>
                            <div class="hero-text-badges-badge-icon">
                                <Icon name="download" />
                            </div>
                        </a>
                    </Show>
                    <a class="hero-text-badges-badge" href="https://producthunt.com/products/relagit" target="_blank">
                        <div class="hero-text-badges-badge-text">
                            <ProductHunt />
                            Show Interest
                        </div>
                        <div class="hero-text-badges-badge-icon">
                            <Show when={upvoteCount() > 0}>
                                <div>{upvoteCount()}</div>
                            </Show>
                            <Icon name="triangle-up" />
                        </div>
                    </a>
                </div>
            </h1>
            <div class="window-container" aria-label="Image of RelaGit in the diff view, multple added lines and files.">
                <div class="window" use:highlightOnScroll></div>
                <img src="/assets/landing/blur.webp" width="140vw" height="40vw" alt="Blurry background gradient blobs" class="object" />
            </div>
            <div class="separator" />
            <div class="feature" use:highlightOnScroll>
                <div class="feature-text">
                    <h2 class="feature-text-header">Creativity is the limit.</h2>
                    <p class="feature-text-paragraph">Create dynamic workflows to automate actions and perform awesome tasks when things happen in your repositories.</p>
                    <a href="/workflows" target="_blank" class="feature-text-button">
                        Browse Workflows
                        <Icon name="arrow-up-right" />
                    </a>
                </div>
                <Codeblock
                    code={`import { Workflow, context } from "relagit:actions";

export default new Workflow({
    name: "My New Workflow",
    description: "Does amazing things!",
    hooks: {
        commit: (_, repository, commit) => {
            console.log("New commit in", repository.name);
        },
    },
});`}
                    language="ts"
                    filename=".relagit/workflows/action.ts"
                />
            </div>
            <div class="feature" use:highlightOnScroll>
                <div class="feature-window">
                    <div class="feature-window-sidebar">
                        <div class="feature-window-sidebar-header"></div>
                    </div>
                    <div class="feature-window-header"></div>
                </div>
                <div class="feature-text">
                    <h2 class="feature-text-header">Recognisably Yours.</h2>
                    <p class="feature-text-paragraph">Re-imagine the look of the client, either through careful creation of a theme, or use of a community-made one.</p>
                    <a href="/styles" target="_blank" class="feature-text-button">
                        Browse Styles
                        <Icon name="arrow-up-right" />
                    </a>
                </div>
            </div>
            <div class="separator" />
            <div class="feature-grid">
                <div use:highlightOnScroll class="feature-grid-item">
                    <div class="feature-grid-item-text">
                        <div class="feature-grid-item-text-label">
                            <Icon name="mark-github" />
                            GitHub Integration
                        </div>
                        <div class="feature-grid-item-text-paragraph">
                            <span class="highlight">Your favourite developer platform.</span> Directly integrated into the experience.
                        </div>
                    </div>
                    <img loading="lazy" class="feature-grid-item-graphic github" src="/assets/landing/vercel-next.webp" alt="The GitHub vercel/next.js repository being cloned inside RelaGit" />
                </div>
                <div use:highlightOnScroll class="feature-grid-item">
                    <div class="feature-grid-item-text">
                        <div class="feature-grid-item-text-label">
                            <Icon name="code" />
                            Open Source
                        </div>
                        <div class="feature-grid-item-text-paragraph">
                            <span class="highlight">Community fueled.</span> Built with input and opinion from developers and users.
                        </div>
                    </div>
                    <div class="feature-grid-item-graphic open">
                        <div class="message">Can we make the label more specific here?</div>
                        <div class="message you">I agree, we're trying to be more open about the git terminology.</div>
                        <div class="message">I would suggest “fetch” instead of “update”.</div>
                        <div class="message you">Sounds good 👍</div>
                    </div>
                </div>
                <div use:highlightOnScroll class="feature-grid-item full">
                    <div class="feature-grid-item-text">
                        <div class="feature-grid-item-text-label">
                            <Icon name="browser" />
                            Contextual Popout <div class="feature-grid-item-text-label-badge">New</div>
                        </div>
                        <div class="feature-grid-item-text-paragraph">
                            <span class="highlight">Goes anywhere you go.</span> Open out a native popout to view focused information about what you're working on.
                        </div>
                    </div>
                    <img
                        loading="lazy"
                        class="feature-grid-item-graphic popout"
                        src="/assets/landing/popout.webp"
                        alt="A native popout window is open above a code editor. The popout shows modified files and commit history."
                    />
                </div>
                <div use:highlightOnScroll class="feature-grid-item">
                    <div class="feature-grid-item-text">
                        <div class="feature-grid-item-text-label">
                            <Icon name="stopwatch" />
                            Speedy
                        </div>
                        <div class="feature-grid-item-text-paragraph">
                            <span class="highlight">Designed to move at your speed.</span> Next generation tooling enables lightning fast UI updates and performance.
                        </div>
                    </div>
                    <div class="feature-grid-item-graphic speed">
                        <div class="box">
                            <Icon name="git-merge" />
                        </div>
                        <div class="line"></div>
                        <div class="box">
                            <Logo />
                        </div>
                        <div class="line"></div>
                        <div class="box highlight">
                            <Icon name="person" />
                        </div>
                    </div>
                </div>
                <div use:highlightOnScroll class="feature-grid-item">
                    <div class="feature-grid-item-text">
                        <div class="feature-grid-item-text-label">
                            <Icon name="flame" />
                            Elegantly Elegant
                        </div>
                        <div class="feature-grid-item-text-paragraph">
                            <span class="highlight">Pixel perfect interface crafted for seamless navigation.</span> Blending form and function with beautiful design.
                        </div>
                    </div>
                    <img
                        loading="lazy"
                        class="feature-grid-item-graphic design"
                        src="/assets/landing/elegant.webp"
                        alt="The Create or Add repository modal in RelaGit, with the curve of the window being emphasised"
                    />
                </div>
            </div>
            <h1 class="hero-text inline" use:highlightOnScroll>
                <span class="hero-text-highlight">Convinced?</span>
                <div class="hero-text-badges">
                    <Show
                        when={isReleased}
                        fallback={
                            <a
                                class="hero-text-badges-badge highlight"
                                href="#waitlist"
                                onClick={(e) => {
                                    e.preventDefault();

                                    const waitlist = document.getElementById("waitlist");

                                    if (waitlist) {
                                        waitlist.scrollIntoView({
                                            behavior: "smooth",
                                        });

                                        waitlist.focus();
                                    }
                                }}
                            >
                                <div class="hero-text-badges-badge-text">Get Notified</div>
                                <div class="hero-text-badges-badge-icon">
                                    <Icon name="bell" />
                                </div>
                            </a>
                        }
                    >
                        <Button href="/download" class="cta-button">
                            Download
                            <Icon name="download" />
                        </Button>
                        <Button href="/redirect/github" class="cta-button secondary">
                            View on GitHub
                            <Icon name="mark-github" />
                        </Button>
                    </Show>
                </div>
            </h1>
            <Footer />
        </main>
    );
};
