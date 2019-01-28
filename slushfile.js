/*
 * slush-storefront
 * https://github.com/groupby/slush-storefront
 *
 * Copyright (c) 2017, GroupBy Inc.
 * Licensed under the MIT license.
 */

/* eslint-disable no-var,prefer-arrow-callback,array-bracket-spacing,no-magic-numbers,prefer-template,immutable/no-mutation,object-shorthand */

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var install = require('gulp-install');
var _ = require('underscore.string');
var inquirer = require('inquirer');
var mergeStream = require('merge-stream');
var utils = require('./utils');

const INTERPOLATION_PATTERN = /<%=([\s\S]+?)%>/g;

const interpolate = (data) => template(data, { interpolate: INTERPOLATION_PATTERN });

gulp.task('component', function(done) {
  var prompts = [
    {
      name: 'name',
      message: 'What is your component called?',
    },
    {

      name: 'srcPath',
      message: 'Provide the path to the directory where the component will be added:',
      default: 'src/tags/components',
    },
    {
      name: 'testPath',
      message: 'Provide the path to the directory where the component tests will be added:',
      default: 'test/unit/tags/components',
    },
    {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
    },
  ];

  inquirer.prompt(prompts)
    .then(function(answers) {
      if (!answers.moveon) {
        return done();
      }

      // Handle name.
      const sanitizedName = answers.name.replace(/\s+/g, '');
      const slug = utils.pascalToKebab(sanitizedName);
      answers.slug = slug;
      answers.sanitizedName = sanitizedName;

      // Handle src path and files.
      const srcDir = `${answers.srcPath}/${slug}`;
      if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir);
      }
      const srcFiles = [
        `${__dirname}/templates/component/src/index.js`,
        `${__dirname}/templates/component/src/index.html`,
        `${__dirname}/templates/component/src/index.scss`,
      ];

      // Handle test path and files.
      const testDir = `${answers.testPath}/${slug}`;
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir);
      }
      const testFiles = [
        `${__dirname}/templates/component/test/index.test.js`,
      ];

      // Compute relative path(s).
      answers.relativePath = path.relative(testDir, `${srcDir}/${slug}.js`);

      // Define streams, merge, and exit.
      const srcStream = gulp.src(srcFiles)
        .pipe(interpolate(answers))
        .pipe(rename(function(file) {
          file.basename = slug;
        }))
        .pipe(gulp.dest(path.resolve(srcDir)));

      const testStream = gulp.src(testFiles)
        .pipe(interpolate(answers))
        .pipe(rename(function(file) {
          file.basename = file.basename.replace('index', slug);
        }))
        .pipe(gulp.dest(path.resolve(testDir)));

      mergeStream(srcStream, testStream)
        .on('end', function() {
          done();
        });
    })
    .catch(function(err) {
      console.error('Failed to generate component.');
      console.error(err);
    })
});

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
      .pipe(interpolate(answers))
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
