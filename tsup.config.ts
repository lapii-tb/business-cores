import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'auth/index': 'src/auth/index.ts',
    'state/index': 'src/state/index.ts',
    'composables/index': 'src/composables/index.ts',
    'interfaces/index': 'src/interfaces/index.ts',
    'utils/index': 'src/utils/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'vue'],
  esbuildOptions(options) {
    options.banner = {
      js: '/**\n * @wl/cores\n * Core business logic for shared implementation\n * @license MIT\n */',
    };
  },
});