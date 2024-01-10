import { JSX } from "solid-js";

const pages = import.meta.glob("../../data/docs/**/*.(mdx|md)");

export type Article = {
    default: JSX.Element;
    meta: {
        order: number;
        title: string;
        slug: string;
        description: string;
        date: Date;
    };
};

export type ArticleMap = {
    [slug: string]: ArticleMap | Article;
};

const PRE_SLUG = /\d-/g;

export default async (): Promise<ArticleMap> => {
    const articles: ArticleMap = {};

    for (const path in pages) {
        try {
            let slug = path.match(/\.\/data\/docs\/(.*)\.mdx?$/)?.[1];
            const body = (await pages[path]()) as any;

            if (slug?.match(PRE_SLUG)) {
                slug = slug.replace(PRE_SLUG, "");
            }

            const article: Article = {
                default: body.default,
                meta: {
                    order: body.meta.order,
                    title: body.meta.title,
                    slug: slug || "",
                    description: body.meta.description,
                    date: new Date(body.meta.date),
                },
            };

            if (slug) {
                const parts = slug.split("/");

                let current = articles;

                for (let i = 0; i < parts.length; i++) {
                    const part = parts[i];

                    if (i === parts.length - 1) {
                        current[part] = article;
                    } else {
                        current[part] = current[part] || {};
                        current = current[part] as ArticleMap;
                    }
                }
            }
        } catch (e) {
            console.error(e);

            continue;
        }
    }

    return articles;
};
