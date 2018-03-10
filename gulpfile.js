'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create(); 
const reload = browserSync.reload;


gulp.task('serve', ['sass', 'js', 'html'], function() {
    browserSync.init({
        server: {
            baseDir: './dist',
            proxy: "http://localhost:3000"
        }
    });
    
    gulp.watch('./src/*.html').on('change', reload);
});
 

gulp.task('js', () => {
    gulp.src('src/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env']
        }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});


gulp.task('html', () => {
    gulp.src('./src/*.html') 
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

 
gulp.task('sass', () => {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});


gulp.task('watch', () => {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/*.html', ['html']);
});
 
gulp.task('default', ['sass', 'js', 'html', 'watch', 'serve']);