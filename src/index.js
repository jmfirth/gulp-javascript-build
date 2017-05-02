const path = require('path');
const gulp = require('gulp');
const rollup = require('rollup-stream');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tslint = require('gulp-tslint');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const yargs = require('yargs');

const createRollupConfig = require('./rollupConfig');

class TSBuild {
    constructor(entry, dest, entryGlob, rollupConfig) {
        this.entry = entry;
        this.entryPath = path.parse(entry);
        this.entryGlob = entryGlob;

        this.dest = dest;
        this.destPath = path.parse(dest);

        this.verbose = yargs.verbose;
        this.gulp = gulp;

        this.rollupConfig = rollupConfig || createRollupConfig(entry, dest);

        this.lint = this.lint.bind(this);
        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }

    lint() {
        return gulp.src(this.entryGlob)
            .pipe(tslint({ formatter: 'prose' }))
            .pipe(tslint.report({ emitError: false }));
    }

    build() {
        return plumber()
            .pipe(rollup(this.rollupConfig))
            .pipe(source(this.entryPath.base, this.entryPath.dir))
            .pipe(buffer())
            .pipe(rename(`${this.destPath.base}`))
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('.'))
            .pipe(size())
            .pipe(gulp.dest(this.destPath.dir));
    }

    watch() {
        gulp.watch(this.entryGlob, () => {
            this.lint();
            this.build();
        });
    }
}

module.exports = TSBuild;