var config = require('../config');
var path = require('path');
var browserSync  = require('browser-sync');
var gulp = require('gulp');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var handlebars = require('gulp-handlebars');
var taskTemplates = config.tasks.templates;
var taskPartials = config.tasks.partials;

gulp.task('templates', function() {
    gulp.src(path.join(config.root.src, taskTemplates.src, '_*.hbs'))
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'App.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(path.join(config.root.dest, taskTemplates.dest)));
});

gulp.task('partials', function() {
    gulp.src(path.join(config.root.src, taskPartials.src, '_*.hbs'))
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        processPartialName: function(fileName) {
          // Strip the extension and the underscore 
          // Escape the output with JSON.stringify 
          return JSON.stringify(path.basename(fileName, '.js').substr(1));
        }
      }
    }))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest(path.join(config.root.dest, taskPartials.dest)));
});