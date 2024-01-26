import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const node_modules = path.resolve(__dirname, "node_modules");

console.log(fs.readdirSync("node_modules/typescript/lib"));

if (!fs.existsSync(node_modules)) {
    fs.mkdirSync(node_modules);
}

if (!fs.existsSync(path.resolve(node_modules, "@types"))) {
    fs.mkdirSync(path.resolve(node_modules, "@types"));
}

if (!fs.existsSync(path.resolve(node_modules, "@types/relagit"))) {
    fs.mkdirSync(path.resolve(node_modules, "@types/relagit"));
}

if (!fs.existsSync(path.resolve(node_modules, "@types/relagit", "index.d.ts"))) {
    fs.writeFileSync(path.resolve(node_modules, "@types/relagit", "index.d.ts"), fs.readFileSync(path.resolve(__dirname, "global.d.ts")));
}

if (!fs.existsSync(path.resolve(node_modules, "@types/relagit", "package.json"))) {
    fs.writeFileSync(
        path.resolve(node_modules, "@types/relagit", "package.json"),

        JSON.stringify({
            name: "@types/relagit",
            version: "1.0.0",
            types: "index.d.ts",
        })
    );
}
