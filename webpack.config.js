// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import prodCfg from './webpack.prod.config.js';
//
// export default function(app) {
//   const config = Object.assign(prodCfg, {
//     devtool: 'inline-source-map',
//     entry:   [
//       'webpack-hot-middleware/client',
//       './client'
//     ],
//     plugins: [
//       new webpack.optimize.OccurenceOrderPlugin(),
//       new webpack.HotModuleReplacementPlugin(),
//       new webpack.NoErrorsPlugin()
//     ],
//   });
//
//   const compiler = webpack(config);
//
//   app.use(webpackDevMiddleware(compiler, { noInfo: true }));
//   app.use(webpackHotMiddleware(compiler));
// }

const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


const loaders = [
  { test: /\.svg$/, exclude: /node_modules/, loader: 'babel!svg-react' },
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.json$/, loader: 'json' }
];

module.exports = [
  {
    name:    'backend',
    entry:   ['babel-polyfill', './backend/index.jsx'],
    resolve: {
      modulesDirectories: ['node_modules', 'backend', 'frontend'],
      extensions:         ['', '.js', '.jsx', '.svg']
    },
    target:    'node',
    externals: nodeModules,
    module:    { loaders: loaders },
    output:    {
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
    target: 'web',
    module: { loaders: loaders },
    output: {
        path:     __dirname + '/dist',
        filename: 'frontend.js',
    },
  }
];
