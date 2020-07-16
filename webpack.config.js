const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const slsw = require("serverless-webpack");

module.exports = {
  target: "node",
  name: "server",
  entry: ["./src/serverless.ts"],
  // entry: { serverless: "./serverless.yml" },
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
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_USERNAME: process.env.DATABASE_USERNAME,
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      DATABASE_DATABASE: process.env.DATABASE_DATABASE,
      JWT_SECRET: process.env.JWT_SECRET
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "serverless.js",
    library: "serverless",
    libraryTarget: "commonjs2" // supports "module.exports"
  }
};
