var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var cleanCSS = require('gulp-clean-css');

gulp.task('salam', async function() {
    console.log("HELLO")
});



gulp.task('connectJS', function() {
    return gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(concat("all.min.js"))
        // Minifies only if it's a JavaScript file
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task("concectCSS", async() => {
    gulp.src('app/**/*.css')
        .pipe(cleanCSS({
            inline: ['none']
        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }))
})



gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/**/*.css', gulp.parallel('concectCSS'));
    gulp.watch('aapp/**/*.js', gulp.parallel('connectJS'));
});

gulp.task('default', gulp.parallel('sass', 'browserSync', 'concectCSS', 'connectJS', 'watch'));