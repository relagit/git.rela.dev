import { Meta, Title, useParams } from "solid-start";
import { createSignal, ErrorBoundary, For, JSX, lazy, onMount, Setter, Show } from "solid-js";

import FourOhFour from "~/routes/[...404]";
import _assemble, { type Article, type ArticleMap } from "./_assemble";

import "./docs.scss";
import Header from "~/components/Header";
import Icon from "~/components/Icon";
import cn from "~/utils/cn";

const pages = await _assemble();

const toName = (str: string) => {
    return str
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
};

const getPost = (slug: string): Article | null => {
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

const Pages = (props: { page: string; setPage: Setter<string>; pages: ArticleMap }) => {
    return (
        <For each={Object.entries(props.pages).sort((a, b) => ((a[1] as Article).meta?.order || 0) - ((b[1] as Article).meta?.order || 0))}>
            {([slug, item]) => (
                <>
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
                        <div class="label">{toName(slug)}</div>
                        <Pages pages={item as ArticleMap} page={props.page} setPage={props.setPage} />
                    </Show>
                </>
            )}
        </For>
    );
};

export default () => {
    const params = useParams();

    const [page, setPage] = createSignal<string>(params.page);

    return (
        <>
            <Title>{getPost(page())?.meta.title}</Title>
            <Meta name="description" content={getPost(page())?.meta.description} />
            <Meta name="og:title" content={getPost(page())?.meta.title} />
            <Meta name="og:description" content={getPost(page())?.meta.description} />
            <Meta name="og:type" content="article" />
            <Meta name="twitter:title" content={getPost(page())?.meta.title} />
            <Meta name="twitter:description" content={getPost(page())?.meta.description} />
            <Show when={getPost(page())} fallback={<FourOhFour />}>
                <Header />
                <aside class="sidebar">
                    <Pages pages={pages} page={page()} setPage={setPage} />
                </aside>
                <div class="post">
                    <div class="post__content">
                        <h1 class="title">{getPost(page())?.meta.title}</h1>
                        <h2 class="description">{getPost(page())?.meta.description}</h2>
                        <div class="markdown-body">
                            <ErrorBoundary fallback="hi">
                                <Show when={getPost(page())?.default}>{getPost(page())?.default}</Show>
                            </ErrorBoundary>
                        </div>
                    </div>
                    <div class="byline">
                        <span>
                            Updated on{" "}
                            {getPost(page())?.meta.date.toLocaleString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <a title="Edit on GitHub" href={`https://github.com/relagit/git.rela.dev/edit/main/src/data/docs/${params.page}.mdx`}>
                            <Icon name="pencil" />
                        </a>
                        <a title="View on GitHub" href={`https://github.com/relagit/git.rela.dev/tree/main/src/data/docs/${params.page}.mdx`}>
                            <Icon name="link-external" />
                        </a>
                    </div>
                </div>
            </Show>
        </>
    );
};
