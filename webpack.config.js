const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const slsw = require("serverless-webpack");

module.exports = {
  target: "node",
  name: "server",
  entry: ["./src/serverless.ts"],
  devtool: "inline-source-map",
  mode: "none",
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?100"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [path.resolve(__dirname, "node_modules")]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@src": path.resolve(__dirname, "src/")
    }
  },
  plugins: [],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "serverless.js",
    library: "serverless",
    libraryTarget: "commonjs2" // supports "module.exports"
  }
};
