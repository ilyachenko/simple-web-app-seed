var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var connect = require('gulp-connect');

/*
 Web server to test app
 */
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['.', 'dist']
  });
});
/*
 Automatic Live Reload
 */
gulp.task('livereload', function() {
  gulp.src(['dist/js/*.js', 'dist/*.html'])
    .pipe(watch(['dist/js/*.js', 'dist/*.html']))
    .pipe(connect.reload());
});
/*
 copy all html files and assets
 */
gulp.task('copy', function() {
  gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
  gulp.src('src/assets/**/*.*').pipe(gulp.dest('dist/assets'));
});
/*
 compile less files
 */
gulp.task('less', function() {
  gulp.src('src/styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/styles'))
    .pipe(connect.reload());
});
/*
 browserify
 now is only for Javascript files
 */
gulp.task('browserify', function() {
  browserify('./src/js/main.js').bundle().pipe(source('main.js')).pipe(gulp.dest('dist/js'));
});
/*
 Watch and less
 */
gulp.task('watch', function() {
  gulp.watch('src/styles/*.less', ['less']);
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('src/**/*.html', ['copy']);
});
/*
 default task
 */
gulp.task('default', ['less', 'browserify', 'copy', 'webserver', 'livereload', 'watch']);
