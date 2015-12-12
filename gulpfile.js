// dev - launches lazy loaded dev server @localhost:8000
// webpack - bundles all files into dist @ index.js
// copy - copies all build related dependencies into proper dist folders
// build - webpack + copy, dist file should be ready to serve
// watch - builds on change


var gulp = require('gulp');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var serverConfig = require('./webpack.dev.server.config');

gulp.task('dev', function() {
  var server = new webpackDevServer(webpack(webpackConfig), serverConfig);
  server.listen(8000, 'localhost', function(err) {
    console.log(err || 'server listening on localhost:8000');
  });
});

gulp.task('webpack', function() {
  webpack(webpackConfig, function(err) {
    console.log(err || 'Success: dist updated');
  });
});

gulp.task('copy', function() {
  gulp.src('./client/index.html')
    .pipe(gulp.dest('./dist'));
  gulp.src('./client/styles/styles.css')
    .pipe(gulp.dest('./dist/styles'));
  gulp.src('./client/assets/*.*')
    .pipe(gulp.dest('./dist/assets'))
});

gulp.task('build', ['webpack', 'copy']);

gulp.task('watch', function(){
  gulp.watch([
    './client/*.*',
    '.client/**/*.js',
    '.client/**/*.jsx',
    '.client/**/*.css'
    ], ['webpack','copy']);
});


