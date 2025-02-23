const path = require("path");
const BUILD_PATH = path.resolve(__dirname, "build");
const SRC_PATH = path.resolve(__dirname, "src");
const APP_PATH = path.resolve(SRC_PATH, "index.jsx");
const COMPONENTS_PATH = path.resolve(SRC_PATH, "components");
const CONTEXTS_PATH = path.resolve(SRC_PATH, "contexts");
const API_PATH = path.resolve(SRC_PATH, "api");
const ENV = path.resolve(__dirname, ".env");
const PORT = 3001;

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:7]",
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: {
      components: COMPONENTS_PATH,
      contexts: CONTEXTS_PATH,
      api: API_PATH,
    },
  },
  plugins: [
    new Dotenv({ path: ENV }),
    new HtmlWebpackPlugin({
      title: "Casino App",
      template: "public/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
  devServer: {
    port: PORT,
    // this is where dev server will find static files for loading (path has to be global)
    static: { directory: BUILD_PATH },
    historyApiFallback: true,
  },
};

