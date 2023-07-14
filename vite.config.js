import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        lib: {
            entry: resolve('./src/index.js'),
            name: 'super-translator',
            formats: ['es', 'umd', 'cjs']
        },
        minify: true,
        rollupOptions: {
            external: ['https'],
            output: {
                globals: {
                    'https': 'https'
                }
            }
        }
    },
})