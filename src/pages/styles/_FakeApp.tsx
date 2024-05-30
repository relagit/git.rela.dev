import { createSignal } from "solid-js";

export default (props: {
    vibrancy?: boolean;
    theme?: "system" | "light" | "dark";
}) => {
    const [vibrancy, setVibrancy] = createSignal(props.vibrancy ?? true);
    const [theme, setTheme] = createSignal<string>(props.theme ?? "system");

    return (
        <div class="fakeapp">
            <div class="window-controls">
                <div class="window-control close"></div>
                <div class="window-control minimize"></div>
                <div class="window-control maximize"></div>
            </div>
            <div class="preview-controls">
                <div class="preview-control">
                    <label for="vibrancy">Vibrancy</label>
                    <input
                        type="checkbox"
                        id="vibrancy"
                        checked={vibrancy()}
                        onChange={(e) => setVibrancy(e.target.checked)}
                    />
                </div>
                <div class="preview-control">
                    <label for="theme-t">Theme</label>
                    <select
                        id="theme-t"
                        value={theme()}
                        onChange={(e) => setTheme(e.target.value)}
                    >
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>
            <div id="root">
                <div
                    id="app-container"
                    classList={{
                        "platform-darwin": true,
                        focused: false,
                        [`theme-${theme()}`]: true,
                        vibrancy: vibrancy(),
                    }}
                >
                    <div class="window-control-bar"></div>
                    <div
                        aria-live="off"
                        class="layer layer-bare"
                        data-key="modal"
                    ></div>
                    <div
                        aria-live="assertive"
                        class="layer layer-bare visible"
                        data-key="notification"
                    ></div>
                    <div
                        class="sidebar sidebar-active"
                        role="complementary"
                        aria-hidden="true"
                    >
                        <div class="contextmenu-wrapper">
                            <div
                                role="button"
                                tabindex="0"
                                class="sidebar__header"
                                aria-label="Open Repository Drawer"
                                aria-expanded="false"
                            >
                                <div class="sidebar__header__info">
                                    <div class="sidebar__header__repository">
                                        relagit
                                    </div>
                                    <div class="sidebar__header__details">
                                        <span class="sidebar__header__details__branch">
                                            main
                                        </span>
                                    </div>
                                </div>
                                <div
                                    class="sidebar__header__chevron"
                                    style="transform: rotate(-90deg);"
                                >
                                    <span class="icon">
                                        <svg
                                            version="1.1"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            class="octicon octicon-chevron-down"
                                            aria-hidden="true"
                                        >
                                            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="sidebar__items"
                            style="height: calc(100% - 336px);"
                        >
                            <div class="contextmenu-wrapper">
                                <div
                                    role="button"
                                    class="sidebar__item active"
                                    tabindex="0"
                                    aria-label="Open packages/app/src/ui/Notification/index.tsx"
                                    aria-selected="true"
                                    data-id="258804b7d7f8e"
                                    data-active="true"
                                    data-status="modified"
                                >
                                    <div class="sidebar__item__fileicon">
                                        <img
                                            src="/assets/vscode-material-icons/generated/icons/react_ts.svg"
                                            alt="react_ts"
                                        />
                                    </div>
                                    <div class="sidebar__item__filename">
                                        <span
                                            class="sidebar__item__filename__path"
                                            title="packages/app/src/ui/Notification"
                                        >
                                            packages/app/src/ui/Notification
                                        </span>
                                        <span class="sidebar__item__filename__name">
                                            <span class="sidebar__item__filename__name__separator">
                                                /
                                            </span>
                                            index.tsx
                                        </span>
                                    </div>
                                    <button
                                        role="button"
                                        aria-label="Unstage Changes"
                                        class="sidebar__item__status modified staged"
                                    >
                                        M
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar__footer showing">
                            <div class="textarea__wrapper">
                                <textarea
                                    aria-label="Summary"
                                    class="textarea"
                                    placeholder="Summary"
                                ></textarea>
                                <div class="textarea__footer"></div>
                            </div>
                            <div
                                class="textarea__wrapper"
                                style="height: 100%;"
                            >
                                <textarea
                                    aria-label="Description"
                                    class="textarea expanded"
                                    placeholder="Description"
                                    style="height: 100%;"
                                ></textarea>
                                <div class="textarea__footer">
                                    <button
                                        class="sidebar__footer__textarea__button"
                                        aria-label="Generate Commit Details"
                                        tabindex="0"
                                        aria-labelledby=""
                                    >
                                        <span class="icon">
                                            <svg
                                                version="1.1"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                class="octicon octicon-sparkle-fill"
                                                aria-hidden="true"
                                            >
                                                <path d="M7.53 1.282a.5.5 0 0 1 .94 0l.478 1.306a7.492 7.492 0 0 0 4.464 4.464l1.305.478a.5.5 0 0 1 0 .94l-1.305.478a7.492 7.492 0 0 0-4.464 4.464l-.478 1.305a.5.5 0 0 1-.94 0l-.478-1.305a7.492 7.492 0 0 0-4.464-4.464L1.282 8.47a.5.5 0 0 1 0-.94l1.306-.478a7.492 7.492 0 0 0 4.464-4.464Z"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <button
                                tabindex="0"
                                aria-labelledby=""
                                role="button"
                                aria-label="Commit to main"
                                aria-disabled="true"
                                class="button brand"
                            >
                                Commit to main
                            </button>
                        </div>
                    </div>
                    <div class="workspace sidebar-active">
                        <div class="workspace__header">
                            <button
                                role="button"
                                aria-label="Sync"
                                class="workspace__header__panelbutton"
                                id="workspace-fetch-changes-and-remote"
                                tabindex="0"
                                aria-labelledby=""
                            >
                                <span class="icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M3.38 8A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 9.215 7.182.75.75 0 1 0 1.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 0 0-9.5 5.452V4.75a.75.75 0 0 0-1.5 0V8.5a1 1 0 0 0 1 1h3.75a.75.75 0 0 0 0-1.5H3.38Zm-.595 6.318a.75.75 0 0 0-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 0 0 1.5 0V15.5a1 1 0 0 0-1-1h-3.75a.75.75 0 0 0 0 1.5h2.37A9.502 9.502 0 0 1 12 21.5c-4.446 0-8.181-3.055-9.215-7.182Z"></path>
                                    </svg>
                                </span>
                                <div class="workspace__header__panelbutton__info">
                                    <div class="workspace__header__panelbutton__info__label">
                                        Sync
                                    </div>
                                    <div class="workspace__header__panelbutton__info__detail">
                                        3 minutes ago
                                    </div>
                                </div>
                            </button>
                            <div class="contextmenu-wrapper">
                                <button
                                    role="button"
                                    aria-label="No Changes"
                                    disabled
                                    class="workspace__header__panelbutton disabled"
                                    id="workspace-pull"
                                    tabindex="0"
                                    aria-labelledby=""
                                >
                                    <span class="icon">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M3 2.75A2.75 2.75 0 0 1 5.75 0h14.5a.75.75 0 0 1 .75.75v20.5a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1 0-1.5h5.25v-4H6A1.5 1.5 0 0 0 4.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 0 1-.6 1.374A3.251 3.251 0 0 1 3 18.75ZM19.5 1.5H5.75c-.69 0-1.25.56-1.25 1.25v12.651A2.989 2.989 0 0 1 6 15h13.5Z"></path>
                                            <path d="M7 18.25a.25.25 0 0 1 .25-.25h5a.25.25 0 0 1 .25.25v5.01a.25.25 0 0 1-.397.201l-2.206-1.604a.25.25 0 0 0-.294 0L7.397 23.46a.25.25 0 0 1-.397-.2v-5.01Z"></path>
                                        </svg>
                                    </span>
                                    <div class="workspace__header__panelbutton__info">
                                        <div class="workspace__header__panelbutton__info__label">
                                            No Changes
                                        </div>
                                        <div class="workspace__header__panelbutton__info__detail">
                                            Nothing to see here
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="workspace__header__spacer"></div>
                            <button
                                role="button"
                                aria-label="Switch branch"
                                aria-selected="false"
                                class="workspace__header__panelbutton"
                                id="workspace-branch"
                                tabindex="0"
                                aria-labelledby=""
                            >
                                <span class="icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M15 4.75a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM2.5 19.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm0-14.5a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM5.75 6.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 5.75 6.5Zm0 14.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 5.75 21Zm12.5-14.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 18.25 6.5Z"></path>
                                        <path d="M5.75 16.75A.75.75 0 0 1 5 16V8a.75.75 0 0 1 1.5 0v8a.75.75 0 0 1-.75.75Z"></path>
                                        <path d="M17.5 8.75v-1H19v1a3.75 3.75 0 0 1-3.75 3.75h-7a1.75 1.75 0 0 0-1.75 1.75H5A3.25 3.25 0 0 1 8.25 11h7a2.25 2.25 0 0 0 2.25-2.25Z"></path>
                                    </svg>
                                </span>
                            </button>
                            <button
                                role="button"
                                aria-label="Toggle blame view"
                                aria-selected="true"
                                class="workspace__header__panelbutton active"
                                id="workspace-blame"
                                tabindex="0"
                                aria-labelledby=""
                            >
                                <span class="icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M3.5 8a5.5 5.5 0 1 1 8.596 4.547 9.005 9.005 0 0 1 5.9 8.18.751.751 0 0 1-1.5.045 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.499-.044 9.005 9.005 0 0 1 5.9-8.181A5.496 5.496 0 0 1 3.5 8ZM9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.29 4c-.148 0-.292.01-.434.03a.75.75 0 1 1-.212-1.484 4.53 4.53 0 0 1 3.38 8.097 6.69 6.69 0 0 1 3.956 6.107.75.75 0 0 1-1.5 0 5.193 5.193 0 0 0-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0 0 17.29 8Z"></path>
                                    </svg>
                                </span>
                            </button>
                            <button
                                role="button"
                                aria-label="Toggle history"
                                aria-selected="false"
                                class="workspace__header__panelbutton"
                                id="workspace-history"
                                tabindex="0"
                                aria-labelledby=""
                            >
                                <span class="icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M11.998 2.5A9.503 9.503 0 0 0 3.378 8H5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1V4.75a.75.75 0 0 1 1.5 0v1.697A10.997 10.997 0 0 1 11.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 0 1 1.5-.037 9.5 9.5 0 0 0 9.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5Z"></path>
                                        <path d="M12.5 7.25a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 0 0 .744-1.302L12.5 12.315V7.25Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="workspace__container">
                            <div class="workspace__container__main">
                                <div class="workspace__container__main__file">
                                    <div class="workspace__container__main__file__path">
                                        packages/app/src/ui/Notification/
                                    </div>
                                    <div class="workspace__container__main__file__name">
                                        index.tsx
                                    </div>
                                </div>
                                <pre class="codeview lang-">
                                    <div class="codeview__line message">
                                        <div class="codeview__line__number">
                                            <span class="icon">
                                                <svg
                                                    version="1.1"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    class="octicon octicon-fold-up"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M7.823 1.677 4.927 4.573A.25.25 0 0 0 5.104 5H7.25v3.236a.75.75 0 1 0 1.5 0V5h2.146a.25.25 0 0 0 .177-.427L8.177 1.677a.25.25 0 0 0-.354 0ZM13.75 11a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5Zm-3.75.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM7.75 11a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM4 11.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM1.75 11a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5Z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="codeview__line__content">
                                            @@ -49,7 +49,7 @@ export const
                                            Notification = (props:
                                            NotificationProps) =&gt; {"{"}
                                        </div>
                                    </div>
                                    <div class="codeview__line unchanged">
                                        <div class="codeview__line__number">
                                            49
                                        </div>
                                        <div class="codeview__line__number">
                                            49
                                        </div>
                                        <div class="codeview__line__indicator unchanged"></div>
                                        <div class="codeview__line__content">
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>&lt;
                                            <span class="pl-ent">div</span>
                                            <span class="pl-e"> class</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-s">
                                                <span class="pl-pds">"</span>
                                                notification
                                                <span class="pl-pds">"</span>
                                            </span>
                                            <span class="pl-e">
                                                {" "}
                                                aria-label
                                            </span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-pse">{"{"}</span>
                                            <span class="pl-smi">props</span>.
                                            <span class="pl-c1">
                                                description
                                            </span>
                                            <span class="pl-pse">{"}"}</span>
                                            <span class="pl-e"> ref</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-pse">{"{"}</span>
                                            <span class="pl-smi">setRef</span>
                                            <span class="pl-pse">{"}"}</span>
                                            &gt;
                                        </div>
                                    </div>
                                    <div class="codeview__line unchanged">
                                        <div class="codeview__line__number">
                                            50
                                        </div>
                                        <div class="codeview__line__number">
                                            50
                                        </div>
                                        <div class="codeview__line__indicator unchanged"></div>
                                        <div class="codeview__line__content">
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>&lt;
                                            <span class="pl-ent">div</span>
                                            <span class="pl-e"> class</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-s">
                                                <span class="pl-pds">"</span>
                                                notification__content
                                                <span class="pl-pds">"</span>
                                            </span>
                                            &gt;
                                        </div>
                                    </div>
                                    <div class="codeview__line unchanged">
                                        <div class="codeview__line__number">
                                            51
                                        </div>
                                        <div class="codeview__line__number">
                                            51
                                        </div>
                                        <div class="codeview__line__indicator unchanged"></div>
                                        <div class="codeview__line__content">
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>&lt;
                                            <span class="pl-ent">div</span>
                                            <span class="pl-e"> classList</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-pse">{"{"}</span>
                                            {"{"} notification__icon:{" "}
                                            <span class="pl-c1">true</span>, [
                                            <span class="pl-smi">props</span>.
                                            <span class="pl-smi">level</span>]:{" "}
                                            <span class="pl-c1">true</span>{" "}
                                            {"}"}
                                            <span class="pl-pse">{"}"}</span>
                                            &gt;
                                        </div>
                                    </div>
                                    <div class="codeview__line deleted">
                                        <div class="codeview__line__number">
                                            52
                                        </div>
                                        <div class="codeview__line__number"></div>
                                        <div class="codeview__line__indicator deleted">
                                            -
                                        </div>
                                        <div class="codeview__line__content">
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>&lt;
                                            <span class="pl-c1">Icon</span>
                                            <span class="pl-e"> name</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-pse">{"{"}</span>
                                            <span class="pl-smi">props</span>.
                                            <span class="pl-smi">icon</span>
                                            <span class="pl-pse">{"}"}</span>
                                            <span class="pl-e"> variant</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-pse">{"{"}</span>
                                            <span class="pl-c1">24</span>
                                            <span class="pl-pse">
                                                {"}"}
                                            </span>{" "}
                                            /&gt;
                                        </div>
                                    </div>
                                    <div class="codeview__line added">
                                        <div class="codeview__line__number"></div>
                                        <div class="codeview__line__number">
                                            52
                                        </div>
                                        <div class="codeview__line__indicator added">
                                            +
                                        </div>
                                        <div class="codeview__line__content">
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>&lt;
                                            <span class="pl-c1">Icon</span>
                                            <span class="pl-e"> name</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-pse">{"{"}</span>
                                            <span class="pl-smi">props</span>.
                                            <span class="pl-smi">icon</span>
                                            <span class="pl-pse">{"}"}</span>
                                            <span class="pl-e"> size</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-pse">{"{"}</span>
                                            <span class="pl-c1">24</span>
                                            <span class="pl-pse">
                                                {"}"}
                                            </span>{" "}
                                            /&gt;
                                        </div>
                                    </div>
                                    <div class="codeview__line unchanged">
                                        <div class="codeview__line__number">
                                            53
                                        </div>
                                        <div class="codeview__line__number">
                                            53
                                        </div>
                                        <div class="codeview__line__indicator unchanged"></div>
                                        <div class="codeview__line__content">
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-k">&lt;/</span>
                                            <span class="pl-smi">div</span>
                                            <span class="pl-k">&gt;</span>
                                        </div>
                                    </div>
                                    <div class="codeview__line unchanged">
                                        <div class="codeview__line__number">
                                            54
                                        </div>
                                        <div class="codeview__line__number">
                                            54
                                        </div>
                                        <div class="codeview__line__indicator unchanged"></div>
                                        <div class="codeview__line__content">
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>&lt;
                                            <span class="pl-ent">div</span>
                                            <span class="pl-e"> class</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-s">
                                                <span class="pl-pds">"</span>
                                                notification__text
                                                <span class="pl-pds">"</span>
                                            </span>
                                            &gt;
                                        </div>
                                    </div>
                                    <div class="codeview__line unchanged">
                                        <div class="codeview__line__number">
                                            55
                                        </div>
                                        <div class="codeview__line__number">
                                            55
                                        </div>
                                        <div class="codeview__line__indicator unchanged"></div>
                                        <div class="codeview__line__content">
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>
                                            <span class="pl-tab"></span>&lt;
                                            <span class="pl-ent">div</span>
                                            <span class="pl-e"> class</span>
                                            <span class="pl-k">=</span>
                                            <span class="pl-s">
                                                <span class="pl-pds">"</span>
                                                notification__text__header
                                                <span class="pl-pds">"</span>
                                            </span>
                                            &gt;
                                            <span class="pl-pse">{"{"}</span>
                                            <span class="pl-smi">props</span>.
                                            <span class="pl-c1">title</span>
                                            <span class="pl-pse">{"}"}</span>
                                            &lt;/<span class="pl-ent">div</span>
                                            &gt;
                                        </div>
                                    </div>
                                    <div class="codeview__line message">
                                        <div class="codeview__line__number">
                                            <span class="icon">
                                                <svg
                                                    version="1.1"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    class="octicon octicon-fold-down"
                                                    aria-hidden="true"
                                                >
                                                    <path d="m8.177 14.323 2.896-2.896a.25.25 0 0 0-.177-.427H8.75V7.764a.75.75 0 1 0-1.5 0V11H5.104a.25.25 0 0 0-.177.427l2.896 2.896a.25.25 0 0 0 .354 0ZM2.25 5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 4.25a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5a.75.75 0 0 1 .75.75ZM8.25 5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 4.25a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5a.75.75 0 0 1 .75.75Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="codeview__line__content"></div>
                                    </div>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
