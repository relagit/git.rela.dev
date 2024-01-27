import { Meta, Title, useParams } from "solid-start";
import { createEffect, createSignal, ErrorBoundary, For, JSX, lazy, onCleanup, onMount, Setter, Show } from "solid-js";

import { type BlogArticle } from "~/utils/blog";
import FourOhFour from "~/routes/[...404]";
import Header from "~/components/Header";
import Icon from "~/components/Icon";

import "./blog.scss";

const pages = import.meta.glob("../../data/blog/**/*.mdx");

const time = (mins: number) => {
    if (mins < 1) {
        return `${Math.ceil(mins * 60)} sec`;
    }

    if (mins > 60) {
        return `${Math.floor(mins / 60)} hr`;
    }

    return `${Math.ceil(mins)} min`;
};

export default () => {
    const params = useParams();

    const [innerText, setInnerText] = createSignal<number | null>(null);

    const [currentPost, setCurrentPost] = createSignal<BlogArticle | null>(null);
    const [done, setDone] = createSignal<boolean>(false);

    for (let i = 0; i < Object.keys(pages).length; i++) {
        (async () => {
            const postFn = pages[Object.keys(pages)[i]];

            // @ts-ignore
            const post: any = await postFn();

            if (post.meta.slug === params.post) {
                setCurrentPost(post);
            }

            if (i === Object.keys(pages).length - 1) {
                setDone(true);
            }
        })();
    }

    createEffect(() => {
        setTimeout(() => {
            setInnerText(document.querySelector<HTMLElement>(".markdown-body")?.innerText.split(" ").length || null);
        }, 100);
    });

    return (
        <>
            <Title>{"RelaGit - " + (currentPost()?.meta.title || "Blog")}</Title>

            <Meta name="description" content={currentPost()?.meta.description} />
            <Meta name="og:title" content={"RelaGit - " + (currentPost()?.meta.title || "Blog")} />
            <Meta name="og:description" content={currentPost()?.meta.description} />
            <Meta name="og:type" content="article" />
            <Meta name="og:image" content={currentPost()?.meta.image} />
            <Meta name="og:url" content={`https://git.rela.dev/blog/${params.page}`} />

            <Meta name="twitter:title" content={"RelaGit - " + (currentPost()?.meta.title || "Blog")} />
            <Meta name="twitter:description" content={currentPost()?.meta.description} />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:image" content={currentPost()?.meta.image} />

            <Show
                when={done()}
                fallback={
                    <div class="blogpost-empty">
                        <Header />
                        <div class="blogpost">
                            <div class="blogpost__content">
                                <h1 class="title empty"></h1>
                                <h2 class="description empty"></h2>
                                <div class="markdown-body">
                                    <For each={Array.from({ length: Math.floor(Math.random() * 10) + 15 })}>
                                        {() =>
                                            // math.random but more focused towards higher numbers
                                            Math.random() > 0.1 ? <div class="empty" style={{ "--w": Math.random() }}></div> : <br />
                                        }
                                    </For>
                                </div>
                            </div>
                            <div class="byline empty"></div>
                        </div>
                    </div>
                }
            >
                <Show when={currentPost()} fallback={<FourOhFour />}>
                    <Header />
                    <div class="blogpost">
                        <div class="blogpost__content">
                            <h1 class="title">
                                {currentPost()?.meta.title}
                                <div class="read-time">
                                    <Icon name="clock" />
                                    {time((innerText() || 0) / 125)}
                                </div>
                            </h1>

                            <h2 class="description">{currentPost()?.meta.description}</h2>
                            <Show when={currentPost()?.meta.image}>
                                <img src={currentPost()?.meta.image} alt={currentPost()?.meta.alt!} class="blog-image" />
                            </Show>
                            <Show when={currentPost()?.body}>
                                <div class="markdown-body">
                                    <ErrorBoundary fallback={"error"}>{currentPost()?.body}</ErrorBoundary>
                                </div>
                            </Show>
                        </div>
                        <div class="byline">
                            <span>Updated on {currentPost()?.meta.date}</span>
                            <a title="Edit on GitHub" target="_blank" href={`https://github.com/relagit/git.rela.dev/edit/main/src/data/blog/${params.page}.mdx`}>
                                <Icon name="pencil" />
                            </a>
                            <a title="View on GitHub" target="_blank" href={`https://github.com/relagit/git.rela.dev/tree/main/src/data/blog/${params.page}.mdx`}>
                                <Icon name="link-external" />
                            </a>
                        </div>
                    </div>
                </Show>
            </Show>
        </>
    );
};
