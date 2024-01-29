export const json = (data: any) => {
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    });
};
