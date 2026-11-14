
import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import prettier from "prettier";

function getOutputFile(page, htmlDir) {
    if (page.PageName === "404") {
        return path.join(htmlDir, "404.html");
    }

    if (page.PageMainPath === "/") {
        return path.join(htmlDir, "index.html");
    }

    const cleanPath = page.PageMainPath.replace(/^\/+|\/+$/g, "");

    return path.join(htmlDir, cleanPath, "index.html");
}

async function getExpectedHtml(page) {
    const metaTags = renderToStaticMarkup(
        React.createElement(
            React.Fragment,
            null,
            React.createElement("title", null, page.PageTitle),
            ...page.PageMetaTags
        )
    ).replace(/></g, ">\n<");

    return prettier.format(`<!DOCTYPE html>
<html lang="en">
<head>
${metaTags}

<script data-goatcounter="https://lego-fan9.goatcounter.com/count"
    data-goatcounter-settings='{"no_onload": true, "allow_local": true}' async src="//gc.zgo.at/count.js"></script>

<script>
    (function () {
        var redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;

        if (redirect && redirect !== location.href) {
            history.replaceState(null, null, redirect);
        }
    })();
</script>
</head>
<body>
    <div id="root"></div>

    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
`, { parser: "html" });
}

export default function devGenPlugin() {
    let server;
    let checking = false;
    let rerun = false;
    let timer;

    async function checkGeneratedHtml() {
        if (!server) return;

        if (checking) {
            rerun = true;
            return;
        }

        checking = true;

        try {
            // Load the latest version after Vite has processed HMR.
            const { Pages } = await server.ssrLoadModule("/src/pages.tsx");

            const htmlDir = path.resolve(server.config.root, "html");

            const outdated = [];
            const missing = [];

            for (const page of Pages) {
                const outputFile = getOutputFile(page, htmlDir);
                const expected = await getExpectedHtml(page);

                let actual;

                try {
                    actual = await fs.readFile(outputFile, "utf8");
                } catch (error) {
                    if (error.code === "ENOENT") {
                        missing.push(page.PageName);
                        continue;
                    }

                    throw error;
                }

                if (actual !== expected) {
                    outdated.push(page.PageName);
                }
            }

            if (missing.length === 0 && outdated.length === 0) {
                console.log("[devHtmlPlugin] Generated HTML is up to date.");
            } else {
                console.warn("\n[devHtmlPlugin] Generated HTML is out of date!");

                if (missing.length) {
                    console.warn("Missing pages:", missing.join(", "));
                }

                if (outdated.length) {
                    console.warn("Outdated pages:", outdated.join(", "));
                }

                console.warn("Run your page generator to update the HTML.\n");
            }
        } catch (error) {
            console.error("[devHtmlPlugin] Failed to check HTML:", error);
        } finally {
            checking = false;

            if (rerun) {
                rerun = false;
                scheduleCheck();
            }
        }
    }

    function scheduleCheck() {
        clearTimeout(timer);

        timer = setTimeout(() => {
            checkGeneratedHtml();
        }, 100);
    }

    return {
        name: "dev-html-check",
        apply: "serve",

        configureServer(viteServer) {
            server = viteServer;

            checkGeneratedHtml();
        },

        handleHotUpdate({ file }) {
            const relativePath = path.relative(
                server.config.root,
                file
            ).replaceAll("\\", "/");

            // Recheck when source files that could affect page
            // definitions or metadata change.
            if (
                relativePath.startsWith("src/") &&
                /\.(ts|tsx|js|jsx)$/.test(relativePath)
            ) {
                scheduleCheck();
            }
        }
    };
}
