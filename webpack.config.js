var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './client/index.js'
  ],  
  output: {
    path: './dist',
    filename: 'bundle.js'
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};
