import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//@ts-ignore
import moveHtmlPlugin from "./vite/moveHtmlPlugin.js";
//@ts-ignore
import devHtmlPlugin from "./vite/devHtmlPlugin.js";
//@ts-ignore
import devGenPlugin from "./vite/devGenPlugin.js";
//@ts-ignore
import commitHashPlugin from "./vite/commitHashPlugin.ts";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        moveHtmlPlugin(),
        devHtmlPlugin(),
        devGenPlugin(),
        commitHashPlugin(),
    ],
    build: {
        rollupOptions: {
            input: {
                "Home": "html/index.html",
                "About": "html/about/index.html",
                "SWGoH Updates": "html/swgoh-updates/index.html",
                "SWGoH Portrait Maker": "html/swgoh-portrait-maker/index.html",
                "SWGoH Loc Bundle Formatter": "html/loc-bundle-format/index.html",
                "Terms": "html/terms/index.html",
                "Asset Extractor Web": "html/asset-extractor-web/index.html",
                "Update Frequency": "html/update-frequency/index.html",
                "SWGoH Calculators": "html/calc/index.html",
                "SWGoH Crystal Calculator": "html/calc/crystal/index.html",
                "SWGoH Shard Calculator": "html/calc/shard/index.html",
                "AI Use Policy": "html/ai-use-policy/index.html",
                "404": "html/404.html"
            }
        }
    }
})
