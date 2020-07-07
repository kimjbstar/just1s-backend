const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");
const glob = require("glob");

module.exports = {
  target: "node",
  name: "server",
  entry: ["./src/main.ts", "./src/serverless.ts"],
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
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanAfterEveryBuildPatterns: ["dist"]
    // }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      TYPEORM_HOST: process.env.TYPEORM_HOST,
      TYPEORM_PORT: process.env.TYPEORM_PORT,
      TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
      TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
      TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
      EXPRESS_PORT: process.env.EXPRESS_PORT
    })
  ],
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist")
  }
};
