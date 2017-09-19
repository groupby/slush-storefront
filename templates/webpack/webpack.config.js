const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const path = require('path');

const indexHtml = path.resolve(__dirname, 'index.html');

module.exports = {
  entry: './src',

  devtool: 'source-map',

  output: {
    path: path.resolve('bundle')
  },

  plugins: [
    new HTMLPlugin({ template: indexHtml }),
    new ExtractTextPlugin('styles.css'),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 6400,
        proxy: 'http://localhost:6500/'
      },
      { reload: false })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader'
    }, {
      test: /\.tag\.html$/,
      loader: 'file-loader'
    }, {
      test: indexHtml,
      loader: 'html-loader',
      options: { interpolate: true }
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          'css-loader',
          'sass-loader'
        ],
        fallback: 'style-loader'
      })
    }]
  },

  devServer: {
    port: 6500,
    overlay: true,
    historyApiFallback: true
  }
};
