'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var ngAnnotate = require('gulp-ng-annotate');

var path = {
  vendor: [
    'node_modules/angular/angular.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/semantic-ui/dist/semantic.js'],
  js: [
    'app/app.module.js',
    'app/app.dataservice.js',
    'app/vertical-tags/vertical-tags.directive.js',
    'app/vertical-tags/vertical-tags.controller.js',
    'app/vertical-tags/vertical-tags.service.get-all-tags.js',
    'app/vertical-tags/vertical-tags.service.get-initial-data.js',
    'app/daily-rate-table/daily-rate.controller.js',
    'app/daily-rate-table/daily-rate.directive.js'
  ],

  templates: [
    'app/vertical-tags/vertical-tags.html',
    'app/daily-rate-table/daily-rate.html'
  ]
};


gulp.task('vendor', function () {
  gulp.src(path.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public'))
});

gulp.task('js', function () {
  gulp.src(path.js)
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public'))
});

gulp.task('templates', function () {
  gulp.src(path.templates)
    .pipe(gulp.dest('public/templates'))
});


gulp.task('watch', function () {
  gulp.watch(path.templates, ['templates']);
  gulp.watch(path.css, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.vendor, ['vendor']);
});

gulp.task('default', ['vendor', 'js', 'templates', 'watch']);