import octicons from "@primer/octicons";

import "./icon.scss";

export type IconName = keyof typeof octicons;

export const customIcons = {};

export interface IIconProps {
    name: IconName | keyof typeof customIcons;
    variant?: 12 | 16 | 24;
    className?: string;
    size?: number;
    style?: string;
}

export default (props: IIconProps) => {
    return (
        <span
            class={`icon ${props.className || ""}`}
            innerHTML={
                props.variant ?
                    `<svg style="${props.style}" width=${props.size || props.variant} height=${props.size || props.variant} viewBox="0 0 ${props.size || props.variant} ${
                        props.size || props.variant
                    }" fill="none" xmlns="http://www.w3.org/2000/svg">
                        ${octicons[props.name].heights[props.variant]?.path}
                    </svg>`
                :   octicons[props.name].toSVG({
                        width: props.size || props.variant || 16,
                        // @ts-expect-error - guh
                        style: props.style,
                    })
            }
        ></span>
    );
};

export const ProductHunt = () => {
    return (
        <svg
            fill="currentColor"
            width={16}
            height={16}
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20 0A1 1 0 0020 40 1 1 0 0020 0M17 30 13 30 13 10 22.666 10A1 1 0 0122.666 24L17 24 17 30M22.666 20H17v-6h5.666a3 3 0 110 6"></path>
        </svg>
    );
};

export const Twitter = () => {
    return (
        <svg
            fill="currentColor"
            width={16}
            height={16}
            viewBox="0 0 300 271"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
        </svg>
    );
};
