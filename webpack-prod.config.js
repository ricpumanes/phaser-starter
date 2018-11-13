const devConfig = require("./webpack.config.js");
const webpack = require("webpack");

delete devConfig.devtool;

devConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    })
);

devConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify('production'),
    },
  })
);

module.exports = devConfig;
