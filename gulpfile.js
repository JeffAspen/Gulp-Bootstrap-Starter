var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var reload      = browserSync.reload;

// Paths
var src = {
    scss: 'app/scss/*.scss',
    css:  'app/css',
    html: 'app/*.html'
};

// SASS Options
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Compile SASS into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
    		.pipe(sourcemaps.init())
    		.pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sass())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
