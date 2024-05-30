import { Transition } from "solid-transition-group";
import { Show, createSignal } from "solid-js";

import "./at.scss";

interface GithubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string | null;
    hireable: boolean | null;
    bio: string;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

const getUser = async (name: string): Promise<GithubUser> => {
    const res = await fetch(`https://api.github.com/users/${name}`);

    return await res.json();
};

type AtProps = {
    name: string;
};

export default (props: AtProps) => {
    const [user, setUser] = createSignal<GithubUser | null>();
    const [hover, setHover] = createSignal(false);

    getUser(props.name)
        .then((data) => setUser(data))
        .catch(() => setUser(null));

    return (
        <a
            href={`https://github.com/${props.name}`}
            class="at"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            @{props.name}
            <Transition
                onEnter={(el, done) =>
                    (el.animate(
                        [
                            {
                                opacity: 0,
                                translate: "-20px calc(-100% - 2em)",
                            },
                            { opacity: 1, translate: "0 calc(-100% - 2em)" },
                        ],
                        { duration: 200, easing: "ease-in-out" },
                    ).onfinish = done)
                }
                onExit={(el, done) =>
                    (el.animate(
                        [
                            { opacity: 1, translate: "0 calc(-100% - 2em)" },
                            { opacity: 0, translate: "20px calc(-100% - 2em)" },
                        ],
                        { duration: 200, easing: "ease-in-out" },
                    ).onfinish = done)
                }
            >
                <Show when={user() && hover()}>
                    <div class="at-hover">
                        <img src={user()!.avatar_url} alt={user()!.name} />
                        <div class="at-hover__info">
                            <div class="at-hover__info__name">
                                {user()!.name || user()!.login}
                            </div>
                            <div class="at-hover__info__bio">{user()!.bio}</div>
                        </div>
                    </div>
                </Show>
            </Transition>
        </a>
    );
};
