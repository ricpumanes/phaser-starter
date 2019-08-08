module.exports = () => {

  return {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './public',
      historyApiFallback: true,
      host: '0.0.0.0'
    },
  };
  
};