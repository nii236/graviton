var webpack = require('webpack');
var path = require('path');
var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [path.resolve(ROOT_PATH, 'client/src/entry.js')],
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
    root: [ path.resolve(__dirname) ]
  },

  output: {
    path: path.resolve(ROOT_PATH, 'client', 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/build/'
  },

  devServer: {
    contentBase: './client/build',
    publicPath: 'http://localhost:8080/build/'
  },

  target: 'atom',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Graviton App',
      template: 'client/src/utils/HTMLWebpackTemplate.html',
      inject: 'body'
    })
  ],

  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },

  devtool: 'eval-source-map'
}
