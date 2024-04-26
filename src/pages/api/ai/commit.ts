import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";
import type { APIRoute } from "astro";
import { json } from "../_shared";

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });

export const POST: APIRoute = async (request) => {
    const raw = await request.request.text();

    if (
        request.request.headers.get("Authorization") !==
        `Bearer ${import.meta.env.API_PASSWORD}`
    )
        return json({ error: "Invalid API key" });

    let prompt: string;

    try {
        const body = JSON.parse(raw);
        prompt = body.prompt;
    } catch (e) {
        return json({ error: "Invalid JSON" });
    }

    if (!prompt?.trim()) return json({ error: "Prompt is required" });

    if (
        !prompt.toLowerCase().includes("commit") ||
        !prompt.toLowerCase().includes("file") ||
        !prompt.toLowerCase().includes("git") ||
        !prompt.toLowerCase().includes("diff")
    )
        return json({ error: "Invalid prompt" });

    try {
        const { totalTokens } = await model.countTokens(prompt);

        if (totalTokens > 10000) return json({ error: "Prompt is too long" });
    } catch (e) {
        return json(
            {
                error: "Could not fetch ai model",
            },
            undefined,
            500,
        );
    }

    try {
        const result = await model.generateContentStream(prompt);

        const stream = new ReadableStream({
            start(controller) {
                (async () => {
                    for await (const chunk of result.stream) {
                        controller.enqueue(chunk.text());
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
        return json({ error: (e as Error).message || e });
    }
};

export const GET: APIRoute = async () => {
    return json({ error: "Invalid method" });
};
