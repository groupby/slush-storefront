const {
  ROOT_DIR,
  createGenerator,
  fs,
  gulp,
  inquirer,
  interpolate,
  mergeStream,
  mkdirsSync,
  pascalToKebab,
  path,
  pkgDir,
  rename,
} = require('../../utils');

const defaults = {
  srcRoot: 'src',
  testRoot: 'test/unit',
};

const mapArgsToAnswers = ([name, srcPath = ''], { srcRoot = defaults.srcRoot }) => ({
  name,
  srcPath,
  srcRoot,
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
  const slug = pascalToKebab(sanitizedName);
  answers.slug = slug;
  answers.sanitizedName = sanitizedName;

  // Compute and validate src and test dirs.
  const srcDir = path.join(ROOT_DIR, answers.srcRoot, answers.srcPath, slug);
  const testDir = path.join(ROOT_DIR, defaults.testRoot, answers.srcPath, slug);

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
