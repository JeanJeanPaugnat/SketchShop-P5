import { defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    base: '/SketchShop-P5/',
    server: {
        host: true,
        https: true
    }
});