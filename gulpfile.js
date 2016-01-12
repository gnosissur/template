var gulp = require('gulp-param')(require('gulp'), process.argv),
    plugins = require('gulp-load-plugins')(),
    merge = require('merge-stream'),
    sequence = require('run-sequence'),
    bower = require('main-bower-files'),
    ignore = '!{node_modules,bower_components,build}/**',
    ignoreIncludeBower = '!{node_modules,build}/**';

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
    return gulp.src(['*.{jpg,png,gif}', '**/*.{jpg,png,gif}', ignore], { base: './' })
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
        .pipe(plugins.htmlReplace({
            'js': '/js/site.min.js'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('js', function(force) {
    var files = bower().concat(['js/site.js', 'js/plugins.js', '!gulpfile.js', ignoreIncludeBower]);
    return gulp.src(files, { base: './' })
        .pipe(plugins.print())
        .pipe(plugins.if(!force, plugins.changed('build')))
        .pipe(plugins.concat('js/site.min.js'))
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

gulp.task('crtical', function() {
    var critical = require('critical').stream;
    return gulp.src(['build/*.html', 'build/**/*.html'], { base: './build' })
        /*.pipe(plugins.if(!force, plugins.changed('build')))*/
        .pipe(plugins.inlineSource())
        .pipe(critical({
            base: './build',
            inline: true,
            css: ['build/site.css'],
            minify: true,
            width: 300,
            height: 300,
            ignore: [/url\(/,'@font-face',/print/,'mobile.css']
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', function() {
    sequence(['copy', 'js', 'css', 'html', 'img'], 'crtical');
});
