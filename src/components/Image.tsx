import { JSX } from "solid-js";

import "./image.scss";

export default (props: JSX.HTMLAttributes<HTMLElement> & { alt: string; light?: string; dark?: string; src?: string }) => {
    return (
        <figure
            {...props}
            aria-label={props.alt}
            classList={{
                [props.class || ""]: true,
                "opt-image": true,
                ...props.classList,
            }}
            style={{
                "--light-url": `url(${props.light})`,
                "--dark-url": `url(${props.dark})`,
            }}
        />
    );
};
