import { createSignal, For, Show } from "solid-js";
import type { DocsSchema } from "~/content/config";
import Icon from "./Icon";

export type DocsMap = (
    | {
          type: "doc";
          slug: string;
          data: DocsSchema;
      }
    | { type: "folder"; name: string; items: DocsMap }
)[];

const RecursiveDocsMap = (props: {
    docsMap: DocsMap;
    slug: string;
    level: number;
}) => {
    const [levelExpanded, setLevelExpanded] = createSignal<string[]>(
        props.level === 0 ?
            [
                ...props.docsMap
                    .filter((d) => d.type === "folder")
                    // @ts-ignore
                    .map((d) => d.name),
                props.docsMap.find(
                    (d) =>
                        d.type === "folder" &&
                        d.items.find(
                            (d) => d.type === "doc" && d.slug === props.slug,
                        ),
                    // @ts-expect-error
                )?.name,
            ]
        :   [
                props.docsMap.find(
                    (d) =>
                        d.type === "folder" &&
                        d.items.find(
                            (d) => d.type === "doc" && d.slug === props.slug,
                        ),
                    // @ts-expect-error
                )?.name,
            ],
    );

    return (
        <nav>
            <For each={props.docsMap}>
                {(d) => {
                    if (d.type === "folder")
                        return (
                            <>
                                <button
                                    class="label"
                                    data-name={d.name}
                                    onClick={() =>
                                        setLevelExpanded(
                                            levelExpanded().includes(d.name) ?
                                                levelExpanded().filter(
                                                    (n) => n !== d.name,
                                                )
                                            :   [...levelExpanded(), d.name],
                                        )
                                    }
                                >
                                    {d.name}
                                    <div
                                        onClick={() =>
                                            setLevelExpanded(
                                                (
                                                    levelExpanded().includes(
                                                        d.name,
                                                    )
                                                ) ?
                                                    levelExpanded().filter(
                                                        (n) => n !== d.name,
                                                    )
                                                :   [
                                                        ...levelExpanded(),
                                                        d.name,
                                                    ],
                                            )
                                        }
                                        classList={{
                                            toggle: true,
                                            [`expanded`]:
                                                levelExpanded().includes(
                                                    d.name,
                                                ),
                                        }}
                                    >
                                        <Icon name="chevron-down" />
                                    </div>
                                </button>
                                <Show when={levelExpanded().includes(d.name)}>
                                    <RecursiveDocsMap
                                        docsMap={d.items}
                                        slug={props.slug}
                                        level={props.level + 1}
                                    />
                                </Show>
                            </>
                        );

                    return (
                        <a
                            href={`/docs/${d.slug}`}
                            class={
                                props.slug === d.slug ? "active item" : "item"
                            }
                        >
                            {d.data.title}
                        </a>
                    );
                }}
            </For>
        </nav>
    );
};

export default RecursiveDocsMap;
