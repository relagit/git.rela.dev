import octicons from "@primer/octicons";
import { Show, JSX } from "solid-js";

import "./icon.scss";

export type IconName = keyof typeof octicons;

export const customIcons = {};

export interface IIconProps {
    name: IconName | keyof typeof customIcons;
    variant?: 12 | 16 | 24 | 32;
    className?: string;
    size?: number;
    style?: JSX.HTMLAttributes<HTMLSpanElement>["style"];
}

export default (props: IIconProps) => {
    return (
        <span
            style={props.style}
            class={`icon ${props.className || ""}`}
            innerHTML={
                props.variant
                    ? `<svg width=${props.size || props.variant} height=${props.size || props.variant} viewBox="0 0 ${props.size || props.variant} ${
                          props.size || props.variant
                      }" fill="none" xmlns="http://www.w3.org/2000/svg">
                        ${octicons[props.name].heights[props.variant].path}
                    </svg>`
                    : octicons[props.name].toSVG({
                          width: props.size || props.variant || 16,
                      })
            }
        ></span>
    );
};
