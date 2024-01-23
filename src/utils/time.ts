import { Accessor, createRenderEffect, from } from "solid-js";

export const relative = (ms: number) => {
    const now = Date.now();
    const diff = now - ms;

    const seconds = Math.abs(Math.floor((diff / 1000) % 60));
    const minutes = Math.abs(Math.floor((diff / (1000 * 60)) % 60));
    const hours = Math.abs(Math.floor((diff / (1000 * 60 * 60)) % 24));
    const days = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));

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
