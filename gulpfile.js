var gulp = require('gulp');
var flatten = require('gulp-flatten');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var proxy = require('http-proxy-middleware');
var debug = require("gulp-debug");
var gulpif = require('gulp-if');
var webserver = require('gulp-webserver');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync');
var del = require("del");
var inject = require('gulp-inject');
var injectPartials = require('gulp-inject-partials');
var print = require('gulp-print');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var historyApiFallback = require('connect-history-api-fallback');
var template = require('gulp-template-compile');
var p = require('path');
var ngTemplates = require('gulp-ng-templates');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var purgecss = require('gulp-purgecss');
var compression = require('compression');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-clean');
var gzip = require('gulp-gzip');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concatcss = require('gulp-concat-css');

var paths = {
    javascripts: [
   'public/main.js',
    'public/js/controllers/*.js',
    'public/scripts/*.js'
  ],
    templates: [
    '/public/views/*.html',
    '/public/index.html'
  ],
    dist: [
        'public/dist'
    ],
    css: ['public/css/*.css',
        'public/css/**/*.scss'],

    music: ['public/assets/music/*.*'],

    img: ['public/assets/img/*'],

    fonts: ['public/fonts/*.{eot,svg,ttf,woff,woff2}'],

    assets: ['public/dist/assets/img']
}

var postcss = require('gulp-postcss');

 var autoprefixer = require('autoprefixer');

 
gulp.task('uncss', function () {
    return gulp.src('./public/css/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('./'+paths.dist));
});

gulp.task('purgecss', () => {
    return gulp
        .src(['public/*.css', 'public'])
        .pipe(
            purgecss({
                content: ['public/*.html']
            })
        )
        .pipe(gulp.dest('public/dist/purgecss'))
})

gulp.task('inject-css', function () {
  var target = gulp.src('./public/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['public/dist/all.css'], {read: false});
 
  return target.pipe(inject(sources, {
            addRootSlash: false, // ensures proper relative paths
            ignorePath: paths.dist}))
    .pipe(gulp.dest('./public/dist'));
});


gulp.task('clean', function () {
    return del(templates.dist);
});

gulp.task('compress', function () {
    gulp.src(paths.dist + '/all.js')
        .pipe(gzip())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('start-server', function () {

    var proxyRest = proxy('/api/get-music-data', {
        target: 'http://localhost:5001'
    });

    gulp.src(paths.dist).pipe(webserver({
        port: process.env.PORT || 5000,
        host: "0.0.0.0",
        livereload: true,
        directoryListing: false,
        //open: false,
        //open: 'http://localhost:3000/public/dist/',
        //  fallback: 'public/dist/index.html',

        proxies: [
            {
                source: '/api',
                target: 'http://localhost:5000/api/'
                  }
        ],
        middleware: [historyApiFallback(), compression() //, //function(res.setHeader("Cache-Control", "public, max-age=2592000"))] //, proxyRest ],
                     ],
        defaultFile: 'public/dist/index.html'
    })); //.pipe(notify("Running webserver!"));
});

gulp.task('heroku:production', ['start-server']);

gulp.task('scripts', function () {
    gulp.src(['public/scripts/angular.js', 'public/scripts/angular-route.js', 'public/main.js', 'public/js/controllers/*.js'])
        .pipe(concat('all.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest(paths.dist + '/'));
    // .pipe(notify("JavaScript compiled!"));
});
// Fonts
gulp.task('fonts', function () {
    return gulp.src(paths.fonts, function (err) {})
        .pipe(gulp.dest(paths.dist+'/fonts'));
});
gulp.task('build', ['move', 'scripts', 'fonts', 'assets', 'sass', 'inject-css'], function () {

    gulp.src('public/dist/index.html')
        .pipe(inject(gulp.src(paths.dist + '/all.js'), {
            addRootSlash: false, // ensures proper relative paths
            ignorePath: paths.dist // ensures proper relative paths
        }))
        .pipe(inject(gulp.src(['public/dist/views/header.html']), {
            starttag: '<!-- inject:public/views/common/header.html -->',
            transform: function (filepath, file) {
                return file.contents.toString();
            }
        }))
        .pipe(inject(gulp.src(['public/dist/views/footer.html']), {
            starttag: '<!-- inject:public/views/common/footer.html -->',
            transform: function (filepath, file) {
                return file.contents.toString();
            }
        }))
        .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('image-minify', function () {
    gulp.src(paths.img + '.+(png|jpg|jpeg|gif)')
        .pipe(changed('public/dist/assets/img'))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist+'/assets/img/'))
});



gulp.task('assets', function () {
    gulp.src(paths.img+'.+(png|jpg|jpeg|gif)')
        .pipe(changed('public/dist/assets/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('public/dist/assets/img/'))


    gulp.src(paths.music)
        .pipe(gulp.dest('public/dist/assets/music'));

    gulp.src(['public/img/*.*'])
        .pipe(gulp.dest('public/dist/img'));
});



/****************************************************/
// tole je potrebno pogledat, kako bi dali vse html v js. (in pri tem obdrzali routing)
gulp.task('html-conc', function () {
    gulp.src(['/public/dist/index.html', '/public/views/*.html', '/public/main.js'])
        // .pipe(template()) // converts html to JS
        /*.pipe(angularTemplateCache('public/dist/all.js', {
                module: 'myApp',
                root: '/'
            }))*/
        .pipe(templateCache(paths.dist + '/all.js', {
            root: updateRoot(['/public/dist/index.html', '/public/views/*.html'])
        }, {
            module: 'templateCache',
            standalone: true
        }))
        .pipe(ngAnnotate())
        .pipe(uglify({
            mangle: false
        }))
        //.pipe(concat('all.js'))
        .pipe(gulp.dest(paths.dist))
});

function updateRoot(paths) {
    for (var i = 0; i < paths.length; i++) {
        // console.log(paths);
        console.log(paths[i]);
        return paths[i];
    }
}

gulp.task('bla', function () {

    return gulp.src('/public/views/*.html')
        .pipe(debug())
        .pipe(templateCache({
            filename: 'templates.js',
            module: 'myApp',
        }))
        .pipe(debug())
        .pipe(gulp.dest(paths.dist));

});

gulp.task('move', function () {
    gulp.src(['public/index.html'])
        .pipe(gulp.dest(paths.dist + '/'));

    gulp.src(['./public/views/*.html', './public/views/common/*.html'])
        .pipe(flatten())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(paths.dist + '/views'));
    // .pipe(notify("Moved HTML files!"));
});

gulp.task('watch', ['serve'], function () {
    gulp.start(['clean', 'scripts', 'move']);
    gulp.watch(['public/js/**/*.js'], ['scripts']);
    gulp.watch(['public/views/**/*.html'], ['move']);
});



//sass
gulp.task('sass', function () {
    gulp.src(paths.css)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss())
        .pipe(minifyCss())
        .pipe(csso())
        .pipe(concatcss('all.css'))
        .pipe(gulp.dest(paths.dist+'/'));
});

// Default task
gulp.task('default', function () {
    gulp.start('sass');
});

// task
gulp.task('minify-js', function () {
    gulp.src('./public/js/controllers/*.js') // path to your files
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/js'));
});
