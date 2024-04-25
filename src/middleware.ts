import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = (ctx, next) => {
    if (ctx.url.pathname.includes("api"))
        ctx.request.headers.set("Access-Control-Allow-Origin", "*");

    if (ctx.cookies.get("abTestGroup")) {
        ctx.locals.abTestGroup = ctx.cookies.get("abTestGroup")?.value;
    } else {
        // set a default value
        ctx.locals.abTestGroup = Math.random() > 0.5 ? "A" : "B";

        // set a cookie
        ctx.cookies.set("abTestGroup", ctx.locals.abTestGroup);
    }

    return next();
};
