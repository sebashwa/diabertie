const sharedConfig = require('./webpack.config');
const webpack = require('webpack');

const backendCfg = sharedConfig[0];
const frontendCfg = sharedConfig[1];

const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

backendCfg.plugins.concat(plugins);
frontendCfg.plugins.concat(plugins);

module.exports = [backendCfg, frontendCfg];
