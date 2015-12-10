var config = require('./webpack.config');
module.exports = {
  publicPath: config.output.publicPath,
  hot: true,
  stats:{
    colors: true
  }
};