const devConfig = require('./webpack.config');
const webpack = require('webpack');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

devConfig.plugins = plugins;

module.exports = devConfig;
