import { JSX } from "solid-js";

import cn from "~/utils/cn";

import "./button.scss";

export default (props: { size?: "default" | "large"; type: "brand" | "outline" | "primary"; href?: string; onClick?: () => void; class?: string; disabled?: boolean; children: JSX.Element }) => {
    return props.href ? (
        <a href={props.href} class={cn(props.class, "button", props.type, props.disabled && "disabled", props.size)}>
            {props.children}
        </a>
    ) : (
        <button onClick={props.onClick} class={cn(props.class, "button", props.type, props.disabled && "disabled", props.size)}>
            {props.children}
        </button>
    );
};
