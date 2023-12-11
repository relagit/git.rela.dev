import { Show, createSignal, onMount } from "solid-js";

import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Button from "~/components/Button";
import Logo from "~/components/Logo";
import Icon from "~/components/Icon";

import "./index.scss";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            highlightOnScroll: boolean;
        }
    }
}

export default () => {
    const [innerWidth, setInnerWidth] = createSignal(0);
    const [top, setTop] = createSignal(0);
    const [os, setOS] = createSignal<"mac" | "windows" | "linux" | "mobile">("mac");
    const [tag, setTag] = createSignal("v0.0.0");

    const [sentError, setSentError] = createSignal(false);
    const [sentSignup, setSentSignup] = createSignal(false);
    const [waitlistEmail, setWaitlistEmail] = createSignal("");

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
            <Header static />
            <h1 class="hero-text" use:highlightOnScroll>
                <span class="hero-text-highlight">The elegant solution to graphical version control.</span>
                <br /> <span>Built by developers, for developers.</span>
            </h1>
            <div class="window-container">
                <div class="window" use:highlightOnScroll></div>
                <img src="/assets/blur.png" width="140vw" height="40vw" alt="objectBlur" class="object" />
            </div>
            <div class="separator" />
            <div class="feature" use:highlightOnScroll>
                <div class="feature-text">
                    <h2 class="feature-text-header">Creativity is the limit.</h2>
                    <p class="feature-text-paragraph">
                        Create dynamic programmatic workflows to automate actions and perform awesome tasks. <br />
                        <br /> Use modern and familiar syntax alongside a type-safe api.
                    </p>
                    <a href="/workflows" target="_blank" class="feature-text-button">
                        Browse Workflows
                        <Icon name="arrow-up-right" />
                    </a>
                </div>
                <img src="/assets/landing/codeblock.png" alt="code" />
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
            <div class="feature-grid" use:highlightOnScroll>
                <div class="feature-grid-item">
                    <div class="feature-grid-item-text">
                        <div class="feature-grid-item-text-label">
                            <Icon name="stopwatch" />
                            Speedy
                        </div>
                        <div class="feature-grid-item-text-paragraph">
                            <span class="highlight">Designed to move at your speed.</span> Next generation tooling enables lightning fast UI updates and commands.
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
                <div class="feature-grid-item">
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
                <div class="feature-grid-item">
                    <div class="feature-grid-item-text">
                        <div class="feature-grid-item-text-label">
                            <Icon name="mark-github" />
                            GitHub Integration
                        </div>
                        <div class="feature-grid-item-text-paragraph">
                            <span class="highlight">Your favourite developer platform.</span> Directly integrated into the experience.
                        </div>
                    </div>
                    <img class="feature-grid-item-graphic github" src="/assets/vercel-next.png" alt="GitHub Graphic" />
                </div>
                <div class="feature-grid-item">
                    <div class="feature-grid-item-text">
                        <div class="feature-grid-item-text-label">
                            <Icon name="flame" />
                            Elegantly Elegant
                        </div>
                        <div class="feature-grid-item-text-paragraph">
                            <span class="highlight">Pixel perfect interface crafted for seamless navigation.</span> Blending form and function with beautiful design.
                        </div>
                    </div>
                    <img class="feature-grid-item-graphic design" src="/assets/elegant.png" alt="Elegance Graphic" />
                </div>
            </div>
            <div class="feature download">
                <div class="feature-text download">
                    <h2 class="feature-text-header">Sound Good?</h2>
                    <p class="feature-text-paragraph">Put your name on our waiting list so we can notify you when RelaGit goes into beta testing.</p>
                    <div classList={{ "feature-text-input": true, error: sentError(), disabled: sentSignup() }}>
                        <input
                            type="email"
                            role="textbox"
                            placeholder={(() => {
                                const names = ["alan.turing", "linus.torvalds", "tim.berners-lee", "elizabeth.feinler"];

                                return `${names[Math.floor(Math.random() * names.length)]}@example.dev`;
                            })()}
                            value={waitlistEmail()}
                            onInput={(e) => setWaitlistEmail(e.currentTarget.value.trim())}
                        />
                        <button
                            aria-label="Join Waitlist"
                            disabled={!waitlistEmail() || sentSignup()}
                            classList={{
                                "feature-text-input-button": true,
                                success: sentSignup(),
                                error: sentError(),
                            }}
                            onClick={async () => {
                                if (!waitlistEmail().includes("@")) {
                                    alert("Please enter a valid email address.");
                                    return;
                                }

                                const res = await fetch(new URL("/api/waitlist/register", location.href), {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        email: waitlistEmail(),
                                    }),
                                });

                                const json = await res.json();

                                if (json.type === "success") {
                                    setSentSignup(true);
                                } else if (json.type === "error") {
                                    alert(json.message);

                                    setSentError(true);
                                }
                            }}
                        >
                            <Show when={!sentSignup()} fallback={<Icon name="check" />}>
                                <Show when={!sentError()} fallback={<Icon name="x" />}>
                                    <Icon name="paper-airplane" />
                                </Show>
                            </Show>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};
