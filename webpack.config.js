const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin =  require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageJSON = require("./package.json");
const VENDOR_LIBS = Object.keys(packageJSON.dependencies);

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    bundle: "./src/index.js",
    // vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve("./build"),
    filename: "[name].[hash].js",
    publicPath: "/",
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader']}) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'sass-loader']}) },
      { test: /\.(png|jpe?g|gif|svg|ico)$/, use: [{ loader: 'url-loader?limit=40000'},'image-webpack-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /pixi\.js/, use: 'expose-loader?PIXI' },
      { test: /phaser-split\.js$/, use: 'expose-loader?Phaser' },
      { test: /p2\.js/, use: 'expose-loader?p2' },
    ],
  },
  resolve: {
      alias: {
          'phaser': phaser,
          'pixi.js': pixi,
          'p2': p2,
      }
  },
	plugins: [
    new CleanWebpackPlugin(['build']),
    new ExtractTextPlugin('[name]-[hash].css'),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
		}),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
		new HtmlWebpackPlugin({ template: 'public/index.html' }),
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
}
