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

    const [posts, setPosts] = createSignal<Record<string, Article>>();
    const [done, setDone] = createSignal(false);
    const [innerWidth, setInnerWidth] = createSignal(0);
    const [top, setTop] = createSignal(0);
    const [page, setPage] = createSignal(params.page);

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

            setPosts({
                ...posts(),
                [post.meta.slug]: post,
            });

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
                        <button
                            classList={{
                                sidebar__item: true,
                                "sidebar__item-active": item.meta.slug === page(),
                            }}
                            onClick={(e) => {
                                setPage(item.meta.slug);

                                e.target.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                    inline: "nearest",
                                });

                                window.history.pushState({}, "", `/docs/${item.meta.slug}`);
                            }}
                        >
                            {item.meta.title}
                        </button>
                    )}
                </For>
            ),
        };
    });

    return (
        <>
            <Title>{posts()?.[page()]?.meta.title}</Title>
            <Meta name="description" content={posts()?.[page()]?.meta.description} />
            <Meta name="og:title" content={posts()?.[page()]?.meta.title} />
            <Meta name="og:description" content={posts()?.[page()]?.meta.description} />
            <Meta name="og:type" content="article" />
            <Meta name="twitter:title" content={posts()?.[page()]?.meta.title} />
            <Meta name="twitter:description" content={posts()?.[page()]?.meta.description} />
            <Show
                when={posts()?.[page()]}
                fallback={
                    <Show when={done()} fallback={<div>Loading...</div>}>
                        {fourOFour()}
                    </Show>
                }
            >
                <aside class="sidebar">
                    <div class="items">
                        <div class="spacer"></div>
                        <Docs />
                    </div>
                </aside>
                <div class="post">
                    <div class="post__content">
                        <span class="byline">
                            Updated on{" "}
                            {posts()?.[page()]?.meta.date.toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                        <h1 class="title">{posts()?.[page()]?.meta.title}</h1>
                        <h2 class="description">{posts()?.[page()]?.meta.description}</h2>

                        <div class="markdown-body"> {posts()?.[page()]?.default}</div>
                    </div>
                </div>
            </Show>
        </>
    );
};
