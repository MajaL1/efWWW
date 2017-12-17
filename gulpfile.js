// Include gulp
var gulp = require('gulp');
 // Define base folders
var src = 'src/';
var dest = 'build/';


 // Include plugins

var minifyCss = require('gulp-minify-css'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var webserver = require('gulp-webserver');

var notify = require('gulp-notify');

gulp.task('serve', function () {
    gulp.src('public').pipe(webserver({
        port: 3000,
        livereload: true
    })).pipe(notify("Running webserver!"));
});

gulp.task('watch', ['serve'], function () {
    //gulp.start(['scripts', 'move']);
    gulp.watch(['js/**/*.js'], ['scripts']);
    gulp.watch(['views/**/*.html'], ['move']);
});

// task
gulp.task('minify-css', function () {
    gulp.src('./public/css/home.css') // path to your file
    .pipe(minifyCss())
    .pipe(gulp.dest('public/dist/css'));
});

// task
gulp.task('minify-js', function () {
    gulp.src('./public/js/controllers/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});