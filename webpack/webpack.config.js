const webpackMerge = require('webpack-merge');

const webpackConfig = ({ mode }) => {
  const commonConfig = require('./webpack.common.js')();
  const configEnv = mode === 'production' ? 'prod' : 'dev';
  const envConfig = require(`./webpack.config-${configEnv}.js`)();
  return webpackMerge({ mode }, commonConfig, envConfig);
};

module.exports = webpackConfig;
