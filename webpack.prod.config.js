const sharedConfig = require('./webpack.config');
const webpack = require('webpack');

const backendCfg = sharedConfig[0];
const frontendCfg = sharedConfig[1];

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

backendCfg.plugins = plugins;
frontendCfg.plugins = plugins;

module.exports = [backendCfg, frontendCfg];
