const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "Production",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/icons", to: "icons" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
