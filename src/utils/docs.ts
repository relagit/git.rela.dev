import { JSX } from "solid-js";
import server$ from "solid-start/server";

import fs from "fs";
import nodepath from "path";

const pages = import.meta.glob("../data/docs/**/*.(mdx|md)");

const __dirname = nodepath.dirname(new URL(import.meta.url).pathname);

export type Article = {
    default: JSX.Element;
    meta: {
        readTime: string;
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

export type FlatArticleMap = {
    slug: string;
    meta: Article["meta"];
}[];

const time = (minutes: number) => {
    if (minutes > 60) {
        return Math.round(minutes / 60) + " hr";
    }

    if (minutes < 1) {
        return Math.round(minutes * 60) + " sec";
    }

    return Math.round(minutes) + " min";
};

const PRE_SLUG = /\d-/g;

export default server$(async (): Promise<ArticleMap> => {
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
                    readTime: time(fs.readFileSync(nodepath.join(__dirname, path)).toString().split("\n").length / 200),
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
});

export const flat = (docs: ArticleMap | undefined, parent?: string): FlatArticleMap => {
    if (!docs) {
        return [];
    }

    const flatDocs: FlatArticleMap = [];

    for (const slug in docs) {
        const doc = docs[slug];

        if (typeof doc === "object" && doc["meta"]) {
            flatDocs.push({
                slug: (parent ? `${parent}/` : "") + slug,
                meta: (doc as Article).meta,
            });
        } else {
            flatDocs.push(...flat(doc as ArticleMap, (parent ? `${parent}/` : "") + slug).sort((a, b) => a.meta.order - b.meta.order));
        }
    }

    return flatDocs;
};
