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

const cssLoaderParams = [
  'modules',
  'importLoaders=1',
  'localIdentName=[path][name]_[local]',
];

const loaders = [
  { test: /\.svg$/, exclude: /node_modules/, loader: 'babel!svg-react' },
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.json$/, loader: 'json' },
  { test: /\.css$/, loader: `isomorphic-style!css?${cssLoaderParams.join('&')}!postcss` }
];

module.exports = [
  {
    name:    'backend',
    entry:   ['babel-polyfill', './backend/index.jsx'],
    resolve: {
      modulesDirectories: ['node_modules', 'backend', 'frontend'],
      extensions:         ['', '.js', '.jsx', '.svg']
    },
    target:  'node',
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
    ],
    externals: nodeModules,
    module:    { loaders: loaders },
    postcss() {
      return [
        require('autoprefixer'),
      ];
    },
    output: {
        path:     __dirname + '/dist',
        filename: 'backend.js',
    },
  },
  {
    name:    'frontend',
    entry:   ['babel-polyfill', './frontend/index.jsx'],
    resolve: {
      modulesDirectories: ['node_modules', 'frontend'],
      extensions:         ['', '.js', '.jsx', '.svg']
    },
    target:  'web',
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
    ],
    module: { loaders: loaders },
    postcss() {
      return [
        require('autoprefixer'),
      ];
    },
    output: {
        path:     __dirname + '/dist',
        filename: 'frontend.js',
    },
  }
];
