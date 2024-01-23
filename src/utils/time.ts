import { Accessor, createRenderEffect, from } from "solid-js";

export const relative = (ms: number) => {
    const now = Date.now();
    const diff = now - ms;

    if (diff > 0) return "now";

    const seconds = Math.abs(Math.floor((diff / 1000) % 60));
    const minutes = Math.abs(Math.floor((diff / (1000 * 60)) % 60));
    const hours = Math.abs(Math.floor((diff / (1000 * 60 * 60)) % 24));
    const days = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));

    if (days < 1 && hours < 1 && minutes < 1 && seconds < 1) return "now";
    if (days < 1 && hours < 1 && minutes < 1) return `${seconds}s`;
    if (days < 1 && hours < 1) return `${minutes}:${seconds}`;
    if (days < 1) return `${hours}:${minutes}:${seconds}`;

    return `${days}:${hours}:${minutes}:${seconds}`;
};

export const renderDate = (ms: number): Accessor<string | undefined> => {
    return from((set) => {
        const defer: (() => unknown)[] = [];

        const listener = () => set(relative(ms));
        defer.push(listener);

        const interval = setInterval(listener, 1000);
        defer.push(() => clearInterval(interval));

        createRenderEffect(() => set(relative(ms)));

        return () => {
            for (const cleanup of defer) {
                cleanup();
            }
        };
    });
};
