import { execSync } from 'node:child_process'
import type { Plugin } from 'vite'

export default function commitHashPlugin(): Plugin {
    return {
        name: 'commit-hash',

        config(_config, { command }) {
            let hash = 'dev'

            if (command === 'build') {
                try {
                    hash = execSync('git rev-parse --short HEAD', {
                        encoding: 'utf8',
                    }).trim()
                } catch {
                    hash = 'unknown'
                }
            }

            let appUrl = process.env.APP_URL;
            if (appUrl === undefined) {
                console.log("Using standard url");
                appUrl = 'https://CobbFan9.github.io';
            } else {
                console.log(`Using custom url: ${appUrl}`);
            }

            return {
                define: {
                    __COMMIT_HASH__: JSON.stringify(hash),
                    __APP_ENV__: JSON.stringify(
                        process.env.APP_ENV ?? 'alpha'
                    ),
                    __APP_URL__: JSON.stringify(appUrl),
                },
            }
        },
    }
}