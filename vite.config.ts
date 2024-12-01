import path, { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from 'vite-plugin-checker';

export default defineConfig({
    base: "./",
    root: "src",
    plugins: [
        react(),
        checker({typescript: {root: "./"}})
    ],
    publicDir: resolve(__dirname, "public"),
    build: {
        outDir: resolve(__dirname, "dist"),
        emptyOutDir: true,
        copyPublicDir: true,
        rollupOptions: {
            input: {
                "": resolve(__dirname, "src/index.html"),
            },
            output: {
                entryFileNames: "assets/bundle.js"
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
})