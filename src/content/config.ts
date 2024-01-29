import { z, defineCollection } from "astro:content";

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
});

const blog = defineCollection({
    type: "content",
    schema: blogSchema,
});

const docs = defineCollection({
    type: "content",
    schema: docsSchema,
});

export const collections = {
    blog,
    docs,
};

export type DocsSchema = z.infer<typeof blogSchema>;
export type BlogSchema = z.infer<typeof blogSchema>;
