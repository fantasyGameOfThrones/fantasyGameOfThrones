module.exports = {
  entry: './client/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: './client'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ]
  }
};
