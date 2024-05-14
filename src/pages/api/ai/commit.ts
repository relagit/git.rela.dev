import type { APIRoute } from "astro";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

import { json } from "../_shared";

const google = createGoogleGenerativeAI({
    apiKey: import.meta.env.GEMINI_API_KEY,
});

const model = google("models/gemini-pro");

export const POST: APIRoute = async (request) => {
    const raw = await request.request.json().catch(() => undefined);

    if (
        request.request.headers.get("Authorization") !==
        `Bearer ${import.meta.env.API_PASSWORD}`
    )
        return json({ error: "Invalid API key" }, undefined, 401);

    let prompt: string;

    if (!raw) return json({ error: "Invalid JSON" }, undefined, 400);

    prompt = raw.prompt;

    if (!prompt?.trim())
        return json({ error: "Prompt is required" }, undefined, 400);

    if (
        !prompt.toLowerCase().includes("commit") ||
        !prompt.toLowerCase().includes("file") ||
        !prompt.toLowerCase().includes("git") ||
        !prompt.toLowerCase().includes("diff")
    )
        return json({ error: "Invalid prompt" });

    const estimateTokens = prompt.split(" ").length * 1.4;

    if (estimateTokens > 10000)
        return json({ error: "Prompt is too long" }, undefined, 400);

    try {
        const result = await streamText({
            model,
            prompt,
            maxRetries: 1,
        });

        const stream = new ReadableStream({
            start(controller) {
                (async () => {
                    for await (const chunk of result.textStream) {
                        controller.enqueue(chunk);
                    }

                    controller.close();
                })();
            },
        });

        return new Response(stream, {
            headers: {
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (e) {
        return json({ error: (e as Error).message || e }, undefined, 500);
    }
};

export const GET: APIRoute = async ({ rewrite }) => {
    return rewrite("/404");
};
