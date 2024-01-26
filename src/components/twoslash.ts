import { createTransformerFactory, rendererRich } from "shikiji-twoslash/core";
import { isDev } from "solid-js/web";
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
        tsLibDirectory: isDev ? __dirname + "/../../node_modules/typescript/lib" : "node_modules/typescript/lib",
    });

    transformerTwoslash = createTransformerFactory(twoslash)({
        renderer: rendererRich(),
    });
} catch (e) {
    console.warn("Failed to load twoslash", e);
    // throws a couple errors about require() in the client but meh
}
