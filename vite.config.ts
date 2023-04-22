import { defineConfig } from 'vite';

import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { child_process } from 'vite-plugin-child-process';

export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
    },
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    target: 'esnext',
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: '@blumjs/cli',
      fileName: '@blumjs/cli',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['child_process', 'fs'],
      plugins: [
        child_process({
          name: 'child_process',
          command: ['node', 'exec'],
          watch: [/src/],
        }),
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: 'dist',
        }),
      ],
    },
  },
});
