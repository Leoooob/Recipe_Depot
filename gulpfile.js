let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let minify = require('gulp-minify-css');
let browserSync = require('browser-sync').create();

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  browserSync.init({
    server: "./root"
  });
  browserSync.stream();

  gulp.watch('./root/scss/**/*.scss', ['sass']);
  gulp.watch('./root/css/style.css', ['css']);
});

gulp.task('sass', function() {
  return gulp.src('./root/scss/**/*.scss')
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./root/css'));
});

gulp.task('css', function(){
  gulp.src('./root/css/style.css')
    .pipe(concat('style.css'))
    .pipe(minify())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});