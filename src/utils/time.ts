export const relative = (ms: number, useSeconds = false) => {
    const seconds = Math.floor((Date.now() - ms) / 1000);

    const timeIntervals: {
        interval: number;
        label: string;
    }[] = [
        { interval: 31536000, label: "year" },
        { interval: 2592000, label: "month" },
        { interval: 86400, label: "day" },
        { interval: 3600, label: "hour" },
        { interval: 60, label: "minute" },
    ];

    for (let i = 0; i < timeIntervals.length; i++) {
        const { interval, label } = timeIntervals[i];
        const quotient = Math.floor(seconds / interval);
        const negativeQuotient = Math.floor(seconds / (-1 * interval));

        if (quotient > 0) {
            return `${quotient} ${label}${quotient > 1 ? "s" : ""} ago`;
        }

        if (negativeQuotient > 0) {
            return `in ${Math.abs(quotient)} ${label}${Math.abs(quotient) > 1 ? "s" : ""}`;
        }
    }

    return useSeconds ?
            `${Math.abs(seconds)} second${Math.abs(seconds) > 1 ? "s" : ""}`
        :   "now";
};

export const readTime = (mins: number) => {
    if (mins < 1) {
        return `${Math.ceil(mins * 60)} sec`;
    }

    if (mins > 60) {
        return `${Math.floor(mins / 60)} hr`;
    }

    return `${Math.ceil(mins)} min`;
};
