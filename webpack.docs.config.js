const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const loaders = [
  {
    test:    /\.jsx?$/,
    loader:  'babel',
    include: [__dirname + '/docs', __dirname + '/src/bertie/knwl/units.js']
  },
  {
    test:    /\.css$/,
    loader:  ExtractTextPlugin.extract('css?-url&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
    include: __dirname + '/docs'
  }
];

module.exports = {
  name:    'docs',
  entry:   './docs/src/entry.jsx',
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', '.jsx', '.css']
  },
  module:  { loaders: loaders },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  output: {
      path:     __dirname + '/docs',
      filename: 'bundle.js',
  },
};
