import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";
import { execSync } from "child_process";

export default [
  {
    input: "src/index.ts", // Point d'entrée de ton code TS
    output: [
      {
        file: "dist/bundle.cjs.js", // Output pour CommonJS
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/bundle.esm.js", // Output pour ESM
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(), // Pour supporter la résolution des modules node_modules
      commonjs(), // Pour supporter les modules CommonJS
      typescript(), // Compilation TypeScript
      terser(), // Minification du code
      del({
        targets: [
          "dist/**/*",
          "!dist/bundle.cjs.js",
          "!dist/bundle.cjs.js.map",
          "!dist/bundle.esm.js",
          "!dist/bundle.esm.js.map",
          "!dist/index.d.ts",
        ],
        runOnce: true,
        hook: "buildEnd",
        force: true,
        verbose: true,
      }),
    ],
    external: ["dayjs"],
  },
];
