import { transformWithEsbuild, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Access import.meta.env directly
const appEnv = import.meta.env;

export default defineConfig({
plugins: [
    {
        name: "treat-js-files-as-jsx",
        async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        return transformWithEsbuild(code, id, {
            loader: "jsx",
            jsx: "automatic",
        });
        },
    },
    react(),
    ],
    optimizeDeps: {
    force: true,
    esbuildOptions: {
        loader: {
        ".js": "jsx",
        },
    },
    },
    define: {
    'process.versions': process.versions,
    __APP_ENV__: JSON.stringify(appEnv),
},
});