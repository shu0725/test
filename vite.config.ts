import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

import { glob } from 'glob';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import * as path from 'path';
// const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        components: path.resolve(__dirname, 'lib/components/index.ts'),
        utils: path.resolve(__dirname, 'lib/utils/index.ts'),
        langs: path.resolve(__dirname, 'lib/langs/index.ts'),
      },
      formats: ['es'],
      fileName: (format, name) => {
        return format === 'cjs' ? `${name}.cjs` : `${name}.js`;
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@mui/material/styles', // Externalize MUI theme-related packages
        '@mui/system',
        '@mui/styles',
        '@emotion/styled',
        'react-i18next',
      ],
      // input: glob.sync('lib/**/*.{ts,tsx}', { ignore: 'lib/**/*.stories.tsx' }),

      // input: Object.fromEntries(
      //   // https://rollupjs.org/configuration-options/#input
      //   glob.sync('lib/**/*.{ts,tsx}').map((file) => [
      //     // 1. The name of the entry point
      //     // lib/nested/foo.js becomes nested/foo
      //     relative('lib', file.slice(0, file.length - extname(file).length)),
      //     // 2. The absolute path to the entry file
      //     // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
      //     fileURLToPath(new URL(file, import.meta.url)),
      //   ]),
      // ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@hocs': path.resolve(__dirname, 'src/hocs'),
      '@i18n': path.resolve(__dirname, 'src/i18n'),
      '@themes': path.resolve(__dirname, 'src/themes'),
      '@type': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@config': path.resolve(__dirname, './config'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
});
