import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/components/dateTimePicker/index.scss";`, // Uncomment this line if you have global SCSS variables to include in every file
      },
    },
  },
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    outDir: 'dist',
    sourcemap: true,
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
        entryFileNames: '[name].js',
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
