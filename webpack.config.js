var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './client/index.js'
  ],  
  output: {
    path: './dist',
    filename: 'bundle.js',
    crossOriginLoading: 'use-credentials',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot','babel'],
        exclude: [/node_modules/]
      },
    ]
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};
