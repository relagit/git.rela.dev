import { Show } from "solid-js";
import type themes from "./themes";
import Icon from "~/components/Icon";

export default (props: { theme: (typeof themes)[number] }) => {
    return (
        <button
            classList={{
                "styles-selector-item": true,
                center: props.theme.files.length === 0,
            }}
            onClick={() => {
                if (document.getElementById("theme")) {
                    document.getElementById("theme")!.remove();
                }

                const style = document.createElement("style");

                style.id = "theme";

                style.textContent = props.theme.files.join("\n");

                document.documentElement.appendChild(style);
            }}
        >
            <div class="styles-selector-item-title">{props.theme.name}</div>
            <div class="styles-selector-item-description">
                {props.theme.description}
            </div>
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
