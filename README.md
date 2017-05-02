# GeekHive Gulp TypeScript Build

A simplified, standardized, gulp-compatible build script to bundle a source file using TypeScript, Rollup and Uglify.

## Installation

Using NPM

```sh
npm install geekhive/gulp-typescript-build --save-dev
```

Using yarn

```sh
yarn add geekhive/gulp-typescript-build --dev
```

## Usage

Require `@geekhive/gulp-typescript-build` to access the build class.

```js
const TSBuild = require('@geekhive/gulp-typescript-build');
```

### `new TSBuild(entry, dest, srcGlob, gulp)`

Create a new `TSBuild` object by passing it source and destination paths for the file to bundle as well as a reference to `gulp`.

```js
const gulp = require('gulp');

const ts = new TSBuild(
  `${__dirname}/src/index.ts`,
  `${__dirname}/dest/bundle.min.js`,
  `${__dirname}/src/**/*.ts`,
  gulp);
```

### `TSBuild#lint(lintOptions, reportOptions)`

The `TSBuild#lint` method can be passed directly to gulp as a build task.

```js
gulp.task('lint:ts', ts.lint);
```

Both `lintOptions` and `reportOptions` parameters are optional; see: [`gulp-tslint`](https://github.com/panuhorsmalahti/gulp-tslint) for details.

```js
const tslintJson = require('./tslint.json');
const lintOptions = { configuration: tslintJson };
const reportOptions = { emitError: true };

gulp.task('lint:ts', () => ts.lint(lintOptions, reportOptions));
```

Calling `ts.lint` will lint the project using your local `tslint.json` configuration.

### `TSBuild#build(rollupConfig)`

The `TSBuild#build` method can be passed directly to gulp as a build task.

```js
gulp.task('build:ts', ts.build);
```

Parameter `rollupConfig` is optional; see: [Rollup Wiki: Command Line Interface](https://github.com/rollup/rollup/wiki/Command-Line-Interface) for details.

```js
const rollupConfig = require('./rollup.config');

gulp.task('build:ts', () => ts.build(rollupConfig));
```

Calling `ts.build` will bundle the source script using TypeScript, Rollup and Uglify and output the result to the destination location.  The build will be compiled using your local `tsconfig.json` configuration.

### `TSBuild#watch()`

The `TSBuild#watch` method can be passed directly to gulp as a watch task:

```js
gulp.task('watch:ts', ts.watch);
```

Calling `ts.watch` will start watching the source script and dependencies for changes and will rebuild the bundle when changes are made.