// referenties leggen naar de tools (die geïnstalleerd zijn)
let gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    csslint = require("gulp-csslint"),
    jshint = require("gulp-jshint"),
    jsStylish = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    notify = require("gulp-notify"),
    concat = require("gulp-concat");

const PATHS = {
    HTML : {
        SRC : './src/*.html',
        DIST : './dist/'
    },

    JS : {
        SRC : './src/js/**/*.js',
        DIST : './dist/js/'
    },

    CSS: {
        SRC : './src/css/**/*.css',
        DIST : './dist/css/'
    }
};

gulp.task("default", function (){
    let htmlWatcher = gulp.watch(PATHS.HTML.SRC, ['copy-html']);

    gulp.watch(PATHS.JS.SRC, ['js']);
    gulp.watch(PATHS.CSS.SRC, ['css']);
});

gulp.task("js", function(){
    gulp.src(PATHS.JS.SRC)
        .pipe(concat("app.js"))
        .pipe(gulp.dest(PATHS.JS.DIST))
});

gulp.task("css", function(){
    gulp.src(PATHS.CSS.SRC)
        .pipe(concat("app.css"))
        .pipe(gulp.dest(PATHS.CSS.DIST))
});


gulp.task("copy-html", function(){
        gulp.src(PATHS.HTML.SRC)
            .pipe(gulp.dest(PATHS.HTML.DIST));
});
