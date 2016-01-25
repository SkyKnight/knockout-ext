var gulp = require("gulp");
var exec = require('gulp-exec');
var tsd = require('gulp-tsd');
var tsc = require('gulp-tsc');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('npm:install', function(cb) {
    gulp
    .src('package.json')
    .pipe(exec('npm install', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    }));
});

gulp.task('npm:watch', function(cb) { 
    gulp.watch('./package.json', ['npm:install']);
});

gulp.task('bower:install', function(cb) {
    gulp
    .src('bower.json')
    .pipe(exec('bower install', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    }));
});

gulp.task('bower:watch', function(cb) {
   gulp.watch('./bower.json', ['bower:install']); 
});

gulp.task('tsd', function () {
    gulp.src('./gulp_tsd.json').pipe(tsd());
});

gulp.task('build', function() {
    gulp
    .src('src/*.ts')
    .pipe(tsc())
    .pipe(concat('knockout-ext.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('knockout-ext.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    del('dist/*', cb);
});

gulp.task('rebuild', ['clean', 'build']);

gulp.task('watch', ['npm:watch', 'bower:watch']);

gulp.task('default', ['build']);