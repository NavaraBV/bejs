import { FileSystemTree } from '@webcontainer/api';

export const files: FileSystemTree = {
    'package.json': {
        file: {
            contents: `
{
  "name": "example-app",
  "type": "module",
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
  },
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "dev": "vite --mode ssr"
  }
}`,
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
        <link rel="manifest" href="/manifest.json" />
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
                    contents: ``,
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
                            contents: `import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
    const counter = useSignal(0);
    return (
        <>
            <div>
                <h1>This is a qwik application inside a qwik application</h1>
            </div>
            <div>
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
