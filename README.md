# GeekHive Gulp TypeScript Build

A simplified, standardized, gulp-compatible build script to bundle a source file using TypeScript, Rollup and Uglify.

## Installation

Using NPM

```
npm install geekhive/gulp-typescript-build --save-dev
```

Using yarn

```
yarn add geekhive/gulp-typescript-build --dev
```

## Usage

Require `@geekhive/gulp-typescript-build` to access the build class.

```
const TSBuild = require('@geekhive/gulp-typescript-build');
```

### `new TSBuild(src, dest, glob, gulp)`

Create a new `TSBuild` object by passing it source and destination paths for the file to bundle as well as a reference to `gulp`.

```
const ts = new TSBuild(
  `${__dirname}/src/index.ts`,
  `${__dirname}/dest/bundle.min.js`,
  gulp);
```

### `TSBuild#lint()`

The `TSBuild#lint` method can be passed directly to gulp as a build task:

```
gulp.task('lint:ts', ts.lint);
```

Calling `ts.lint` will lint the project using your local `tslint.json` configuration.

### `TSBuild#build()`

The `TSBuild#build` method can be passed directly to gulp as a build task:

```
gulp.task('build:ts', ts.build);
```

Calling `ts.build` will bundle the source script using TypeScript, Rollup and Uglify and output the result to the destination location.  The build will be compiled using your local `tsconfig.json` configuration.

### `TSBuild#watch()`

The `TSBuild#watch` method can be passed directly to gulp as a watch task:

```
gulp.task('watch:ts', ts.watch);
```

Calling `ts.watch` will start watching the source script and dependencies for changes and will rebuild the bundle when changes are made.