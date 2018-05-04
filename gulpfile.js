var gulp         = require('gulp');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var cleanCSS     = require('gulp-clean-css');
var minify       = require('gulp-minify');
var gulpSequence = require('gulp-sequence');
var bs           = require('browser-sync').create();
var pug          = require('gulp-pug');

gulp.task('default', ['css', 'js', 'pug'], function() {
  // place code for your default task here
});

gulp.task('serve', ['default', 'css:watch', 'js:watch', 'pug:watch'],function(){
    bs.init({
        server: {
            baseDir: 'src/html',
            directory: true
        },
    });
    gulp.watch(['./src/style.css', './src/script.js', './src/**/*.html']).on('change', bs.reload);
});

gulp.task('scss', function() {
    return gulp.src('./src/scss/**/*.scss')
           .pipe(sass().on('error', sass.logError))
           .pipe(gulp.dest('./src/css'));
});
gulp.task('concat:css', function() {
    return gulp.src(['./src/css/helpers/**/*.css', './src/css/blocks/**/*.css'])
           .pipe(concat('style.css'))
           .pipe(gulp.dest('./src/'));
});
gulp.task('minify:css', function() {
    return gulp.src('./src/style.css')
           .pipe(cleanCSS())
           .pipe(gulp.dest('./dist/'))
});

gulp.task('concat:js', function() {
    return gulp.src('./src/js/**/*.js')
           .pipe(concat('script.js'))
           .pipe(gulp.dest('./src/'));
});
gulp.task('minify:js', function() {
    return gulp.src('./src/script.js')
           .pipe(minify())
           .pipe(gulp.dest('./dist/'))
});

gulp.task('pug', function(){
    return gulp.src('./src/pug/**/*.pug')
           .pipe(pug())
           .pipe(gulp.dest('./src/html'))
           .pipe(gulp.dest('./dist/html'))
});
gulp.task('pug:watch', function(){
    gulp.watch('./src/pug/**/*.pug', ['pug']);
});

gulp.task('css', gulpSequence('scss', 'concat:css', 'minify:css'));
gulp.task('css:watch', function(){
    gulp.watch('./src/scss/**/*.scss', ['scss']);
    gulp.watch('./src/css/**/*.css', ['concat:css']);
});
gulp.task('js', gulpSequence('concat:js', 'minify:js'));
gulp.task('js:watch', function(){
    gulp.watch('./src/js/**/*.js', ['concat:js']);
});
