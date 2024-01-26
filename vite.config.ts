import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import { PluginOption, defineConfig } from "vite";

import shikiji, { RehypeShikijiOptions } from "rehype-shikiji";
import { transformerTwoslash } from "shikiji-twoslash";
import { nodeTypes } from "@mdx-js/mdx";
import rehypeImgFigure from "rehype-img-figure";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { rehypeGithubAlerts, IOptions } from "rehype-github-alerts";
import mdx from "@mdx-js/rollup";
import headings from "rehype-autolink-headings";

export default defineConfig({
    plugins: [
        {
            ...mdx({
                jsx: true,
                jsxImportSource: "solid-js",
                providerImportSource: "solid-mdx",
                rehypePlugins: [
                    rehypeSlug,
                    rehypeImgFigure,
                    [rehypeRaw, { passThrough: nodeTypes }],
                    [headings, { behavior: "wrap" }],
                    [
                        // @ts-ignore
                        shikiji,
                        {
                            theme: "github-dark",
                            transformers: [
                                transformerTwoslash({
                                    langs: ["typescript", "javascript", "jsx", "tsx", "json"],
                                    twoslashOptions: {
                                        compilerOptions: {
                                            types: ["relagit"],
                                        },
                                    },
                                }),
                            ],
                        } satisfies RehypeShikijiOptions,
                    ],
                    [
                        rehypeGithubAlerts,
                        {
                            alerts: [
                                {
                                    keyword: "TIP",
                                    icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.5C5.637 1.5 4 3.19 4 5.25C4 6.234 4.424 6.875 4.984 7.554L5.198 7.807C5.421 8.071 5.668 8.363 5.871 8.655C6.155 9.066 6.408 9.551 6.492 10.145C6.51202 10.338 6.45649 10.5312 6.33707 10.6841C6.21766 10.837 6.04365 10.9376 5.85158 10.9649C5.65951 10.9922 5.46434 10.9441 5.30704 10.8305C5.14974 10.717 5.04256 10.5469 5.008 10.356C4.968 10.074 4.845 9.809 4.638 9.509C4.46879 9.27344 4.2879 9.04649 4.096 8.829C4.012 8.729 3.923 8.624 3.828 8.509C3.201 7.75 2.5 6.766 2.5 5.25C2.5 2.31 4.863 0 8 0C11.137 0 13.5 2.31 13.5 5.25C13.5 6.766 12.799 7.75 12.172 8.509C12.077 8.624 11.988 8.729 11.904 8.828C11.697 9.073 11.521 9.281 11.363 9.509C11.155 9.809 11.033 10.074 10.993 10.356C10.9791 10.4535 10.9461 10.5473 10.8959 10.6321C10.8457 10.7168 10.7794 10.7909 10.7006 10.85C10.6218 10.9091 10.5321 10.9521 10.4367 10.9765C10.3413 11.001 10.242 11.0064 10.1445 10.9925C10.047 10.9786 9.95318 10.9456 9.86843 10.8954C9.78367 10.8452 9.70962 10.7789 9.65052 10.7001C9.59142 10.6213 9.54841 10.5316 9.52396 10.4362C9.4995 10.3408 9.49408 10.2415 9.508 10.144C9.592 9.551 9.845 9.066 10.129 8.655C10.332 8.363 10.579 8.071 10.802 7.807C10.877 7.719 10.949 7.634 11.015 7.554C11.576 6.875 12 6.234 12 5.25C12 3.19 10.363 1.5 8 1.5ZM6 15.25C6 15.0511 6.07902 14.8603 6.21967 14.7197C6.36032 14.579 6.55109 14.5 6.75 14.5H9.25C9.44891 14.5 9.63968 14.579 9.78033 14.7197C9.92098 14.8603 10 15.0511 10 15.25C10 15.4489 9.92098 15.6397 9.78033 15.7803C9.63968 15.921 9.44891 16 9.25 16H6.75C6.55109 16 6.36032 15.921 6.21967 15.7803C6.07902 15.6397 6 15.4489 6 15.25ZM5.75 12C5.55109 12 5.36032 12.079 5.21967 12.2197C5.07902 12.3603 5 12.5511 5 12.75C5 12.9489 5.07902 13.1397 5.21967 13.2803C5.36032 13.421 5.55109 13.5 5.75 13.5H10.25C10.4489 13.5 10.6397 13.421 10.7803 13.2803C10.921 13.1397 11 12.9489 11 12.75C11 12.5511 10.921 12.3603 10.7803 12.2197C10.6397 12.079 10.4489 12 10.25 12H5.75Z" fill="currentColor"/></svg>',
                                    title: "Tip",
                                },
                                {
                                    keyword: "NOTE",
                                    icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1189_748)"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM6.5 7.75C6.5 7.33579 6.83579 7 7.25 7H8.25C8.66421 7 9 7.33579 9 7.75V10.5H9.25C9.66421 10.5 10 10.8358 10 11.25C10 11.6642 9.66421 12 9.25 12H7.25C6.83579 12 6.5 11.6642 6.5 11.25C6.5 10.8358 6.83579 10.5 7.25 10.5H7.5V8.5H7.25C6.83579 8.5 6.5 8.16421 6.5 7.75ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z" fill="currentColor"/></g><defs><clipPath id="clip0_1189_748"><rect width="16" height="16" fill="currentColor"/></clipPath></defs></svg>',
                                    title: "Note",
                                },
                            ],
                        } satisfies IOptions,
                    ],
                ],
                remarkPlugins: [remarkGfm],
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
