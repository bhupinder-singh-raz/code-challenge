const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: "./server.ts",
  devtool: "source-map",
  externals: [nodeExternals()],
  mode: "production",
  module: {
    rules: [
      {},
      {
        test: /\.ts$/,
        use: "ts-loader",
        // exclude: /node_modules/,
      },
    ],
  },
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: [".json", ".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    filename: "bundle.js",
  },
  stats: {
    colors: true,
  },
  target: "node",
};
