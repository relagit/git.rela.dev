export default (...classes: (string | number | boolean | undefined | Record<string, boolean | string | undefined>)[]): string => {
    return classes
        .map((c) => {
            if (typeof c === "string" || typeof c === "number") {
                return c.toString();
            }

            if (typeof c === "object") {
                return Object.entries(c)
                    .filter(([, v]) => v)
                    .map(([k]) => k)
                    .join(" ");
            }

            return "";
        })
        .filter(Boolean)
        .join(" ");
};
