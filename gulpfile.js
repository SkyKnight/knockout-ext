var gulp = require("gulp");
var exec = require('gulp-exec');
var tsd = require('gulp-tsd');
var tsc = require('gulp-tsc');

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
    return gulp.src('./gulp_tsd.json').pipe(tsd());
});

gulp.task('watch', ['npm:watch', 'bower:watch']);