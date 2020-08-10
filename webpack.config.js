const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const slsw = require("serverless-webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const StartServerPlugin = require("start-server-webpack-plugin");

const isServerlessBuild = slsw.lib.serverless !== undefined;

const webpackEntry = isServerlessBuild
  ? "./src/serverless.ts"
  : ["./src/main.ts", "webpack/hot/poll?100"];
if (isServerlessBuild) {
  console.log("[webpack] : stage from serverless", slsw.lib.options.stage);
}

const webpackPlugins = isServerlessBuild
  ? [new CompressionPlugin()]
  : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new StartServerPlugin({ name: "serverless.js" })
    ];

module.exports = {
  target: "node",
  name: "server",
  entry: webpackEntry,
  devtool: "inline-source-map",
  mode: "none",
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"]
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
  plugins: webpackPlugins,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "serverless.js",
    library: "serverless",
    libraryTarget: "commonjs2" // supports "module.exports"
  }
};
