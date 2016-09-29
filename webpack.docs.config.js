const webpack = require('webpack');

const loaders = [ { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' } ];

module.exports = {
  name:    'docs',
  entry:   './docs/src/entry.jsx',
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', '.jsx']
  },
  module:  { loaders: loaders },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  output: {
      path:     __dirname + '/docs',
      filename: 'bundle.js',
  },
};
