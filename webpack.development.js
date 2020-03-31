/* eslint-disable */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: /\.ts$/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          // eslintPath: path.join(__dirname, '.eslintrc.json'),
          emitError: true,
          failOnError: false,
          emitWarning: true,
          failOnWarning: false,
        },
      }
    ]
  },
  devtool: 'inline-source-map',
  entry: ['webpack/hot/poll?1000', path.join(__dirname, 'src/main.ts')],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  mode: 'development',
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  watch: true
});