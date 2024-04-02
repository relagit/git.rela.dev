import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!import.meta.env.SUPABASE_URL) {
    throw new Error("Missing SUPABASE_URL");
}

const client = postgres(import.meta.env.SUPABASE_URL);
const db = drizzle(client);

export default defineConfig({
    providers: [
        GitHub({
            authorization: {
                url: "https://github.com/login/oauth/authorize",
                params: { scope: "read:user user:email read:org" },
            },
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
            async profile(profile, tokens) {
                const org = await fetch(
                    `https://api.github.com/orgs/relagit/memberships/${profile.login}`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokens.access_token}`,
                        },
                    },
                ).then(async (res) => await res.json());

                return {
                    id: profile.id.toString(),
                    name: profile.name ?? profile.login,
                    image: profile.avatar_url,
                    email: org.role ?? "user",
                };
            },
        }),
    ],
});
