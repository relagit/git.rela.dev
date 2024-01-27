import { Meta, Title, useParams } from "solid-start";
import { createEffect, createSignal, ErrorBoundary, For, JSX, lazy, onCleanup, onMount, Setter, Show } from "solid-js";

import _assemble, { flat, type Article, type ArticleMap } from "~/utils/docs";
import FourOhFour from "~/routes/[...404]";
import Header from "~/components/Header";
import Icon from "~/components/Icon";
import cn from "~/utils/cn";

import "./docs.scss";

const pages = _assemble();

const toName = (str: string) => {
    return str
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
};

const time = (mins: number) => {
    console.log(mins);

    if (mins < 1) {
        return `${Math.ceil(mins * 60)} sec`;
    }

    if (mins > 60) {
        return `${Math.floor(mins / 60)} hr`;
    }

    return `${Math.ceil(mins)} min`;
};

const getPost = (pages: Awaited<ReturnType<typeof _assemble>> | undefined, slug: string): Article | null => {
    if (!pages) {
        return null;
    }

    const parts = slug.split("/");

    let post = pages;

    for (const part of parts) {
        post = post[part] as ArticleMap; // i hate ts sometimes
    }

    if (!post) {
        return null;
    }

    return post as unknown as Article;
};

const Pages = (props: { docs: ArticleMap | undefined; page: string; setPage: Setter<string>; pages: ArticleMap | undefined }) => {
    if (!props.pages) return null;

    return (
        <nav>
            <For each={Object.entries(props.pages).sort((a, b) => ((a[1] as Article).meta?.order || 0) - ((b[1] as Article).meta?.order || 0))}>
                {([slug, item]) => {
                    const [expanded, setExpanded] = createSignal<boolean>(!!props.docs?.[slug]);

                    return (
                        <Show
                            when={typeof item === "object" && !item.meta}
                            fallback={
                                <>
                                    <a
                                        href={`/docs/${(item as Article).meta.slug}`}
                                        class={cn("item", { active: props.page === (item as Article).meta.slug })}
                                        onClick={(e) => {
                                            e.preventDefault();

                                            props.setPage((item as Article).meta.slug);

                                            history.pushState({}, "", `/docs/${(item as Article).meta.slug}`);
                                        }}
                                    >
                                        {(item as Article).meta.title}
                                    </a>
                                </>
                            }
                        >
                            <button class="label" onClick={() => setExpanded(!expanded())}>
                                {toName(slug)}
                                <Icon name={expanded() ? "chevron-down" : "chevron-left"} />
                            </button>
                            <Show when={expanded()}>
                                <Pages docs={props.docs} pages={item as ArticleMap} page={props.page} setPage={props.setPage} />
                            </Show>
                        </Show>
                    );
                }}
            </For>
        </nav>
    );
};

export default () => {
    const params = useParams();

    const [innerText, setInnerText] = createSignal<number | null>(null);
    const [page, setPage] = createSignal<string>(params.page);
    const [docs, setDocs] = createSignal<ArticleMap>();

    const listener = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            next();
        }

        if (e.key === "ArrowLeft") {
            prev();
        }
    };

    const clickListener = (e: MouseEvent) => {
        console.log(e.target, (e.target as HTMLElement)?.tagName, (e.target as HTMLElement)?.dataset);
        if ((e.target as HTMLElement)?.tagName === "BUTTON") {
            if ((e.target as HTMLElement)?.dataset.code) {
                e.preventDefault();

                navigator.clipboard.writeText((e.target as HTMLElement)?.dataset.code || "");

                (e.target as HTMLElement)?.classList.add("copied");
            }
        }
    };

    onMount(async () => {
        setDocs(await pages);

        window.onkeydown = listener;
        window.onclick = clickListener;
    });

    createEffect(() => {
        console.log(page());

        page();

        setTimeout(() => {
            console.log("setting", document.querySelector<HTMLElement>(".markdown-body")?.innerText.split(" ").length || null);

            setInnerText(document.querySelector<HTMLElement>(".markdown-body")?.innerText.split(" ").length || null);
        }, 100);
    });

    const next = () => {
        const arr = flat(docs());

        const index = arr.findIndex((post) => post.slug === page());

        if (index === arr.length - 1) {
            return;
        }

        setPage(arr[index + 1].slug);

        history.pushState({}, "", `/docs/${arr[index + 1].slug}`);
    };

    const prev = () => {
        const arr = flat(docs());

        const index = arr.findIndex((post) => post.slug === page());

        if (index === 0) {
            return;
        }

        setPage(arr[index - 1].slug);

        history.pushState({}, "", `/docs/${arr[index - 1].slug}`);
    };

    return (
        <>
            <Title>{"RelaGit - " + (getPost(docs(), page())?.meta.title || "Documentation")}</Title>

            <Meta name="description" content={getPost(docs(), page())?.meta.description} />
            <Meta name="og:title" content={"RelaGit - " + (getPost(docs(), page())?.meta.title || "Documentation")} />
            <Meta name="og:description" content={getPost(docs(), page())?.meta.description} />
            <Meta name="og:type" content="article" />
            <Meta name="og:image" content="https://git.rela.dev/assets/opengraph.png" />

            <Meta name="twitter:title" content={"RelaGit - " + (getPost(docs(), page())?.meta.title || "Documentation")} />
            <Meta name="twitter:description" content={getPost(docs(), page())?.meta.description} />

            <Show
                when={docs()}
                fallback={
                    <div class="post-empty">
                        <Header />
                        <aside class="sidebar">
                            <For each={Array.from({ length: Math.ceil(Math.random() * 4) })}>
                                {() => (
                                    <>
                                        <div class="label empty"></div>
                                        <For each={Array.from({ length: Math.floor(Math.random() * 4) + 1 })}>{() => <div class="item empty" />}</For>
                                    </>
                                )}
                            </For>
                        </aside>
                        <div class="post">
                            <div class="post__content">
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
                <Show when={getPost(docs(), page())} fallback={<FourOhFour />}>
                    <Header />
                    <aside class="sidebar">
                        <Pages docs={docs()} pages={docs()} page={page()} setPage={setPage} />
                    </aside>
                    <div class="post">
                        <div class="post__content">
                            <h1 class="title">
                                {getPost(docs(), page())?.meta.title}
                                <div class="read-time">
                                    <Icon name="clock" />
                                    {time((innerText() || 0) / 125)}
                                </div>
                            </h1>
                            <h2 class="description">{getPost(docs(), page())?.meta.description}</h2>
                            <Show when={getPost(docs(), page())?.body}>
                                <div class="markdown-body">
                                    <ErrorBoundary fallback={"error"}>{getPost(docs(), page())?.body}</ErrorBoundary>
                                </div>
                            </Show>
                        </div>
                        <div class="byline">
                            <span>Updated on {getPost(docs(), page())?.meta.date}</span>
                            <a title="Edit on GitHub" target="_blank" href={`https://github.com/relagit/git.rela.dev/edit/main/src/data/docs/${params.page}.mdx`}>
                                <Icon name="pencil" />
                            </a>
                            <a title="View on GitHub" target="_blank" href={`https://github.com/relagit/git.rela.dev/tree/main/src/data/docs/${params.page}.mdx`}>
                                <Icon name="link-external" />
                            </a>
                            <div class="nav-buttons">
                                <button
                                    class="nav-button"
                                    title={flat(docs())[flat(docs()).findIndex((post) => post.slug === page()) - 1]?.meta.title || "Previous Page"}
                                    onClick={prev}
                                    disabled={(() => {
                                        const arr = flat(docs());

                                        return arr[0].slug === page();
                                    })()}
                                >
                                    <Icon name="arrow-left" />
                                </button>
                                <button
                                    class="nav-button"
                                    title={flat(docs())[flat(docs()).findIndex((post) => post.slug === page()) + 1]?.meta.title || "Next Page"}
                                    onClick={next}
                                    disabled={(() => {
                                        const arr = flat(docs());

                                        return arr[arr.length - 1].slug === page();
                                    })()}
                                >
                                    <Icon name="arrow-right" />
                                </button>
                            </div>
                        </div>
                    </div>
                </Show>
            </Show>
        </>
    );
};
