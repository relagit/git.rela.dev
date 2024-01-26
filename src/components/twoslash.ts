import { createTransformerFactory, rendererRich } from "shikiji-twoslash/core";
import { createTwoslasher } from "twoslash";

/// <reference types="@types/relagit" />

export let twoslash: ReturnType<typeof createTwoslasher>;
export let transformerTwoslash: ReturnType<ReturnType<typeof createTransformerFactory>>;

try {
    twoslash = createTwoslasher({
        compilerOptions: {
            types: ["relagit"],
        },
    });

    transformerTwoslash = createTransformerFactory(twoslash)({
        renderer: rendererRich(),
    });
} catch (e) {
    console.warn("Failed to load twoslash", e);
    // throws a couple errors about require() in the client but meh
}
