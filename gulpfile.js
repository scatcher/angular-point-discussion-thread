'use strict';

/* jshint camelcase:false */
var gulp = require('gulp');
//var $ = require('gulp-load-plugins')();
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files']
});
var fs = require('fs');

var args = require('yargs').argv;
//var browserSync = require('browser-sync');
var karma = require('karma').server;
var merge = require('merge-stream');
var paths = require('./gulp.config.json');

var env = $.util.env;
var log = $.util.log;
var port = process.env.PORT || 7203;
var pkg = require('./package.json');
var _ = require('lodash');

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);

/**
* Create $templateCache from the html templates
* @return {Stream}
*/
gulp.task('templatecache', function () {
    log('Creating an AngularJS $templateCache');

    return gulp
        .src(paths.htmltemplates)
        .pipe($.bytediff.start())
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache('templates.js', {
            module: 'angularPoint',
            standalone: false,
            root: ''
        }))
        .pipe($.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('optimize', ['templatecache'], function () {
    var cssFilter = $.filter('**/*.css');

    gulp.src(['src/**/*.js', '.tmp/templates.js'])
        .pipe($.ngAnnotate({add: true, single_quotes: true}))
        .pipe($.concat('apDiscussionThread.js'))
        //.pipe($.bytediff.start())
        //.pipe($.uglify({mangle: true}))
        //.pipe($.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build))
        .pipe($.size());

    gulp.src(['src/**/*.css'])
        .pipe($.bytediff.start())
        .pipe($.csso())
        .pipe($.bytediff.stop(bytediffFormatter))
        .pipe(cssFilter.restore())
        .pipe(gulp.dest(paths.build))
        .pipe($.size());

});

gulp.task('build', ['optimize', 'bump'], function () {



});


gulp.task('clean', function () {
    var del = require('del');
    return del(['.tmp/', 'dist/']);
});

/**
 * Run specs once and exit
 * To start servers and run midway specs as well:
 *    gulp test --startServers
 * @return {Stream}
 */
gulp.task('test', function (done) {
    startTests(true /*singleRun*/, done);
});

/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 * To start servers and run midway specs as well:
 *    gulp autotest --startServers
 */
gulp.task('autotest', function (done) {
    startTests(false /*singleRun*/, done);
});

gulp.task('connect', function () {
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(require('connect-livereload')({port: 35729}))
        .use(serveStatic('demo'))
        // paths to bower_components should be relative to the current file
        // e.g. in app/index.html you should use ../bower_components
        .use('/bower_components', serveStatic('bower_components'))
        .use('/node_modules', serveStatic('node_modules'))
        .use('/src', serveStatic('src'))
        .use('/.tmp', serveStatic('.tmp'))
        //.use('/xml-cache', serveStatic('xml-cache'))
        .use('/test', serveStatic('test'))
        .use(serveIndex('demo'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('server', ['connect'], function () {
    require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect', 'server', 'templatecache'], function () {
    $.livereload.listen();

    // watch for changes
    gulp.watch([
        paths.htmltemplates,
        paths.projectjs
    ]).on('change', $.livereload.changed);

});

gulp.task('serve', ['watch']);

gulp.task('ngdocs', [], function () {
    var gulpDocs = require('gulp-ngdocs');
    var options = {
        //scripts: ['../app.min.js'],
        html5Mode: false,
        //startPage: '/api',
        title: pkg.name,
        titleLink: '/api'
    };
    return gulp.src(paths.projectjs)
        .pipe(gulpDocs.process())
        .pipe(gulp.dest(paths.docs));
});

// Update bower, component, npm at once:
gulp.task('bump', function () {
    gulp.src(['./bower.json', './package.json'])
        .pipe($.bump())
        .pipe(gulp.dest('./'));
});


/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
    var child;
    var excludeFiles = ['./app/**/*spaghetti.js'];
    var fork = require('child_process').fork;

    if (env.startServers) {
        log('Starting servers');
        var savedEnv = process.env;
        savedEnv.NODE_ENV = 'dev';
        savedEnv.PORT = 8888;
        child = fork('src/server/app.js', childProcessCompleted);
    } else {
        excludeFiles.push('./test/midway/**/*.spec.js');
    }

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    ////////////////

    function childProcessCompleted(error, stdout, stderr) {
        log('stdout: ' + stdout);
        log('stderr: ' + stderr);
        if (error !== null) {
            log('exec error: ' + error);
        }
    }

    function karmaCompleted() {
        if (child) {
            child.kill();
        }
        done();
    }
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {Number}           Formatted perentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}

//TODO Make cacheXML logic use gulp.src and process as a stream instead of use the current sync approach
gulp.task('cacheXML', function () {
    createJSON({
        moduleName: pkg.module,
        constantName: 'apCachedXML',
        fileName: 'offlineXML.js',
        dest: 'test/mocks/',
        src: [ 'xml-cache/', 'bower_components/angular-point/test/mock/xml/']
    });
});

/** Used to expose gulp tasks to gulp-devtools
 * Install on system with "npm install -g gulp-devtools"
 * @type {exports}
 */
module.exports = gulp;
