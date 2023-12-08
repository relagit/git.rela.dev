import { JSX } from "solid-js";

import cn from "~/utils/cn";

import "./button.scss";

export default (props: { href?: string; onClick?: () => void; class?: string; disabled?: boolean; children: JSX.Element }) => {
    return props.href ? (
        <a href={props.href} class={cn(props.class, "button", props.disabled && "disabled")}>
            {props.children}
        </a>
    ) : (
        <button onClick={props.onClick} class={cn(props.class, "button", props.disabled && "disabled")} disabled={props.disabled}>
            {props.children}
        </button>
    );
};
