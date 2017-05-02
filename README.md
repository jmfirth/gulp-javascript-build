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

### `new TSBuild(src, dest, gulp)`

Create a new `TSBuild` object by passing it source and destination paths for the file to bundle as well as a reference to `gulp`.

```
const js = new TSBuild(
  `${__dirname}/assets/js/site.js`,
  `${__dirname}/assets/js/site.min.js`,
  gulp);
```

The `dest` argument may also be an array of destinations.

```
const js = new TSBuild(
    `${__dirname}/assets/js/site.js`,
    [
        `${__dirname}/assets/js/site.min.js`,
        `${__dirname}/assets/example/alternative.js`
    ],
    gulp);
```

### `TSBuild#build()`

The `TSBuild#build` method can be passed directly to gulp as a build task:

```
gulp.task('build:js', js.build);
```

Calling `js.build` will bundle the source script using Browserify, Babel and Uglify and output the result to the destination location.

### `TSBuild#watch()`

The `TSBuild#watch` method can be passed directly to gulp as a watch task:

```
gulp.task('watch:js', js.watch);
```

Calling `js.watch` will start watching the source script and dependencies for changes and will rebuild the bundle when changes are made.