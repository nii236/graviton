var webpack = require('webpack');
var path = require('path');
var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [path.resolve(ROOT_PATH, 'client', 'src', 'entry')],
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.css',
      '.png',
      '.svg',
      '.gif',
      '.jpg',
      '.jpeg'
    ],
    root: [ path.resolve(__dirname) ]
  },
  output: {
    path: path.resolve(ROOT_PATH, 'client', 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/build/'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
    new HtmlwebpackPlugin({
      title: 'Graviton App',
      template: 'client/src/utils/HTMLWebpackTemplate.html',
      inject: 'body'
    })
  ]
}
