import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import { PluginOption, defineConfig } from "vite";

import withShiki from "@stefanprobst/remark-shiki";
import * as shiki from "shiki";
import { nodeTypes } from "@mdx-js/mdx";
import rehypeImgFigure from "rehype-img-figure";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import mdx from "@mdx-js/rollup";

export default defineConfig({
    plugins: [
        {
            ...mdx({
                jsx: true,
                jsxImportSource: "solid-js",
                providerImportSource: "solid-mdx",
                rehypePlugins: [rehypeSlug, rehypeImgFigure, [rehypeRaw, { passThrough: nodeTypes }]],
                remarkPlugins: [remarkGfm, [withShiki, { highlighter: await shiki.getHighlighter({ theme: "css-variables" }) }]],
            }),
            enforce: "pre",
        } as PluginOption,
        solid({
            extensions: [".mdx", ".md"],
            adapter: vercel(),
            ssr: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                format: "es",
            },
        },
    },
});
