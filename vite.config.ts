import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    outDir: 'dist',
    minify: true,
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 5000, //chunk 大小警告的限制
    lib: {
      entry: {
        components: './lib/components/index.ts',
        utils: './lib/utils/index.ts',
        langs: './lib/langs/index.ts',
      },
      formats: ['es'],
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
        '**/*.stories.*', // Exclude all story files
        '**/.storybook/**', // Exclude Storybook configuration folder
      ],
      output: {
        assetFileNames: 'assets/[name][extname]',
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
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
});
