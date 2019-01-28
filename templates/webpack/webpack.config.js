const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const path = require('path');

const indexHtml = path.resolve(__dirname, 'index.html');

module.exports = {
  entry: './src',

  devtool: 'source-map',

  output: {
    filename: 'storefront-[hash].js',
    path: path.resolve('bundle')
  },

  plugins: [
    new HTMLPlugin({ template: indexHtml }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
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
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  devServer: {
    port: 6500,
    overlay: true,
    historyApiFallback: true
  }
};
