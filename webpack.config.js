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
  }
};
