const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin =  require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {

  return {
    entry: {
      bundle: "./src/index.js",
    },
    output: {
      path: path.resolve("./build"),
      filename: "[name].[hash].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              },
            },
          ],
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true // enable sourcemapping in dev only for debugging
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true, // enable sourcemapping in dev only debugging
              }
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          use: [
            'url-loader?limit=10000',
            {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            }
          ]
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: 'file-loader'
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?prefix=font/&limit=5000'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Phaser Starter',
        filename: 'index.html',
        template: path.resolve(__dirname, '../public/index.html'),
        showErrors: true,
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'public/assets/**/*'),
          to: path.resolve(__dirname, 'build'),
        },
        {
          from: path.resolve(__dirname, './server.js'),
          to: path.resolve(__dirname, 'build'),
        }
      ]),
    ],
    resolve: {
      alias: {
        "Assets": 'public/assets/'
      },
    },
  };

};