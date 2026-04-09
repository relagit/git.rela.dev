import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogSchema = z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    image: z.string().optional(),
    alt: z.string().optional(),
});

const docsSchema = z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    sortOrder: z.number(),
});

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: blogSchema,
});

const docs = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
    schema: docsSchema,
});

export const collections = {
    blog,
    docs,
};

export type DocsSchema = ReturnType<typeof docsSchema.parse>;
export type BlogSchema = ReturnType<typeof blogSchema.parse>;
