var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './client/index.js'
  ],  
  output: {
    path: './dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot','babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'SOCKET_URL': JSON.stringify('http://127.0.0.1'),
        'DB_URL': JSON.stringify('http://127.0.0.1:2391')
      }
    })
  ]
};