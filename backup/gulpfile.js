var gulp = require('gulp-param')(require('gulp'), process.argv),
    plugins = require('gulp-load-plugins')(),
    merge = require('merge-stream');

gulp.task('serve', function(live, build, open) {
    var server = plugins.liveServer.static('.', 8080);
    server.start();

    if (live) {
        gulp.watch(['*.{js,css,html}', 'js/**/*.{js,css,html,txt,json}', 'css/**/*.{js,css,html}', '!apps/**/bower_components', '!apps/**/bower_components/**'], function() {
            server.notify.apply(server, arguments);
        });
    }

    if (open) {
        gulp.src(__filename)
            .pipe(plugins.open({uri: 'http://localhost:8080/index.html'}));
    }
});

gulp.task('img', function(force) {
    var pngquant = require('imagemin-pngquant');
    return gulp.src(['*.{jpg,png,gif}', 'images/**/*.{jpg,png,gif}'], { base: './' })
        .pipe(plugins.if(!force, plugins.changed('build')))
        .pipe(plugins.imagemin({
            progressive: true,
            optimizationLevel: 6,
            use: [pngquant({ quality: '50-75' })]
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('copy', function(force) {
    return gulp.src(['*.html', '*.md', 'fonts/*'], { base: './' })
        .pipe(plugins.if(!force, plugins.changed('build')))
        .pipe(gulp.dest('build'))
});

gulp.task('js', function(force) {
    return gulp.src(['*.js', '!gulpfile.js'], { base: './' })
        .pipe(plugins.if(!force, plugins.changed('build')))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('css', function(force) {
    return gulp.src(['*.css'], { base: './' })
        .pipe(plugins.if(!force, plugins.changed('build')))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.csso())
        .pipe(gulp.dest('build'));
});

gulp.task('critical', function() {
    plugins.critical.generateInline({
        inline: true,
        base: './',
        src: 'index.html',
        dest: 'index-critical.html',
        width: 1300,
        height: 900
    });
});

gulp.task('html', function(force) {
    return gulp.src(['*.html'], { base: './' })
        .pipe(plugins.if(!force, plugins.changed('build')))
        .pipe(plugins.inlineCss({ applyLinkTags: false, removeLinkTags: false }))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['copy', 'html', 'js', 'css', 'img']);
