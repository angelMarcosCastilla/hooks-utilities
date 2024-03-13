import { defineConfig } from 'tsup'

export default defineConfig({
  format:["cjs", "esm"],
  entry: ['src/hooks'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  shims: true,
})