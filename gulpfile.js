var gulp = require("gulp");
var exec = require('gulp-exec');
var tsd = require('gulp-tsd');
var tsc = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var Server = require('karma').Server;

var paths = {
  tsSrc: 'src/koext-*.ts',
  tsTests: 'src/tests-*.ts',
  dist: 'dist',
  tests: 'tests'
};

var testsDependencies = [
    'src/test-main.js',
    'bower_components/knockout/dist/knockout.js',
    'libs/*.js'
];

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

gulp.task('build:src', function() {
    gulp
    .src(paths.tsSrc)
    .pipe(tsc({
        module: 'umd'
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(gulp.dest(paths.tests))
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build:tests', function() {
    gulp
    .src(paths.tsTests)
    .pipe(tsc({
        module: 'umd'
    }))
    .pipe(gulp.dest(paths.tests));
    
    gulp
    .src(testsDependencies)
    .pipe(gulp.dest(paths.tests));
});

gulp.task('build', ['build:src', 'build:tests']);

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
})

gulp.task('clean', function(cb) {
    del('dist/*', cb);
    del('tests/*.js', cb);
});

gulp.task('rebuild', ['clean', 'build']);

gulp.task('watch', ['npm:watch', 'bower:watch']);

gulp.task('default', ['build', 'test']);