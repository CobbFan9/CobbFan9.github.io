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

            return {
                define: {
                    __COMMIT_HASH__: JSON.stringify(hash),
                    __APP_ENV__: JSON.stringify(
                        process.env.APP_ENV ?? 'alpha'
                    ),
                },
            }
        },
    }
}