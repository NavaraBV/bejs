import { FileSystemTree } from '@webcontainer/api';

export const files: FileSystemTree = {
    'package.json': {
        file: {
            contents: `
{
  "name": "qwik-ception",
  "description": "Qwik inside Qwik",
  "engines": {
    "node": ">=15.0.0"
  },
  "private": true,
  "scripts": {
    "build": "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.types": "tsc --incremental --noEmit",
    "deploy": "echo 'Run \\"npm run qwik add\\" to install a server adapter'",
    "dev": "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    "fmt": "prettier --write .",
    "fmt.check": "prettier --check .",
    "lint": "eslint \\"src/**/*.ts*\\"",
    "preview": "qwik build preview && vite preview --open",
    "start": "vite --open --mode ssr",
    "qwik": "qwik"
  },
  "devDependencies": {
    "@builder.io/qwik": "^1.1.4",
    "@builder.io/qwik-city": "^1.1.4",
    "@types/eslint": "8.37.0",
    "@types/node": "^20.1.4",
    "@typescript-eslint/eslint-plugin": "5.59.5",
    "@typescript-eslint/parser": "5.59.5",
    "eslint": "8.40.0",
    "eslint-plugin-qwik": "^1.1.4",
    "prettier": "2.8.8",
    "typescript": "5.0.4",
    "undici": "5.22.1",
    "vite": "4.3.5",
    "vite-tsconfig-paths": "4.2.0"
  }
}
`,
        },
    },
    'vite.config.ts': {
        file: {
            contents: `
import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
`,
        },
    },
    src: {
        directory: {
            'root.tsx': {
                file: {
                    contents: `
import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';

import './global.css';

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
`,
                },
            },
            'global.css': {
                file: {
                    contents: `
#card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: lightgray;
    border-radius: 10px;
    padding: 10px;
}

.navara-blue {
    color: #3665ff;
}
                    `,
                },
            },
            'entry.ssr.tsx': {
                file: {
                    contents: `
import { renderToStream, type RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: 'en-us',
      ...opts.containerAttributes,
    },
  });
}
`,
                },
            },
            'entry.preview.tsx': {
                file: {
                    contents: `
import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';

export default createQwikCity({ render, qwikCityPlan });
                    `,
                },
            },
            'entry.dev.tsx': {
                file: {
                    contents: `
import { render, type RenderOptions } from '@builder.io/qwik';
import Root from './root';

export default function (opts: RenderOptions) {
  return render(document, <Root />, opts);
}
                    `,
                },
            },
            routes: {
                directory: {
                    'index.tsx': {
                        file: {
                            contents: `
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
    const counter = useSignal(0);
    return (
        <>
            <div id={"card"}>
                <h1 class="">This is a <span class="">Qwik</span> application inside a <span class="">Qwik</span> application</h1>
                <button onClick$={() => counter.value += 1}>increment</button>
                <h3>{counter.value}</h3>
            </div>
        </>
    );
});
`,
                        },
                    },
                },
            },
        },
    },
};
