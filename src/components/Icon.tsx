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

export const Discord = () => {
    return (
        <svg
            fill="currentColor"
            width={16}
            height={16}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 127.14 96.36"
        >
            <g id="图层_2" data-name="图层 2">
                <g id="Discord_Logos" data-name="Discord Logos">
                    <g
                        id="Discord_Logo_-_Large_-_White"
                        data-name="Discord Logo - Large - White"
                    >
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                    </g>
                </g>
            </g>
        </svg>
    );
};
