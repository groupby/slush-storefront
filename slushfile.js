/*
 * slush-storefront
 * https://github.com/groupby/slush-storefront
 *
 * Copyright (c) 2017, GroupBy Inc.
 * Licensed under the MIT license.
 */

/* eslint-disable no-var,prefer-arrow-callback,array-bracket-spacing,no-magic-numbers,prefer-template,immutable/no-mutation,object-shorthand */

var path = require('path');
var gulp = require('gulp');
var conflict = require('gulp-conflict');
var rename = require('gulp-rename');
var install = require('gulp-install');
var _ = require('underscore.string');
var inquirer = require('inquirer');
var utils = require('./utils');
var { generateComponent } = require('./tasks');

gulp.task('component', generateComponent);

gulp.task('default', function(done) {
  var prompts = [
    {
      name: 'type',
      type: 'list',
      message: 'What sort of StoreFront project would you like to create?',
      choices: ['simple', 'webpack', 'advanced', 'sayt']
    }, {
      name: 'customerId',
      message: 'What is your customerId?'
    }, {
      name: 'area',
      message: 'What is your area?',
      default: 'Production'
    }, {
      name: 'collection',
      message: 'What is your collection?',
      default: 'default'
    }, {
      name: 'structure',
      type: 'confirm',
      message: 'Would you like set up your record structure mapping?'
    }, {
      name: 'id',
      message: 'What is your records\' id field?',
      default: 'id',
      when: function(answers) {
        return answers.structure;
      }
    }, {
      name: 'title',
      message: 'What is your records\' title field?',
      default: 'title',
      when: function(answers) {
        return answers.structure;
      }
    }, {
      name: 'price',
      message: 'What is your records\' price field?',
      default: 'price',
      when: function(answers) {
        return answers.structure;
      }
    }, {
      name: 'imageurl',
      message: 'What is your records\' image url field?',
      default: 'image',
      when: function(answers) {
        return answers.structure;
      }
    }, {
      name: 'autocompleteProductCount',
      type: 'input',
      message: 'How many autocomplete products would you like to display?',
      default: 8
    }, {
      name: 'recommendations',
      type: 'confirm',
      message: 'Would you like to turn on product recommendations?',
      when: function(answers) {
        return answers.type === 'sayt';
      }
    }, {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
    }
  ];

  // Ask
  inquirer.prompt(prompts).then(function(answers) {
    if (!answers.moveon) {
      return done();
    }
    answers.appName = _.slugify(answers.customerId);

    answers.id = answers.id || 'id';
    answers.title = answers.title || 'title';
    answers.price = answers.price || 'price';
    answers.imageurl = answers.imageurl || 'image';

    var isSimple = answers.type === 'simple' || answers.type === 'sayt';
    var sources = [
      path.join(__dirname, 'templates/_includes/dotfiles/*'),
      path.join(__dirname, 'templates/_includes/sass/**/*')
    ];
    if (isSimple) {
      sources.push(path.join(__dirname, 'templates/_includes/simple/*'));
    }
    sources.push(path.join(__dirname, 'templates', answers.type, '**/*'));

    gulp.src(sources)
      .pipe(utils.interpolate(answers))
      .pipe(rename(function(file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        }
        if (file.basename[0] === '$') {
          file.basename = file.basename.slice(1);
        }
      }))
      // .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function() {
        done();
      });
  });
});
