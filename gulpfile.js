const gulp = require("gulp")
const sass = require("gulp-sass")
const browserSync = require("browser-sync").create()
const sourcemaps = require('gulp-sourcemaps')
const htmlmin = require('gulp-htmlmin')

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "."
  })

  gulp.watch("scss/**/*.scss", ['sass']).on('error', () => {})
  gulp.watch("*.html").on('error', () => {}).on('change', browserSync.reload)
})

/**
 * Compile with gulp-ruby-sass + source maps
 */
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream({match: '**/*.css'}))
})

gulp.task('copy-resources', function() {
  return gulp.src(['images/**/*', 'css/**/*'], { "base" : "." })
    .pipe(gulp.dest('build'))
})

gulp.task('build', ['sass', 'copy-resources'], function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});