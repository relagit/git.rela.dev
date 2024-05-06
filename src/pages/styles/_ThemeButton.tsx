import { Show } from "solid-js";
import type themes from "./_themes";
import Icon from "~/components/Icon";

export default (props: { theme: (typeof themes)[number] }) => {
    return (
        <button
            classList={{
                "styles-selector-item": true,
                center: props.theme.files.length === 0,
            }}
            id={`theme-${props.theme.name.replace(/\W/g, "-")}`}
            onClick={() => {
                if (document.getElementById("theme")) {
                    document.getElementById("theme")!.remove();
                }

                const style = document.createElement("style");

                style.id = "theme";

                style.textContent = props.theme.files.join("\n");

                document.documentElement.appendChild(style);

                for (const button of Array.from(
                    document.querySelectorAll(".styles-selector-item"),
                )) {
                    button.classList.remove("selected");
                }

                const button = document.getElementById(
                    `theme-${props.theme.name.replace(/\W/g, "-")}`,
                )!;

                button.classList.add("selected");
            }}
        >
            <div class="styles-selector-item-title">{props.theme.name}</div>
            <Show when={props.theme.description}>
                <div class="styles-selector-item-description">
                    {props.theme.description}
                </div>
            </Show>
            <Show when={props.theme.github}>
                <a
                    href={`https://github.com/${props.theme.github}`}
                    target="_blank"
                    class="styles-selector-item-github"
                >
                    <Icon name="mark-github" />
                </a>
            </Show>
        </button>
    );
};
