const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const slsw = require("serverless-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

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
    new BundleAnalyzerPlugin(),
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
    path: path.resolve(__dirname, "dist"),
    filename: "serverless.js",
    library: "serverless",
    libraryTarget: "commonjs2" // supports "module.exports"
  }
};
