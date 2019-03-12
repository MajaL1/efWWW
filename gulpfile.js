// Include gulp
var gulp = require('gulp');
 // Define base folders
var src = 'src/';
var dest = 'build/';
var flatten = require('gulp-flatten'); 

 // Include plugins

var minifyCss = require('gulp-minify-css'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

var proxy = require('http-proxy-middleware');

var debug = require("gulp-debug");

var gulpif = require('gulp-if');

var webserver = require('gulp-webserver');

var ngAnnotate = require('gulp-ng-annotate');

//var notify = require('gulp-notify');

//gulp.watch(['dist/**']).on('change', livereload.changed);
var browserSync = require('browser-sync');
var del = require("del");

var inject = require('gulp-inject');

var injectPartials = require('gulp-inject-partials');

var print = require('gulp-print');

var htmlmin = require('gulp-htmlmin');

var gutil = require('gulp-util');

var historyApiFallback = require('connect-history-api-fallback');

var template = require('gulp-template-compile');

const p = require('path');

var  ngTemplates = require('gulp-ng-templates');

const imagemin = require('gulp-imagemin');

var changed = require('gulp-changed');

/*gulp.task('serve', function() {
    browserSync.init(null,{
       server: "app.js",
      // startPath: "public/index.html", // After it browser running
        browser: 'chrome',
        host: 'localhost',
        port: 3000,
        open: true,
        //tunnel: true,
        reloadDelay: 100
    });
});*/

var connect = require('gulp-clean');

gulp.task('clean', function() {
  return del("public/dist");
});

gulp.task('server', function() {
  browserSync({
    server: {
     baseDir: './public/dist' 
    }
  });
})

gulp.task('start-server',  ['move', 'build-html', 'sass', 'scripts', 'fonts', 'assets'], function () {
    
    var proxyRest = proxy('/api/get-music-data', {target: 'http://localhost:5001'});
    
    gulp.src('public/dist/').pipe(webserver({
        port: 5000,
        livereload: true,
        directoryListing: false,
        //open: false,
        //open: 'http://localhost:3000/public/dist/',
       //  fallback: 'public/dist/index.html',
        
       proxies: [
                  {
                   source: '/api', target: 'http://localhost:5000/api/'
                  }
        ],
        middleware: [ historyApiFallback()],//, proxyRest ],
        defaultFile: 'public/dist/index.html'
    }));//.pipe(notify("Running webserver!"));
});

gulp.task('heroku:production', ['start-server']);

gulp.task('scripts', function () {
    gulp.src(['public/scripts/angular.js', 'public/scripts/angular-route.js','public/main.js', 'public/js/controllers/*.js'])
        .pipe(concat('all.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('public/dist/'));
       // .pipe(notify("JavaScript compiled!"));
});
// Fonts
gulp.task('fonts', function() {
  return gulp.src('public/fonts/*.{eot,svg,ttf,woff,woff2}', function (err) {})
      .pipe(gulp.dest('public/dist/fonts'));
});
gulp.task('build-html', ['move', 'sass', 'scripts', 'fonts', 'assets'], function() {
    
    // We src all files under build
   gulp.src('public/dist/index.html')
       .pipe(inject(gulp.src('public/dist/all.js'), {
                        addRootSlash: false,  // ensures proper relative paths
                        ignorePath: 'public/dist' // ensures proper relative paths
                    }))
        .pipe(inject(gulp.src(['public/dist/views/header.html']), {
         starttag: '<!-- inject:public/views/common/header.html -->',
         transform: function(filepath, file) {
           return file.contents.toString();
         }
      }))
    .pipe(inject(gulp.src(['public/dist/views/footer.html']), {
         starttag: '<!-- inject:public/views/common/footer.html -->',
         transform: function(filepath, file) {
           return file.contents.toString();
         }
      }))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('image-minify', function(){
    gulp.src('public/assets/img/*.+(png|jpg|gif)')
        //.pipe(changed('public/dist/assets/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('public/dist/assets/img/'))
});


 
gulp.task('assets', function () {
     gulp.src(['public/assets/img/*.*'])
        .pipe(gulp.dest('public/dist/assets/img'));
    
     gulp.src(['public/assets/music/*.*'])
        .pipe(gulp.dest('public/dist/assets/music'));
    
     gulp.src(['public/img/*.*'])
        .pipe(gulp.dest('public/dist/img'));
});

var angularTemplateCache = require('gulp-angular-templatecache');

/****************************************************/
// tole je potrebno pogledat, kako bi dali vse html v js. (in pri tem obdrzali routing)
gulp.task('html-conc', function () {
    gulp.src(['/public/dist/index.html', '/public/views/*.html', '/public/main.js'])
       // .pipe(template()) // converts html to JS
    /*.pipe(angularTemplateCache('public/dist/all.js', {
            module: 'myApp',
            root: '/'
        }))*/
        .pipe(templateCache('/public/dist/all.js', {
        root: updateRoot(['/public/dist/index.html', '/public/views/*.html'])
    },
    { module:'templateCache', standalone:true })
    )
        .pipe(ngAnnotate())
            .pipe(uglify({
                mangle:false
            }))
        //.pipe(concat('all.js'))
        .pipe(gulp.dest('/public/dist'))
});

function updateRoot(paths) {
    for (var i = 0; i < paths.length; i++) {
        // console.log(paths);
        console.log(paths[i]);
        return paths[i];
    }
}


//var templateCache = require('gulp-templatecache');
var templateCache = require('gulp-angular-templatecache');

gulp.task('bla', function () {
    
  return gulp.src('/public/views/*.html')
    .pipe(debug())
        .pipe(templateCache({
            filename: 'templates.js',
            module: 'myApp',
        }))
        .pipe(debug())
        .pipe(gulp.dest('/public/dist'));
    
});

gulp.task('bla1', function() {
    
var paths = {
  javascripts: [
   'public/main.js',
    /*
     * this file should not be commited to git, you write HTML!
     * it should also not beeing watched by gulp if it then triggers a change
     * or gulp will be left in an infinite loop (see below)
     */
    'public/js/controllers/*.js',
    'public/scripts/*.js' 
  ],
  templates: [
    '/public/views/*.html',
    '/public/index.html'
  ]
}    
  return gulp.src(paths.templates)
   pipe(htmlmin({
        empty: true,
        spare: true,
        quotes: true
    }))
   .pipe(debug())
   .pipe(templateCache({
      module: 'templates',
      standalone: true,
       root:'/'
      /**
       * Here, I'm removing .html so that `$templateCache` holds
       * the template in `views/home` instead of `views/home.html`.
       * I'm keeping the directory structure for the template's name
       */
      //transformUrl: function(url) {
        //return url.replace(p.extname(url), '')
     //}
    }))
    .pipe(debug())
    //put all those to our javascript file
    .pipe(concat('all.js'))
     .pipe(debug())
    .pipe(gulp.dest('public/dist'))
})

gulp.task('bla2', function() {
    
  var paths = {
  javascripts: [
   'public/main.js',
    /*
     * this file should not be commited to git, you write HTML!
     * it should also not beeing watched by gulp if it then triggers a change
     * or gulp will be left in an infinite loop (see below)
     */
    'public/js/controllers/*.js',
    'public/scripts/*.js' 
  ],
  templates: [
    'public/views/*.html',
    'public/index.html'
  ]
}        
    
  return gulp.src(paths.templates)
  .pipe(gulpif(/\.html$/, htmlmin({ collapseWhitespace: true })))
  .pipe(gulpif(/\.html$/, ngTemplates()))
  .pipe(concat('index.html'))
  .pipe(gulp.dest('public/dist'));
})

gulp.task('move', function () {
    gulp.src(['public/index.html'])
        .pipe(gulp.dest('public/dist'));

    gulp.src(['./public/views/*.html', './public/views/common/*.html'])
        .pipe(flatten())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
         }))
        .pipe(gulp.dest('public/dist/views'));
       // .pipe(notify("Moved HTML files!"));
});

gulp.task('watch', ['serve'], function () {
    gulp.start(['clean', 'scripts', 'move']);
    gulp.watch(['public/js/**/*.js'], ['scripts']);
    gulp.watch(['public/views/**/*.html'], ['move']);
});

var gulp = require('gulp');
var sass = require('gulp-sass');

//sass
gulp.task('sass', function () {
    gulp.src(['public/css/*.css', 'public/css/**/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(minifyCss())
        .pipe(csso())
        .pipe(gulp.dest('public/dist/css/'));
});

// Default task
gulp.task('default', function () {
    gulp.start('sass');
});

// task
gulp.task('minify-js', function () {
    gulp.src('./public/js/controllers/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});
