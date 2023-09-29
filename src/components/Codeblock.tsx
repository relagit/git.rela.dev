import { Show, Suspense, createResource } from "solid-js";

import { createStarryNight, common } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";

import "./codeblock.scss";

export interface CodeblockProps {
    code: string;
    language?: string;
    filename?: string;
}

const makeScope = (lang: string) => {
    return `source.${lang}`;
};

const trim = (str: string) => {
    return str.replace(/^[\s\n]+|[\s\n]+$/g, "");
};

let highlighter: null | any = null;

export default (props: CodeblockProps) => {
    const [code] = createResource(async () => {
        if (!props.language) {
            return props.code;
        }

        if (!highlighter) {
            highlighter = await createStarryNight(common);
        }

        return highlighter.highlight(trim(props.code), makeScope(props.language));
    });

    return (
        <div class="codeblock">
            <Show when={props.filename && props.language}>
                <div class="codeblock-header">
                    <Show when={props.filename}>
                        <span class="codeblock-filename">{props.filename}</span>
                    </Show>
                    <Show when={props.language}>
                        <span class="codeblock-language">{props.language}</span>
                    </Show>
                </div>
            </Show>
            <div class="codeblock-content">
                <Suspense fallback={<div class="codeblock-content-inner">{trim(props.code)}</div>}>
                    <div
                        class="codeblock-content-inner"
                        innerHTML={
                            typeof code() === "string"
                                ? trim(code())
                                : toHtml(
                                      code() || {
                                          type: "root",
                                          children: [],
                                      }
                                  )
                        }
                    ></div>
                </Suspense>
            </div>
        </div>
    );
};
