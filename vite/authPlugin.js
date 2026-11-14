import fs from "node:fs";
import path from "node:path";

export default function authPlugin() {
    return {
        name: "authPlugin",
        apply: "build",

        closeBundle() {
            const authDir = path.resolve("dist/auth");

            fs.rmSync(authDir, {
                recursive: true,
                force: true,
            });

            console.log("[authPlugin] Removed dist/auth");
        },
    };
}