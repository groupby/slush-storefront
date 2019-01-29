const _ = require('underscore.string');
const conflict = require('gulp-conflict');
const fs = require('fs');
const gulp = require('gulp');
const inquirer = require('inquirer');
const install = require('gulp-install');
const mergeStream = require('merge-stream');
const path = require('path');
const rename = require('gulp-rename');
const template = require('gulp-template');

const INTERPOLATION_PATTERN = /<%=([\s\S]+?)%>/g;

/**
 * Given an options object, return a slush generator function.
 *
 * @param {Object} opts
 * @return {Function}
 */
const createGenerator = (opts) => {
  const {
    prompts,
    callback,
    onError = (err) => {
      console.error('Whoops, something went wrong!');
      console.error(err);
    },
  } = opts;

  return (done) => {
    inquirer.prompt(prompts)
      .then(callback)
      .catch(onError);
  };
};

/**
 * Replace placeholder values using the data provided.
 *
 * @param {Object} data
 */
const interpolate = (data) => template(data, { interpolate: INTERPOLATION_PATTERN });

/**
 * Given a pascal case string, convert it to kebab case.
 *
 * @param {string} str
 * @return {string}
 */
const pascalToKebab = (str) => {
  return str.replace(/[A-z][A-Z]/g, (letters) => letters.split('').join('-')).toLowerCase();
};

module.exports = {
  _,
  INTERPOLATION_PATTERN,
  createGenerator,
  conflict,
  fs,
  gulp,
  inquirer,
  install,
  interpolate,
  mergeStream,
  pascalToKebab,
  path,
  rename,
};
