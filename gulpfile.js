var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');

var paths = {
  dest: 'public/',
  images: 'node_modules/mojular-govuk-elements/images/*'
};

gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js')).run(function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      modules: false,
      chunkModules: false
    }));
    callback();
  });
});

gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.dest + 'images/'));
});

gulp.task('build', ['images', 'scripts']);
gulp.task('default', ['build']);
