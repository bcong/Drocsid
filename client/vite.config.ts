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
        port: 5100
    },
    resolve: {
        alias: {
            "@Assets": path.resolve(__dirname, "src/Assets"),
            "@Types": path.resolve(__dirname, "src/@types"),
            "@Views": path.resolve(__dirname, "src/Views"),
            "@Templates": path.resolve(__dirname, "src/Templates"),
            "@Utils": path.resolve(__dirname, "src/Utils"),
            "@Components": path.resolve(__dirname, "src/Components"),
            "@Stores": path.resolve(__dirname, "src/Stores"),
        },
    },
});
