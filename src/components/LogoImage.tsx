import { Show, createSignal } from "solid-js";
import Icon from "./Icon";

import "./logoimage.scss";
import cn from "~/utils/cn";

type LogoImageProps = {
    light?: string;
    dark?: string;
    alt?: string;
    square?: boolean;
};

const [theme, setTheme] = createSignal<"light" | "dark">("light");

export default (props: LogoImageProps) => {
    return (
        <figure
            class={cn("logo-image", {
                square: props.square,
                light: props.light && props.dark && theme() === "light",
                dark: props.light && props.dark && theme() === "dark",
            })}
        >
            <div class="btns">
                <a
                    class="btn"
                    href={
                        props.dark && props.light ?
                            props[theme()]
                        :   props.light || props.dark
                    }
                    download
                >
                    <Icon name="download" />
                </a>
                <Show when={props.light && props.dark}>
                    <button
                        class="btn"
                        onClick={() =>
                            setTheme(theme() === "light" ? "dark" : "light")
                        }
                    >
                        <Icon name={theme() === "light" ? "moon" : "sun"} />
                    </button>
                </Show>
            </div>
            <img
                loading="lazy"
                src={
                    props.dark && props.light ?
                        props[theme()]
                    :   props.light || props.dark
                }
                alt={props.alt}
            />
        </figure>
    );
};
