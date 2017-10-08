// Include gulp
var gulp = require('gulp');
 // Define base folders
var src = 'src/';
var dest = 'build/';
 // Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var webserver = require('gulp-webserver');

var notify = require('gulp-notify');

gulp.task('serve', function () {
    gulp.src('public').pipe(webserver({
        port: 3333,
        livereload: true
    })).pipe(notify("Running webserver!"));
});

gulp.task('watch', ['serve'], function () {
    //gulp.start(['scripts', 'move']);
    gulp.watch(['js/**/*.js'], ['scripts']);
    gulp.watch(['views/**/*.html'], ['move']);
});