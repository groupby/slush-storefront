const _ = require('underscore.string');
const conflict = require('gulp-conflict');
const fs = require('fs');
const gulp = require('gulp');
const inquirer = require('inquirer');
const install = require('gulp-install');
const meow = require('meow');
const mergeStream = require('merge-stream');
const path = require('path');
const pkgDir = require('pkg-dir');
const rename = require('gulp-rename');
const template = require('gulp-template');

const INTERPOLATION_PATTERN = /<%=([\s\S]+?)%>/g;
const ROOT_DIR = pkgDir.sync(process.cwd());

/**
 * Given an options object, return a slush generator function.
 *
 * @param {Object} opts
 * @return {Function}
 */
const createGenerator = (opts) => {
  const {
    callback,
    prompts,
    mapArgsToAnswers = (args) => args,
    onError = (err, done) => done(err),
  } = opts;

  return (args = [], flags = {}) => (done) => {
    const proc = args && args.length
      ? Promise.resolve(mapArgsToAnswers(args, flags))
      : inquirer.prompt(prompts);

    return proc
      .then((answers) => callback(answers, done))
      .catch((err) => onError(err, done));
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
  let pattern = /[A-z][A-Z]/gm
  let matches;
  let output = str;

  while (matches = pattern.exec(output)) {
    let [letters] = matches;
    let replacement = letters.split('').join('-').toLowerCase();
    output = output.replace(letters, replacement);
  }

  return output.toLowerCase();
};

/**
 * Create each directory within a given path.
 *
 * @param {string} dirPath
 * @return {string}
 */
const mkdirsSync = (dirPath = '') => dirPath.split('/')
  .filter(segment => !!segment)
  .reduce((dirPath, segment) => {
    let p = path.join(dirPath, segment);

    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }

    return p;
  }, '/');

module.exports = {
  _,
  INTERPOLATION_PATTERN,
  ROOT_DIR,
  createGenerator,
  conflict,
  fs,
  gulp,
  inquirer,
  install,
  interpolate,
  meow,
  mergeStream,
  mkdirsSync,
  pascalToKebab,
  path,
  pkgDir,
  rename,
};
