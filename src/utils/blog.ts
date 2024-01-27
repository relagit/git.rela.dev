import { JSX } from "solid-js";

const pages = import.meta.glob("../data/blog/**/*.(mdx|md)", {});

export type BlogArticle = {
    body: JSX.Element;
    meta: {
        title: string;
        slug: string;
        description: string;
        date: string;
        image?: string;
        alt?: string;
    };
};

export type BlogArticleMap = {
    [slug: string]: BlogArticle;
};

export type BlogFlatArticleMap = {
    slug: string;
    meta: BlogArticle["meta"];
}[];

const PRE_SLUG = /\d-/g;

export default async (): Promise<BlogArticleMap> => {
    const articles: BlogArticleMap = {};

    for (const path in pages) {
        try {
            let slug = path.match(/\.\/data\/blog\/(.*)\.mdx?$/)?.[1];
            const body = (await pages[path]()) as any;

            if (slug?.match(PRE_SLUG)) {
                slug = slug.replace(PRE_SLUG, "");
            }

            const article: BlogArticle = {
                body: body.default,
                meta: {
                    image: body.meta.image,
                    title: body.meta.title,
                    slug: slug || "",
                    description: body.meta.description,
                    date: new Date(body.meta.date).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }),
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
                        current = current[part] as unknown as BlogArticleMap;
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

export const flat = (blog: BlogArticleMap | undefined, parent?: string): BlogFlatArticleMap => {
    if (!blog) {
        return [];
    }

    const flatblog: BlogFlatArticleMap = [];

    for (const slug in blog) {
        const doc = blog[slug];

        if (typeof doc === "object" && doc["meta"]) {
            flatblog.push({
                slug: (parent ? `${parent}/` : "") + slug,
                meta: (doc as BlogArticle).meta,
            });
        } else {
            flatblog.push(...flat(doc as unknown as BlogArticleMap, (parent ? `${parent}/` : "") + slug).sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()));
        }
    }

    return flatblog;
};
