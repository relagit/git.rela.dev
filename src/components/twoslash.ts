import { isDev } from "solid-js/web";

import { createTransformerFactory, rendererRich } from "shikiji-twoslash/core";
import { createTwoslasher } from "twoslash";

/// <reference types="@types/relagit" />

export let twoslash: ReturnType<typeof createTwoslasher>;
export let transformerTwoslash: ReturnType<ReturnType<typeof createTransformerFactory>>;

const __dirname = new URL(".", import.meta.url).pathname;

try {
    twoslash = createTwoslasher({
        compilerOptions: {
            types: ["relagit"],
        },
        tsLibDirectory: __dirname.includes("components") ? __dirname + "../../node_modules/typescript/lib" : __dirname + "../node_modules/typescript/lib",
    });

    transformerTwoslash = createTransformerFactory(twoslash)({
        renderer: rendererRich(),
    });
} catch (e) {
    console.warn("Failed to load twoslash", e);
    // throws a couple errors about require() in the client but meh
}
