// @ts-check

"use strict";

import manifest from "./manifest.json" with {type: "json"};
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const safeName = manifest.name.replace(/\s/g, "_");

export default [
  {
    entry: "./src/content-script.ts",
    devtool: false,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
            },
          },
        },
      ],
    },
    name: safeName,
    output: {
      filename: "dist/content-script.js",
      path: __dirname,
    },
    resolve: {
      extensions: [".ts", ".js"],
      extensionAlias: {
        ".js": [".js", ".ts"],
      },
    },
    mode: "development",
  },
];
