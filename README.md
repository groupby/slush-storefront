# Slush StoreFront

[![Greenkeeper badge](https://badges.greenkeeper.io/groupby/slush-storefront.svg)](https://greenkeeper.io/)

[![npm](https://img.shields.io/npm/v/slush-storefront.svg?style=flat-square)](https://www.npmjs.com/package/slush-storefront)
[![build](https://img.shields.io/circleci/project/github/groupby/slush-storefront/master.svg?label=linux&style=flat-square)](https://circleci.com/gh/groupby/slush-storefront)
[![deps](https://david-dm.org/groupby/slush-storefront.svg?style=flat-square)](https://david-dm.org/groupby/slush-storefront)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)


> [Slush](http://slushjs.github.io/) generator for [Searchandiser UI](https://github.com/groupby/searchandiser-ui) projects


## Getting Started

Install `slush` globally:

```bash
$ npm install -g slush
```

Install `slush-storefront` globally:

```bash
$ npm install -g slush-storefront
```

## Usage

This generator may be used to create any of the following StoreFront artifacts:

| Type      | Command                      | Supports Prompts | Supports CLI |
| :------   | :----------------------------| :--------------- | :----------- |
| project   | `slush storefront`           | Y                | N            |
| component | `slush storefront:component` | Y                | Y            |

### Generating StoreFront Projects

Create a new folder for your project:

```bash
$ mkdir my-storefront
```

Run the generator from within the new folder:

```bash
$ cd my-storefront && slush storefront
```

### Generating StoreFront Components

#### via Prompts

To generate a component by answering a series of questions, execute the following:

```
slush storefront:component
```

#### via CLI

To generate a component directly from the command line, execute the following:

```
slush storefront:component <ComponentName> <path/to/components/directory>
```

When generating the component's definition and test files, the path argument is implicitly relative to the project's source code and test code directories (by default, these are assumed to be `src/` and `test/unit`). The following flags may be used to override these defaults:

```
# Include the --srcRoot flag to overwrite the default source code directory.
slush storefront:component <ComponentName> <path/to/components/directory> --srcRoot <path/to/src/root>
```

```
# Include the --testRoot flag to overwrite the default test directory.
slush storefront:component <ComponentName> <path/to/components/directory> --testRoot <path/to/test/root>
```

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/groupby/slush-storefront/issues).
