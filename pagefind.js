import path from "path";
import fs from "fs";

import frontmatter from "front-matter";
import * as pagefind from "pagefind";

const { index } = await pagefind.createIndex();

const recurse = async (dir) => {
    const files = await fs.promises.readdir(dir);

    for (const file of files) {
        if (file.startsWith(".")) continue;

        const stat = await fs.promises.stat(path.join(dir, file));

        if (stat.isDirectory()) {
            await recurse(path.join(dir, file));
            continue;
        }

        const content = frontmatter(
            fs.readFileSync(path.join(dir, file), "utf8"),
        );

        const { errors } = await index.addCustomRecord({
            url: path
                .join(dir, file)
                .replace("src/content/docs/", "/docs/")
                .replace(".mdx", "")
                .replace(".md", ""),
            meta: {
                title: content.attributes.title,
                description: content.attributes.description,
                published: content.attributes.date,
            },
            content: content.body
                .replace(/#|`/g, "")
                .replace(/[<>]/g, " ")
                .replace(/\[(.+?)\]\(.+?\)/g, "$1")
                .replace(/\/\/ \[!.+?\]/g, ""), // Remove mdx syntax
            language: "en",
        });

        if (errors.length) {
            console.error(errors);
        }
    }
};

await recurse("src/content/docs");

const { errors: writeErrors } = await index.writeFiles({
    outputPath: ".vercel/output/static/pagefind",
});

console.log(writeErrors.length ? writeErrors : "Index written to disk");

if (
    process.env.npm_lifecycle_event === "dev" ||
    process.argv.includes("--dev")
) {
    const { errors } = await index.writeFiles({
        outputPath: "public/pagefind",
    });

    console.log(errors.length ? errors : "Dev index written to disk");
}
