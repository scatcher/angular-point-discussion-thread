'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('lodash');

var path = require('path');
var tsd = require('tsd');
var ts = require('gulp-typescript');
var ngAnnotate = require('gulp-ng-annotate');
var tsdJson = 'tsd.json';
var tsdApi = new tsd.getAPI(tsdJson);


var options = {
    src: 'ts',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e',
    errorHandler: function (title) {
        return function (err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    }
};

gulp.task('tsd:install', function () {
    var bower = require('./bower.json');

    var dependencies = [].concat(
        Object.keys(bower.dependencies),
        Object.keys(bower.devDependencies)
    );

    var query = new tsd.Query();
    dependencies.forEach(function (dependency) {
        query.addNamePattern(dependency);
    });

    var options = new tsd.Options();
    options.resolveDependencies = true;
    options.overwriteFiles = true;
    options.saveBundle = true;

    return tsdApi.readConfig()
        .then(function () {
            return tsdApi.select(query, options);
        })
        .then(function (selection) {
            return tsdApi.install(selection, options);
        })
        .then(function (installResult) {
            var written = Object.keys(installResult.written.dict);
            var removed = Object.keys(installResult.removed.dict);
            var skipped = Object.keys(installResult.skipped.dict);

            written.forEach(function (dts) {
                gutil.log('Definition file written: ' + dts);
            });

            removed.forEach(function (dts) {
                gutil.log('Definition file removed: ' + dts);
            });

            skipped.forEach(function (dts) {
                gutil.log('Definition file skipped: ' + dts);
            });
        });
});

gulp.task('tsd:purge', function () {
    return tsdApi.purge(true, true);
});

gulp.task('tsd', ['tsd:install']);

gulp.task('build', function() {
    return gulp.src(options.src + '/**/*.ts')
        .pipe(ts({
            declarationFiles: true
            //noExternalResolve: true
        }))
        .pipe(ngAnnotate({add: true, single_quotes: true}))
        .pipe(gulp.dest(options.dist + '/'));
});
