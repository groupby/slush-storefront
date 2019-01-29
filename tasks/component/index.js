const {
  createGenerator,
  fs,
  gulp,
  inquirer,
  interpolate,
  mergeStream,
  pascalToKebab,
  path,
  rename,
} = require('../../utils');

const defaults = {
  srcPath: 'src/tags/components',
  testPath: 'test/unit/tags/components',
};

const prompts = [
  {
    name: 'name',
    message: 'What is your component called?',
  },
  {

    name: 'srcPath',
    message: 'Provide the path to the directory where the component will be added:',
    default: defaults.srcPath,
  },
  {
    name: 'testPath',
    message: 'Provide the path to the directory where the component tests will be added:',
    default: defaults.testPath,
  },
  {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  },
];

const callback = (answers) => {
  if (!answers.moveon) {
    return done();
  }

  // Handle name.
  const sanitizedName = answers.name.replace(/\s+/g, '');
  const slug = pascalToKebab(sanitizedName);
  answers.slug = slug;
  answers.sanitizedName = sanitizedName;

  // Handle src path and files.
  const srcDir = `${answers.srcPath}/${slug}`;
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
  }
  const srcFiles = [
    `${__dirname}/../../templates/component/src/index.js`,
    `${__dirname}/../../templates/component/src/index.html`,
    `${__dirname}/../../templates/component/src/index.scss`,
  ];

  // Handle test path and files.
  const testDir = `${answers.testPath}/${slug}`;
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }
  const testFiles = [
    `${__dirname}/../../templates/component/test/index.test.js`,
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
};


module.exports = {
  prompts,
  callback,
  generate: createGenerator({ prompts, callback }),
};
