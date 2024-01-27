import { Meta, Title, useParams } from "solid-start";
import { createEffect, createSignal, ErrorBoundary, For, JSX, lazy, onCleanup, onMount, Setter, Show } from "solid-js";

import _assemble, { flat, type BlogArticle, type BlogArticleMap } from "~/utils/blog";
import FourOhFour from "~/routes/[...404]";
import Header from "~/components/Header";
import Icon from "~/components/Icon";

import "./blog.scss";

const pages = _assemble();

const time = (mins: number) => {
    if (mins < 1) {
        return `${Math.ceil(mins * 60)} sec`;
    }

    if (mins > 60) {
        return `${Math.floor(mins / 60)} hr`;
    }

    return `${Math.ceil(mins)} min`;
};

const getPost = (pages: Awaited<ReturnType<typeof _assemble>> | undefined, slug: string): BlogArticle | null => {
    if (!pages) {
        return null;
    }

    const parts = slug.split("/");

    let post = pages;

    for (const part of parts) {
        post = post[part] as unknown as BlogArticleMap; // i hate ts sometimes
    }

    if (!post) {
        return null;
    }

    return post as unknown as BlogArticle;
};

export default () => {
    const params = useParams();

    const [innerText, setInnerText] = createSignal<number | null>(null);
    const [page, setPage] = createSignal<string>(params.page);
    const [blog, setBlog] = createSignal<BlogArticleMap>();

    onMount(async () => {
        setBlog(await pages);
    });

    createEffect(() => {
        page();

        setTimeout(() => {
            setInnerText(document.querySelector<HTMLElement>(".markdown-body")?.innerText.split(" ").length || null);
        }, 100);
    });

    return (
        <>
            <Title>{"RelaGit - " + (getPost(blog(), page())?.meta.title || "Blog")}</Title>
            <Meta name="description" content={getPost(blog(), page())?.meta.description} />
            <Meta name="og:title" content={"RelaGit - " + (getPost(blog(), page())?.meta.title || "Blog")} />
            <Meta name="og:description" content={getPost(blog(), page())?.meta.description} />
            <Meta name="og:type" content="article" />
            <Meta name="twitter:title" content={"RelaGit - " + (getPost(blog(), page())?.meta.title || "Blog")} />
            <Meta name="twitter:description" content={getPost(blog(), page())?.meta.description} />
            <Show
                when={blog()}
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
                <Show when={getPost(blog(), page())} fallback={<FourOhFour />}>
                    <Header />
                    <div class="blogpost">
                        <div class="blogpost__content">
                            <h1 class="title">
                                {getPost(blog(), page())?.meta.title}
                                <div class="read-time">
                                    <Icon name="clock" />
                                    {time((innerText() || 0) / 125)}
                                </div>
                            </h1>

                            <h2 class="description">{getPost(blog(), page())?.meta.description}</h2>
                            <Show when={getPost(blog(), page())?.meta.image}>
                                <img src={getPost(blog(), page())?.meta.image} alt={getPost(blog(), page())?.meta.alt!} class="blog-image" />
                            </Show>
                            <Show when={getPost(blog(), page())?.body}>
                                <div class="markdown-body">
                                    <ErrorBoundary fallback={"error"}>{getPost(blog(), page())?.body}</ErrorBoundary>
                                </div>
                            </Show>
                        </div>
                        <div class="byline">
                            <span>Updated on {getPost(blog(), page())?.meta.date}</span>
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
