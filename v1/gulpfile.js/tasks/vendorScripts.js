
var config = require('../config');
var path = require('path');
var gulp = require('gulp');
var glob = require('glob');


var scriptCopyTask = config.tasks.copyScripts; 
var copyModulesTask = config.tasks.copyModules; 
var imgCopyTask = config.tasks.copyImg; 
var fontCopyTask = config.tasks.copyFonts; 
var htmlCopyTask = config.tasks.copyHtml; 

gulp.task('copyScripts', function () {
		// Vendor scripts
    gulp.src(path.join(config.root.src, scriptCopyTask.src, '**/*.js'))
    .pipe(gulp.dest(path.join(config.root.dest, scriptCopyTask.dest)))
});

gulp.task('copyModules', function () {
        // modules
    gulp.src(path.join(config.root.src, copyModulesTask.src, '**/*.js'))
    .pipe(gulp.dest(path.join(config.root.dest, copyModulesTask.dest)))
});

gulp.task('copyImg', function () {
    // Images
    gulp.src(path.join(config.root.src, imgCopyTask.src, '**/*'))
    .pipe(gulp.dest(path.join(config.root.dest, imgCopyTask.dest)))
});

gulp.task('copyFonts', function () {
    // Fonts
    gulp.src(path.join(config.root.src, fontCopyTask.src, '**/*'))
    .pipe(gulp.dest(path.join(config.root.dest, fontCopyTask.dest)))
});

gulp.task('copyHtml', function () {
	// HTML
    gulp.src(path.join(config.root.src, htmlCopyTask.src, '**/*.html'))
    .pipe(gulp.dest(path.join(config.root.dest, htmlCopyTask.dest)))
});