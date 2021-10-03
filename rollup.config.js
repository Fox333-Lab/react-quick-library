//import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
//import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import json from "@rollup/plugin-json";

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "bin/index.js",
        format: "cjs",
        banner: "#!/usr/bin/env node\n",
      },
      // {
      //   file: "dist/index.es.js",
      //   format: "es",
      //   exports: "named",
      // },
    ],
    plugins: [
      resolve(),
      terser(),
      json({
        compact: true,
      }),
      cleaner({
        targets: ["./bin/"],
      }),
    ],
  },
];
