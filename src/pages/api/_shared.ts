export const json = (data: any, headers?: HeadersInit) => {
    return new Response(JSON.stringify(data), {
        headers: {
            ...headers,
            "content-type": "application/json;charset=UTF-8",
        },
    });
};
