var gulp = require('gulp');
//var gulp = require('gulp-run-seq'); 
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
   'src/main.js',
    'src/js/controllers/*.js',
    'src/scripts/*.js'
  ],
    templates: [
    '/src/views/*.html',
    '/src/index.html'
  ],
    dist: [
        'src/dist'
    ],
    css: ['src/css/*.css',
        'src/css/**/*.scss'],

    music: ['src/assets/music/*.*'],

    img: ['src/assets/img/*'],

    fonts: ['src/fonts/*.{eot,svg,ttf,woff,woff2}'],

    assets: ['src/dist/assets/img']
}

var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');

const print = require('gulp-print').default;


/*gulp.task('uncss', function () {
    return gulp.src('./src/css/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('./'+paths.dist));
});*/

gulp.task('purgecss', () => {
    return gulp
        .src(['src/*.css', 'public'])
        .pipe(
            purgecss({
                content: ['src/*.html']
            })
        )
        .pipe(gulp.dest('src/dist/purgecss'))
})

gulp.task('move', async function () {
    gulp.src(['src/index.html'])
        .pipe(gulp.dest(paths.dist + '/'));

   return gulp.src(['./src/views/*.html', './src/views/common/*.html'])
        .pipe(flatten())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(paths.dist + '/views'))
        
         
});
//sass
gulp.task('sass', async function () {
   return gulp.src(paths.css)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss())
        .pipe(minifyCss())
        .pipe(csso())
        .pipe(concatcss('all.css'))
        .pipe(gulp.dest(paths.dist))
});


gulp.task('assets', async function () {
    gulp.src(paths.img + '.+(png|jpg|jpeg|gif)')
        .pipe(changed('src/dist/assets/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('src/dist/assets/img'));

    gulp.src(['src/img/*'] + '.+(png|jpg|jpeg|gif)')
        .pipe(gulp.dest('src/dist/img'));
    
    return gulp.src(paths.music)
        .pipe(gulp.dest('src/dist/assets/music'));
   
});


gulp.task('inject-css', function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['src/dist/all.css'], {
        read: true
    });

    return gulp.src('src/dist/index.html')
        .pipe(debug())
        .pipe(inject(sources, {
            addRootSlash: false, // ensures proper relative paths
            ignorePath: paths.dist
        }))
        .pipe(debug())
        .pipe(gulp.dest('src/dist'))
        .pipe(print(function() { return 'Gulp inject-css completed.'; })).pipe(print(function() { return 'Gulp assets completed.'; }));
   
});


gulp.task('clean', function () {
    return del(paths.templates.dist);
});

gulp.task('compress', function () {
    gulp.src(paths.dist + '/all.js')
        .pipe(gzip())
        .pipe(gulp.dest(paths.dist))
        .pipe(print(function() { return 'Gulp compress completed.'; }));
});

gulp.task('start', function () {

    var proxyRest = proxy('/api/get-music-data', {
        target: 'http://localhost:5001'
    });

    gulp.src(paths.dist).pipe(webserver({
        port: process.env.PORT || 5000,
        host: "0.0.0.0",
        livereload: true,
        directoryListing: false,
        //open: false,
        //open: 'http://localhost:3000/src/dist/',
        //  fallback: 'src/dist/index.html',

        proxies: [
            {
                source: '/api',
                target: 'http://localhost:5000/api/'
                  }
        ],
        middleware: [historyApiFallback(), compression() //, //function(res.setHeader("Cache-Control", "public, max-age=2592000"))] //, proxyRest ],
                     ],
        defaultFile: 'src/dist/index.html'
    })); //.pipe(notify("Running webserver!"));
});

gulp.task('heroku:production', gulp.series('start'));

gulp.task('scripts', async function () {
    return gulp.src(['src/scripts/angular.js', 'src/scripts/angular-route.js', 'src/main.js', 'src/js/controllers/*.js'])
        .pipe(concat('all.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest(paths.dist + '/'))
});
// Fonts
gulp.task('fonts', function () {
    return gulp.src(paths.fonts, function (err) {})
        .pipe(gulp.dest(paths.dist + '/fonts'))
        .pipe(print(function() { return 'Gulp fonts completed.'; }));
});

// inject
gulp.task('inject', async function () {
    console.log('inject task...')
  
    return gulp.src('src/dist/index.html')
    .pipe(debug("test"))
     .pipe(inject(gulp.src(['src/dist/all.css']), {
            
            addRootSlash: false, // ensures proper relative paths
            ignorePath: paths.dist,
            allowEmpty: true,
            
        })).pipe(debug())
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe(inject(gulp.src(paths.dist + '/all.js'), {
            addRootSlash: false, // ensures proper relative paths
            ignorePath: paths.dist, // ensures proper relative paths`
            allowEmpty: true
        })) .pipe(gulp.dest(paths.dist + '/'))
        .pipe(inject(gulp.src(['./src/dist/views/header.html']), {
            starttag: '<!-- inject:header:html -->',
            transform: function (filepath, file) {
                return file.contents.toString();
            },
            allowEmpty: true
            
        }))
       .pipe(gulp.dest(paths.dist + '/'))
       .pipe(inject(gulp.src(['./src/dist/views/footer.html']), {
            starttag: '<!-- inject:footer:html -->',
            transform: function (filepath, file) {
                return file.contents.toString();
            },
            allowEmpty: true
        }))
      
        .pipe(gulp.dest(paths.dist + '/'))
       
        .pipe(print(function() { return 'Gulp inject completed.'; }));
       
});

gulp.task('build', gulp.series(['sass'],'move', 'scripts', 'fonts', 'assets', 'inject'), function () {

         
       return (print(function() { return 'Gulp build completed.'; }));
});


gulp.task('image-minify', function () {
    gulp.src(paths.img + '.+(png|jpg|jpeg|gif)')
        .pipe(changed('src/dist/assets/img'))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist + '/assets/img/'))
        .pipe(print(function() { return 'Gulp image-minify completed.'; }));
});

//gulp.task('build1', ['build', 'move', 'scripts', 'sass', 'fonts', 'assets', 'inject-css'], function () {});





/****************************************************/
// tole je potrebno pogledat, kako bi dali vse html v js. (in pri tem obdrzali routing)
gulp.task('html-conc', function () {
    gulp.src(['/src/dist/index.html', '/src/views/*.html', '/src/views/common/*.html', '/src/main.js'])
        // .pipe(template()) // converts html to JS
        /*.pipe(angularTemplateCache('src/dist/all.js', {
                module: 'myApp',
                root: '/'
            }))*/
        .pipe(templateCache(paths.dist + '/all.js', {
            root: updateRoot(['/src/dist/index.html', '/src/views/*.html'])
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


// Default task
gulp.task('default', function () {
    gulp.start('sass');
});

// task
gulp.task('minify-js', function () {
    gulp.src('./src/js/controllers/*.js') // path to your files
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/js'))
        .pipe(print(function() { return 'Gulp minify-js completed.'; }));
});
