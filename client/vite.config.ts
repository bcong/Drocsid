import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            tsDecorators: true,
        }),
        splitVendorChunkPlugin(),
    ],
    build: {
        chunkSizeWarningLimit: 1500,
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            "@Assets": path.resolve(__dirname, "src/Assets"),
            "@Stores": path.resolve(__dirname, "src/Stores"),
        },
    },
});
