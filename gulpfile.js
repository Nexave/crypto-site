var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp = require('vinyl-ftp'),
    sftp = require('gulp-sftp');
    include = require('gulp-file-include');
notify = require("gulp-notify");

// Скрипты проекта

gulp.task('common-js', function() {
    return gulp.src([
            'app/js/common.js',
            
        ])
        .pipe(concat('common.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

// gulp.task('include', () => {
//     return gulp.src(['src/**/*.html', '!app/blocks/**/*.html'])
//         .pipe(include_file({
//             prefix: "@@",
//             basepath: "@file"
//         }))
//         .pipe(gulp.dest('./app'));
// });
gulp.task('include', function() {
    gulp.src(['app/pages/*.html'])
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./app'));
});
gulp.task('js', ['common-js'], function() {
    return gulp.src([
            'app/libs/scroll-lock/dist/scroll-lock.min.js',
            'app/libs/swiper/swiper-bundle.min.js',
            'app/libs/fancybox/fancybox.umd.js',
            'app/libs/jquery-nice-select/js/jquery.nice-select.min.js',
            
        ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('watch', ['include', 'scss', 'js', 'browser-sync'], function() {
    gulp.watch('app/scss/**/*.scss', ['scss']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/pages/*.html', ['include',browserSync.reload]);
    gulp.watch('app/blocks/*.html', ['include' ,browserSync.reload]);

});


gulp.task('imagemin', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('build', ['removedist', 'imagemin', 'include', 'scss', 'js'], function() {

    var buildFiles = gulp.src([
        'app/*.html',
        'app/.htaccess',
    ]).pipe(gulp.dest('dist'));

    var buildCss = gulp.src([
        'app/css/main.min.css',
    ]).pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
        'app/js/scripts.min.js',
        'app/js/common.min.js',
        'app/libs/jquery/dist/jquery.min.js',
    ]).pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src([
        'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

    var conn = ftp.create({
        host: '49.12.197.50',
        user: 'centum_dehtyar',
        password: 'Y<1ELU[JNJp]',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'dist/**',
        'dist/.htaccess',
    ];
    return gulp.src(globs, { buffer: false })
        .pipe(conn.dest('/frontstuff.centum-test.site/apirone-front'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function() { return cache.clearAll(); });

gulp.task('default', ['watch']);
