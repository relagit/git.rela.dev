import { For, Show, createSignal, onMount } from "solid-js";
import Icon, { ProductHunt } from "./Icon";
import "./footer.scss";

const sponsors = [
    {
        name: "42chompii",
        githubIcon: "https://avatars.githubusercontent.com/u/109488630?v=4",
    },
    {
        name: "domi-btnr",
        githubIcon: "https://avatars.githubusercontent.com/u/50876016?v=4",
    },
    {
        name: "voidfill",
        githubIcon: "https://avatars.githubusercontent.com/u/71205200?v=4",
    },
    {
        name: "Overimagine1",
        githubIcon: "https://avatars.githubusercontent.com/u/79660414?v=4",
    },
    {
        name: "evmoreno",
        githubIcon: "https://avatars.githubusercontent.com/u/19178120?v=4",
    },
    {
        name: "canadahonk",
        githubIcon: "https://avatars.githubusercontent.com/u/19228318?v=4",
    },
];

export default () => {
    const [sentError, setSentError] = createSignal(false);
    const [sentSignup, setSentSignup] = createSignal(false);
    const [waitlistEmail, setWaitlistEmail] = createSignal("");
    const [input, setInput] = createSignal<HTMLInputElement>();
    const [status, setStatus] = createSignal<"operational" | "degraded" | "offline">("operational");

    onMount(() => {
        fetch("https://status.rela.dev/status-page-api/overview/0e9b8a2d-cfcd-4306-b481-757cc462d49b", { method: "POST" }).then(async (res) => {
            const data = await res.json();

            if (!data) return;

            const offline = data.monitorStatusTimelines.find((monitor: any) => monitor.monitorStatus.name === "Offline");
            const degraded = data.monitorStatusTimelines.find((monitor: any) => monitor.monitorStatus.name === "Degraded");
            const operational = data.monitorStatusTimelines.find((monitor: any) => monitor.monitorStatus.name === "Operational");

            if (offline) {
                setStatus("offline");
            } else if (degraded) {
                setStatus("degraded");
            } else if (operational) {
                setStatus("operational");
            }
        });

        setTimeout(() => {
            input()?.style.setProperty("background-size", "auto 16px !important");
        }, 10);
    });

    return (
        <footer class="footer">
            <div class="footer-group">
                <div class="footer-brand">
                    <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_627_616)">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0.420532 0H6.45792V20.2723C9.40288 18.4576 13.2365 17.5403 17.7383 17.5403C22.0663 17.5403 24.5508 16.4996 25.9915 15.0411C27.4418 13.5728 28.3831 11.1272 28.3831 7.11093V0H34.4205V7.11093C34.4205 11.9439 33.2964 16.2141 30.2982 19.2494C27.2902 22.2945 22.943 23.5451 17.7383 23.5451C13.4126 23.5451 10.576 24.5697 8.8877 25.8991C7.27268 27.1708 6.45792 28.9076 6.45792 31.0511V40H0.420532V0Z"
                                fill="currentColor"
                            />
                            <mask id="mask0_627_616" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="20" width="28" height="20">
                                <path
                                    d="M31.1636 20.1343C27.7435 23.499 22.9789 24.7959 17.5794 24.7959C13.4516 24.7959 10.945 25.7748 9.56709 26.8598C8.29498 27.8615 7.64954 29.2004 7.64954 30.9587V40.0002H34.3411V20.1016L31.1636 20.1343Z"
                                    fill="black"
                                />
                            </mask>
                            <g mask="url(#mask0_627_616)">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M18.5535 30.5588C17.1074 29.3117 15.5104 27.0535 15.4346 24.414L21.472 24.335C21.4756 24.4608 21.5269 25.1753 22.5087 26.022C23.297 26.7019 24.2705 27.3292 25.4922 28.1166C25.8429 28.3427 26.2142 28.582 26.6074 28.8395C29.6731 30.847 34.3411 34.1043 34.3411 39.9998H28.3037C28.3037 37.6781 26.6166 36.0349 23.2874 33.8548C23.0113 33.674 22.7185 33.4858 22.4155 33.2912C21.1443 32.4744 19.6947 31.543 18.5535 30.5588Z"
                                    fill="currentColor"
                                    style="opacity: 0.6;"
                                />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_627_616">
                                <rect width="34" height="40" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div class="footer-col-item">
                        <span>
                            <a href="/">RelaGit</a> is a product of{" "}
                            <a target="_blank" href="https://rela.dev">
                                Rela
                            </a>
                            .
                        </span>
                    </div>
                    <div class="footer-col-logos">
                        <a href="/redirect/github">
                            <Icon name="mark-github" />
                        </a>
                        <a href="/redirect/producthunt">
                            <ProductHunt />
                        </a>
                    </div>
                </div>
                <div class="footer-cols">
                    <div class="footer-col">
                        <div class="footer-col-header">Product</div>
                        <a href="/download" class="footer-col-item">
                            Download
                        </a>
                        <a href="/docs" class="footer-col-item">
                            Documentation
                        </a>
                        <a aria-disabled="true" href="/redirect/github" target="_blank" class="footer-col-item disabled">
                            GitHub
                        </a>
                    </div>
                    <div class="footer-col">
                        <div class="footer-col-header">Organisation</div>
                        <a href="https://rela.dev/oss" target="_blank" class="footer-col-item">
                            Open Source
                        </a>
                        <a href="/press" download target="_blank" class="footer-col-item">
                            Press Kit
                        </a>
                        <a href="https://rela.dev" target="_blank" class="footer-col-item">
                            Website
                        </a>
                    </div>
                    <div class="footer-col">
                        <div class="footer-col-header">Resources</div>
                        <a href="/workflows" target="_blank" class="footer-col-item disabled">
                            Workflows
                        </a>
                        <a href="/styles" target="_blank" class="footer-col-item disabled">
                            Styles
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-item">
                <div class="footer-item-text">
                    <h2 class="footer-item-text-header">Brought to you by.</h2>
                    <p class="footer-item-text-paragraph">These wonderful individuals have sponsored or are sponsoring the organisation or its members.</p>
                </div>
                <div class="footer-item-sponsors">
                    <For each={sponsors}>
                        {(sponsor) => (
                            <a class="sponsor" href={`https://github.com/${sponsor.name}`} target="_blank">
                                <img loading="lazy" class="pfp" src={sponsor.githubIcon} alt={`${sponsor.name}'s profile picture`} />
                            </a>
                        )}
                    </For>
                    <a href="/redirect/sponsor" class="sponsor add">
                        <div class="pfp">
                            <Icon name="plus" />
                        </div>
                    </a>
                </div>
            </div>
            <div class="footer-sep"></div>
            <div class="footer-item" id="waitlist" tabIndex={0}>
                <div class="footer-item-text">
                    <h2 class="footer-item-text-header">Don't miss a release.</h2>
                    <p class="footer-item-text-paragraph">Be notified about updates and beta programs.</p>
                </div>
                <div class="footer-item-input">
                    <input
                        ref={setInput}
                        type="email"
                        placeholder={["tim.berners-lee", "elizabeth.feinler"][Math.floor(Math.random() * 2)] + "@rela.dev"}
                        value={waitlistEmail()}
                        onInput={(e) => setWaitlistEmail(e.currentTarget.value.trim())}
                    />
                    <button
                        tabIndex={0}
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

                                console.error(json);

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
            <div class="footer-sep"></div>
            <div class="footer-item last">
                <a class="footer-item-status" href="https://status.rela.dev" target="_blank">
                    <div classList={{ "status-dot": true, [status()]: true }}></div>
                    <div class="status-text">
                        {status() === "operational" ? "All systems normal." : status() === "degraded" ? "Some systems degraded." : "One or more systems offline."}
                        <Icon name="arrow-up-right" />
                    </div>
                </a>
                <div class="footer-item-cpy">
                    <span>&copy;</span>
                    <span>2023</span>
                    <div class="sep"></div>
                    <span>{new Date().getFullYear()}</span>
                    <span>All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};
