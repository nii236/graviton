var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TARGET = process.env.TARGET;
var config = {};

config = {
  target: 'atom',
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/utils/template.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'client'),
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    root: [
      path.resolve(__dirname)
    ]
  }
};

if (TARGET === 'prod') {
  config = {
    target: 'atom',
    devtool: 'source-map',
    entry: [
      './client/index'
    ],
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: './'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false },
        sourceMap: false
      }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'client/utils/template.html'
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'client'),
        query: {
          presets: ['react', 'es2015']
        }
      }]
    },
    resolve: {
      root: [
        path.resolve(__dirname)
      ]
    }
  };
}

module.exports = config;
