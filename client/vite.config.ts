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
        chunkSizeWarningLimit: 1500
    },
    server: {
        port: 3100
    },
    resolve: {
        alias: {
            "@Assets": path.resolve(__dirname, "src/Assets"),
            "@Stores": path.resolve(__dirname, "src/Stores"),
        },
    },
});
