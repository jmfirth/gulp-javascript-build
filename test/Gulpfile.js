const gulp = require('gulp');
const TSBuild = require('../src');
const ts = new TSBuild('src/index.ts', 'dist/index.js', './**/*.ts');

gulp.task('build:ts', ['lint:ts'], () => ts.build());
gulp.task('lint:ts', () => ts.lint())
gulp.task('watch:ts', ['build:ts'], () => ts.watch(true));