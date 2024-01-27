import { Meta, Title, useParams } from "solid-start";
import { createEffect, createSignal, ErrorBoundary, For, JSX, lazy, onCleanup, onMount, Setter, Show } from "solid-js";

import _assemble, { flat, type BlogArticle, type BlogArticleMap } from "~/utils/blog";
import FourOhFour from "~/routes/[...404]";
import Header from "~/components/Header";
import Icon from "~/components/Icon";
import cn from "~/utils/cn";

import "./blog.scss";

const pages = _assemble();

const toName = (str: string) => {
    return str
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
};

const Pages = (props: { blog: BlogArticleMap | undefined; pages: BlogArticleMap | undefined }) => {
    if (!props.pages) return null;

    console.log(props.pages);

    return (
        <div class="post-grid">
            <For each={Object.entries(props.pages).sort((a, b) => new Date((a[1] as BlogArticle).meta?.date).getTime() - new Date((b[1] as BlogArticle).meta?.date).getTime())}>
                {([slug, item]) => {
                    return (
                        <>
                            <a href={`/blog/${(item as BlogArticle).meta.slug}`} class="grid-item">
                                <Show when={(item as BlogArticle).meta.image}>
                                    <img src={(item as BlogArticle).meta.image} alt={(item as BlogArticle).meta.alt!} class="grid-item-image" />
                                </Show>
                                <div class="grid-item-text">
                                    <div class="grid-item-text-title">{(item as BlogArticle).meta.title}</div>
                                    <div class="grid-item-text-desc">{(item as BlogArticle).meta.description}</div>
                                </div>
                            </a>
                        </>
                    );
                }}
            </For>
        </div>
    );
};

export default () => {
    const [innerText, setInnerText] = createSignal<number | null>(null);
    const [posts, setPosts] = createSignal<BlogArticleMap>();

    onMount(async () => {
        setPosts(await pages);
    });

    createEffect(() => {
        setTimeout(() => {
            console.log("setting", document.querySelector<HTMLElement>(".markdown-body")?.innerText.split(" ").length || null);

            setInnerText(document.querySelector<HTMLElement>(".markdown-body")?.innerText.split(" ").length || null);
        }, 100);
    });

    return (
        <>
            <Title>RelaGit - Blog</Title>
            <Show
                when={posts()}
                fallback={
                    <div class="post-empty">
                        <Header />
                        <div class="post-grid">
                            <For each={Array.from({ length: Math.ceil(Math.random() * 4) })}>
                                {() => (
                                    <>
                                        <div class="grid-item empty">
                                            <Show when={Math.random() > 0.4}>
                                                <div class="grid-item-image" />
                                            </Show>
                                            <div class="grid-item-text">
                                                <div class="grid-item-text-title empty"></div>
                                                <div class="grid-item-text-desc empty"></div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </For>
                        </div>
                    </div>
                }
            >
                <Header />
                <Pages blog={posts()} pages={posts()} />
            </Show>
        </>
    );
};
