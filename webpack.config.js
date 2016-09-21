const fs = require('fs');
const webpack = require('webpack');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const loaders = [
  { test: /\.json$/, loader: 'json' },
  { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
];

module.exports = {
  name:    'backend',
  entry:   ['babel-polyfill', './src/index.js'],
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions:         ['', '.js']
  },
  target:  'node',
  module:  { loaders: loaders },
  plugins: [

    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  externals: nodeModules,
  output:    {
      path:     __dirname + '/dist',
      filename: 'index.js',
  },
};
