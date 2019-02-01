const {
  ROOT_DIR,
  Case,
  createGenerator,
  fs,
  gulp,
  inquirer,
  interpolate,
  mergeStream,
  mkdirsSync,
  path,
  pkgDir,
  rename,
} = require('../../utils');

const defaults = {
  srcRoot: 'src',
  srcPath: 'tags/components',
  testRoot: 'test/unit',
};

const mapArgsToAnswers = (
  [name, componentSrcPath = ''],
  {
    srcRoot = defaults.srcRoot,
    srcPath = defaults.srcPath,
    testRoot = defaults.testRoot,
    testPath = defaults.srcPath,
  }
) => ({
  name,
  srcRoot,
  srcPath: componentSrcPath || srcPath,
  testRoot,
  testPath,
  moveon: true,
});

const prompts = [
  {
    name: 'name',
    message: 'What is your component called?',
  },
  {
    name: 'srcRoot',
    message: 'Provide the path to the root of the project source code:',
    default: defaults.srcRoot,
  },
  {
    name: 'srcPath',
    message: 'Provide the path to the directory where the component will be created:',
    default: defaults.srcPath,
  },
  {
    name: 'testRoot',
    message: 'Provide the path to the root of the project test code:',
    default: defaults.testRoot,
  },
  {
    name: 'testPath',
    message: 'Provide the path to the directory where the component tests will be created:',
    default: defaults.srcPath,
  },
  {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  },
];

const callback = (answers, done) => {
  if (!answers.moveon) {
    return done();
  }

  // Handle name.
  const sanitizedName = answers.name.replace(/\s+/g, '');
  const slug = Case.kebab(sanitizedName);
  answers.slug = slug;
  answers.sanitizedName = sanitizedName;

  // Compute and validate src and test dirs.
  const srcDir = path.join(ROOT_DIR, answers.srcRoot, answers.srcPath, slug);
  const testDir = path.join(ROOT_DIR, answers.testRoot, answers.testPath, slug);

  if (fs.existsSync(srcDir) || fs.existsSync(testDir)) {
    done('Please ensure that the component-specific folders do not exist within the source or test directories');
  }

  mkdirsSync(srcDir);
  mkdirsSync(testDir);

  const srcFiles = [
    `${__dirname}/../../templates/component/src/index.js`,
    `${__dirname}/../../templates/component/src/index.html`,
    `${__dirname}/../../templates/component/src/index.scss`,
  ];
  const testFiles = [
    `${__dirname}/../../templates/component/test/index.test.js`,
  ];

  // Compute relative path(s).
  answers.relativePath = path.relative(testDir, `${srcDir}/${slug}.js`);

  // Define streams, merge, and exit.
  const srcStream = gulp.src(srcFiles)
    .pipe(interpolate(answers))
    .pipe(rename((file) => {
      file.basename = slug;
    }))
    .pipe(gulp.dest(path.resolve(srcDir)));

  const testStream = gulp.src(testFiles)
    .pipe(interpolate(answers))
    .pipe(rename((file) => {
      file.basename = file.basename.replace('index', slug);
    }))
    .pipe(gulp.dest(path.resolve(testDir)));

  mergeStream(srcStream, testStream)
    .on('end', () => done());
};

module.exports = {
  prompts,
  callback,
  generate: createGenerator({ prompts, callback, mapArgsToAnswers }),
  mapArgsToAnswers,
};
