import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.spec.ts'],
  outDir: 'build',
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
})
