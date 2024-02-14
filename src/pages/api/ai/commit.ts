import { GoogleGenerativeAI } from "@google/generative-ai";
import type { APIRoute } from "astro";
import { json } from "../_shared";

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
        !prompt.toLowerCase().includes("relagit") ||
        !prompt.toLowerCase().includes("file") ||
        !prompt.toLowerCase().includes("git")
    )
        return json({ error: "Invalid prompt" });

    try {
        const result = await model.generateContent(prompt);

        const text = result.response.text();

        const message = text.split("\n")[0].trim();
        const body = text.split("\n").slice(1).join("\n").trim();

        return json({
            message,
            body,
        });
    } catch (e) {
        return json({ error: (e as Error).message || e });
    }
};

export const GET: APIRoute = async () => {
    return json({ error: "Invalid method" });
};
