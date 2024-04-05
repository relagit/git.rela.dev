export const json = (data: object, headers?: HeadersInit, status = 200) => {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            ...headers,
            "content-type": "application/json;charset=UTF-8",
        },
    });
};
