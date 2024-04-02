import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

if (!import.meta.env.SUPABASE_URL) {
    throw new Error("Missing SUPABASE_URL");
}

export const waitlist = pgTable("waitlist", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    createdAt: timestamp("created_at").default(sql`now()`),
    email: text("email").unique(),
});
