import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { qwikNxVite } from 'qwik-nx/plugins';
import {qwikReact} from '@builder.io/qwik-react/vite';

export default defineConfig({
    cacheDir: '../../node_modules/.vite/apps/moviefinder',
    plugins: [
        qwikNxVite(),
        qwikCity(),
        qwikReact(),
        qwikVite({
            client: {
                outDir: '../../dist/apps/moviefinder/client',
            },
            ssr: {
                outDir: '../../dist/apps/moviefinder/server',
            },
        }),
        tsconfigPaths({ root: '../../' }),
    ],
    server: {
        headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Resource-Policy': 'same-site',
        },
        fs: {
            // Allow serving files from the project root
            allow: ['../../'],
        },
    },
    preview: {
        headers: {
            'Cache-Control': 'public, max-age=600',
        },
    },
    test: {
        globals: true,
        cache: {
            dir: '../../node_modules/.vitest',
        },
        environment: 'node',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
});
