var gulp = require('gulp-param')(require('gulp'), process.argv),
    plugins = require('gulp-load-plugins')(),
    merge = require('merge-stream'),
    ignore = '!{node_modules,bower_components,build}/**';

gulp.task('serve', function(live, build, open) {
    var server = plugins.liveServer.static(build ? './build' : '.', 8080);
    if (!live) server.config.livereload = false;
    server.start();

    if (live) {
        gulp.watch(['*.{js,css,html}', '**/*.{js,css,html,txt,json}', ignore], function() {
            server.notify.apply(server, arguments);
        });
    }

    if (open) {
        gulp.src(__filename)
            .pipe(plugins.open({
                uri: 'http://localhost:8080/index.html'
            }));
    }

    try {
        var os = require( 'os' );
        var networkInterfaces = os.networkInterfaces();
        console.log('local ip: ' + networkInterfaces['wlan0'][0].address);
    } catch(e) {}
});

gulp.task('img', function(force) {
    var pngquant = require('imagemin-pngquant');
    var imageminJpegRecompress = require('imagemin-jpeg-recompress');
    return gulp.src(['*.{jpg,png,gif}', 'images/**/*.{jpg,png,gif}'], { base: './' })
        .pipe(plugins.if(!force, plugins.changed('build')))
        .pipe(plugins.imagemin({
            progressive: true,
            optimizationLevel: 5,
            use: [pngquant({quality: '50-75'}), imageminJpegRecompress({loops: 3, quality: 'medium'})]
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('copy', function(force) {
    return gulp.src(['*.md', 'fonts/*', ignore], { base: './' })
        /*.pipe(plugins.if(!force, plugins.changed('build')))*/
        .pipe(gulp.dest('build'))
});

gulp.task('html', function(force) {
    return gulp.src(['*.html', '**/*.html', ignore], { base: './' })
        /*.pipe(plugins.if(!force, plugins.changed('build')))*/
        .pipe(gulp.dest('build'));
});

gulp.task('js', function(force) {
    return gulp.src(['*.js', '!gulpfile.js'], { base: './' })
        .pipe(plugins.if(!force, plugins.changed('build')))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('css', function(force) {
    return gulp.src(['*.css', '**/*.css', ignore], { base: './' })
        /*.pipe(plugins.if(!force, plugins.changed('build')))*/
        .pipe(plugins.autoprefixer())
        .pipe(plugins.csso())
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['copy', 'js', 'css', 'html', 'img'], function(lean) {
    if (!lean) {
        var critical = require('critical').stream;
        return gulp.src(['build/*.html', 'build/**/*.html'], { base: './build' })
            /*.pipe(plugins.if(!force, plugins.changed('build')))*/
            .pipe(plugins.inlineSource())
            .pipe(critical({
                base: './build',
                inline: true,
                css: ['build/site.css'],
                minify: true,
                width: 900,
                height: 400,
                ignore: [/url\(/,'@font-face',/print/,'mobile.css']
            }))
            .pipe(gulp.dest('./build'));
    }
});
