import octicons from "@primer/octicons";
import { Show, JSX } from "solid-js";

import "./icon.scss";

export type IconName = keyof typeof octicons;

export const customIcons = {};

export interface IIconProps {
    name: IconName | keyof typeof customIcons;
    variant?: 12 | 16 | 24;
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
                        ${octicons[props.name].heights[props.variant]?.path}
                    </svg>`
                    : octicons[props.name].toSVG({
                          width: props.size || props.variant || 16,
                      })
            }
        ></span>
    );
};

export const ProductHunt = () => {
    return (
        <svg fill="currentColor" width={16} height={16} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0A1 1 0 0020 40 1 1 0 0020 0M17 30 13 30 13 10 22.666 10A1 1 0 0122.666 24L17 24 17 30M22.666 20H17v-6h5.666a3 3 0 110 6"></path>
        </svg>
    );
};
