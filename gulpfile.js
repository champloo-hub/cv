const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-html-minifier');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Compile CSS from SASS
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }))
})

// CSS minify
gulp.task('css-minify', function () {
  return gulp.src('src/css/*.css')
    .pipe(gcmq())
    .pipe(cssnano())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
})

// HTML minify
gulp.task('html-minify', function () {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
})

// Copy content files to dist
gulp.task('cnt', function () {
  return gulp.src(['src/img/**/*', 'src/docs/**/*', 'src/fonts/**/*', 'src/js/**/*'], {
    base: './src'
  })
    .pipe(gulp.dest('dist'))
})

// Browser sync init
gulp.task('server-dev', function () {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    directory: true,
    port: 4000
  });
})

// Browser reload
gulp.task('reload', function (done) {
  browserSync.reload();
  done();
})

// Run live server
gulp.task('server-prod', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    directory: true,
    port: 4000
  });
})

// Watch and reload
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.{html,js}', gulp.series('reload'));
})

// Development
gulp.task('develop', gulp.parallel('server-dev', 'watch'));

// Build
gulp.task('build', gulp.series('sass', 'css-minify', 'html-minify', 'cnt'));

// Test
gulp.task('test', gulp.series('server-prod'));