import fs from "node:fs";
import path from "node:path";

export default function authPlugin() {
    return {
        name: "authPlugin",
        apply: "build",

        closeBundle() {
            if (process.env.WORKER_URL) {
                console.log("[authPlugin] WORKER_URL is set. Keeping dist/auth");
                return;
            }
            
            const authDir = path.resolve("dist/auth");

            fs.rmSync(authDir, {
                recursive: true,
                force: true,
            });

            console.log("[authPlugin] Removed dist/auth");
        },
    };
}