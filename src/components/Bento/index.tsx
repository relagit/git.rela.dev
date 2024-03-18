import type { JSX } from "solid-js";
import type { IconName } from "../Icon";
import Icon from "../Icon";

import "./index.scss";

export const BentoItem = (props: {
    children: JSX.Element;
    icon: IconName;
    heading: string;
    highlight?: boolean;
    size?: "small" | "large";
}) => {
    return (
        <div
            classList={{
                "bento-item": true,
                [props.size || "small"]: true,
                highlight: props.highlight,
            }}
        >
            <h3
                class="bento-item__heading"
                id={props.heading.replaceAll(/[^\w]/g, "-")}
                tabindex="0"
            >
                <Icon name={props.icon} />
                {props.heading}
            </h3>
            <div class="bento-item__content">{props.children}</div>
        </div>
    );
};

export const DocsBento = (props: { children: JSX.Element }) => {
    return <div class="docs-bento">{props.children}</div>;
};
