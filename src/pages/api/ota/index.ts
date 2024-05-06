import type { APIRoute } from "astro";
import type { JSX } from "solid-js/jsx-runtime";

type NotificationProps = {
    icon?: string;
    iconUrl?: string;
    title: string;
    description: string;
    level: "info" | "warning" | "error" | "success";
    actions?: ({
        children: JSX.Element | JSX.Element[];
        type: "default" | "brand" | "danger" | "outline" | "positive";
        href?: string;
        className?: string;
        disabled?: boolean;
        dedupe?: boolean;
        label: string;
        rest?: JSX.ButtonHTMLAttributes<HTMLButtonElement>;
    } & {
        dismiss?: boolean;
    })[];
    timeout?: number;
};

export const GET: APIRoute = () => {
    const notification: Partial<NotificationProps>[] = [
        {
            title: "Survey",
            description:
                "Support the project by completing a short survey about how you use RelaGit.",
            level: "info",
            actions: [
                {
                    href: "https://docs.google.com/forms/d/e/1FAIpQLSff4-RyF36UjZD74gmOap0OU5Bcr-l6kVT356XQMmX_ALVy2w/viewform?usp=sf_link",
                    label: "Complete Survey",
                    children: "Complete Survey",
                    dismiss: true,
                    type: "brand",
                },
                {
                    label: "No Thanks",
                    children: "No Thanks",
                    dismiss: true,
                    type: "default",
                },
            ],
        },
    ];

    return new Response(JSON.stringify(notification), {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
