const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();


gulp.task('sass', async function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
})

gulp.task('minify-css', async function () {
    return gulp.src('./dist/css/main.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', gulp.series('sass', async function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(('./src/scss/**/*.scss'), gulp.series('sass'));
    gulp.watch('./*.html').on('change', browserSync.reload);
}))
