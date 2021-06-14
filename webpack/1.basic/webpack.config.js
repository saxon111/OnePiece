const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    path: resolve(__dirname, "dist"),
    filename: "index.js",
  },
  devServer: {
    contentBase: resolve(__dirname, "public"),
    port: 8080,
    compress: true,
    open: true,
  },
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
  plugins: [new HtmlWebpackPlugin()],
};
