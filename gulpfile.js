var gulp = require('gulp');
var sass = require('gulp-sass');
var minScss = require('gulp-clean-css');
var server = require('gulp-webserver');

gulp.task('devScss', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(minScss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    gulp.src('./src/sass/*.scss', gulp.series('devScss'))
})

gulp.task('server', function() {
    gulp.src('./src')
        .pipe(server({
            port: 9090,
            proxies: [{
                source: '/users',
                target: 'http://localhost:3000/users'
            }]
        }))
})

gulp.task('default', gulp.series('server', 'watch'))