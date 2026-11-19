import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import prettier from "prettier";

import { createServer } from "vite";

const vite = await createServer({
    server: {
        middlewareMode: true
    },
    appType: "custom"
});

const { Pages } = await vite.ssrLoadModule("/src/pages.tsx");

export type PageDefinition = {
    PageName: string;
    PageTitle: string;
    PageElement: React.ComponentType;
    PageMainPath: string;
    PageAliasPaths: string[];
    PageMetaTags: React.ReactElement[];
}

const DIST_DIR = path.posix.resolve("./");
const HTML_DIR = path.posix.join(DIST_DIR, "html");

function getOutputFile(page: PageDefinition): string {
    if (page.PageName === "404") {
        return path.posix.join(HTML_DIR, "404.html");
    }

    if (page.PageMainPath === "/") {
        return path.posix.join(HTML_DIR, "index.html");
    }

    const cleanPath = page.PageMainPath.replace(/^\/+|\/+$/g, "");

    return path.posix.join(HTML_DIR, cleanPath, "index.html");
}

async function getPageHtml(page: PageDefinition): Promise<string> {
    const metaTags = renderToStaticMarkup(
        <>
            <title>{page.PageTitle}</title>
            {page.PageMetaTags}
        </>
    ).replace(/></g, ">\n<");

    return await prettier.format(`<!DOCTYPE html>
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

async function generatePage(page: (typeof Pages)[number]): Promise<void> {
    const outputFile = getOutputFile(page);

    await fs.mkdir(path.posix.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, await getPageHtml(page), "utf8");

    console.log(`Generated: ${path.posix.relative(process.cwd(), outputFile)}`);
}

function getSitemapXml(): string {
    const urls = Pages
        .filter((page: PageDefinition) => page.PageMainPath !== "*")
        .map((page: PageDefinition) => {
            const url = new URL(page.PageMainPath, "https://CobbFan9.github.io");

            return `    <url>
        <loc>${url.href}</loc>
    </url>`;
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function getViteConfigTs(): string {
    const rollupOptions = Pages
        .map((page: PageDefinition) => {
            const absoluteHtmlPath = page.PageMainPath === "*"
                ? path.posix.join(HTML_DIR, "404.html")
                : page.PageMainPath === "/"
                    ? path.posix.join(HTML_DIR, "index.html")
                    : path.posix.join(
                        HTML_DIR,
                        `${page.PageMainPath.replace(/^\/+|\/+$/g, "")}/index.html`
                    );

            const htmlPath = path.posix.relative(DIST_DIR, absoluteHtmlPath);

            return `                ${JSON.stringify(page.PageName)}: ${JSON.stringify(htmlPath)}`;
        })
        .join(",\n");

    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//@ts-ignore
import moveHtmlPlugin from "./vite/moveHtmlPlugin.js";
//@ts-ignore
import devHtmlPlugin from "./vite/devHtmlPlugin.js";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        moveHtmlPlugin(),
        devHtmlPlugin()
    ],
    build: {
        rollupOptions: {
            input: {
${rollupOptions}
            }
        }
    }
})
`;
}

async function main(): Promise<void> {
    console.log("Deleting html dir...");

    await fs.rm(HTML_DIR, { recursive: true, force: true });

    console.log("Deleted html dir...");
    console.log("Generating page index.html files...");

    try {
        for (const page of Pages) {
            await generatePage(page);
        }

        console.log("Done.");
    } finally {
        await vite.close();
    }

    console.log("Done generating index.html...");
    console.log("Generating sitemap...");

    const sitemapFile = path.posix.join(DIST_DIR, "public", "sitemap.xml");

    await fs.writeFile(
        sitemapFile,
        getSitemapXml(),
        "utf8"
    );

    console.log("Done generating sitemap...")
    console.log("Generating vite.config.ts...")

    const viteConfigFile = path.posix.join(DIST_DIR, "vite.config.ts");

    await fs.writeFile(
        viteConfigFile,
        getViteConfigTs(),
        "utf8"
    );

    console.log("Done generating vite.config.ts...");

    console.log("Done generating!");
}

main().catch((error) => {
    console.error("Failed to generate pages:");
    console.error(error);
    process.exit(1);
});
