import path, { resolve } from "path";
import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import checker from 'vite-plugin-checker';

export default mergeConfig(
    defineViteConfig({
        base: "./",
        root: "src",
        plugins: [
            react(),
            checker({typescript: {root: "./"}})
        ],
        publicDir: resolve(__dirname, "public"),
        css: {

        },
        build: {
            outDir: resolve(__dirname, "dist"),
            emptyOutDir: true,
            copyPublicDir: true,
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].js`,
                    chunkFileNames: `assets/[name].js`,
                    assetFileNames: `assets/[name].[ext]`,
                }
            }
        },
        resolve: {
            alias: {
                "@app": path.resolve(__dirname, "./src"),
                "dictionary": path.resolve(__dirname, "./src/dictionary-jsons"),
                "app-types": path.resolve(__dirname, "./src/types/app-types"),
                "components": path.resolve(__dirname, "./src/components"),
                "resources": path.resolve(__dirname, "../resources"),
                "util": path.resolve(__dirname, "./src/util")
            }
        }
    }),
    defineVitestConfig({
        test: {
            globals: true,
            environment: "jsdom",
            include: ['./**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            setupFiles: ['./vitest-setup.ts'],
        }
    })
)