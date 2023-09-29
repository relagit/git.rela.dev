import { Meta, Title, useParams } from "solid-start";
import { createSignal, For, JSX, lazy, onMount, Show } from "solid-js";

import fourOFour from "~/routes/[...404]";

import "./docs.scss";
import Header from "~/components/Header";

const docs = import.meta.glob("../../data/docs/**/*.mdx");

type Article = {
    default: JSX.Element;
    meta: {
        title: string;
        slug: string;
        description: string;
        date: Date;
    };
};

export default () => {
    const params = useParams();

    const [post, setPost] = createSignal<Article | null>(null);
    const [done, setDone] = createSignal(false);
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

    for (let i = 0; i < Object.keys(docs).length; i++) {
        (async () => {
            const postFn = docs[Object.keys(docs)[i]];

            // @ts-ignore
            const post: Post = await postFn();

            if (post.meta.slug === params.page) {
                setPost(post);
            }

            if (i === Object.keys(docs).length - 1) {
                setDone(true);
            }
        })();
    }

    const Docs = lazy(async () => {
        const items = await Promise.all(
            Object.keys(docs).map(async (key) => {
                const postFn = docs[key];

                // @ts-ignore
                const post: Post = await postFn();

                return post;
            })
        );

        return {
            default: () => (
                <For each={items}>
                    {(item) => (
                        <a
                            classList={{
                                sidebar__item: true,
                                "sidebar__item-active": item.meta.slug === params.page,
                            }}
                            href={`/docs/${item.meta.slug}`}
                        >
                            {item.meta.title}
                        </a>
                    )}
                </For>
            ),
        };
    });

    return (
        <>
            <Title>{post()?.meta.title}</Title>
            <Meta name="description" content={post()?.meta.description} />
            <Meta name="og:title" content={post()?.meta.title} />
            <Meta name="og:description" content={post()?.meta.description} />
            <Meta name="og:type" content="article" />

            <Meta name="twitter:title" content={post()?.meta.title} />
            <Meta name="twitter:description" content={post()?.meta.description} />

            <Show
                when={post()}
                fallback={
                    <Show when={done()} fallback={<div>Loading...</div>}>
                        {fourOFour()}
                    </Show>
                }
            >
                <aside class="sidebar">
                    <Docs />
                </aside>
                <div class="post">
                    <div class="post__content">
                        <span class="byline">
                            Updated on{" "}
                            {post()?.meta.date.toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                        <h1 class="title">{post()?.meta.title}</h1>
                        <h2 class="description">{post()?.meta.description}</h2>

                        <div class="markdown-body"> {post()?.default}</div>
                    </div>
                </div>
            </Show>
        </>
    );
};
