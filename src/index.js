const path = require('path');
const rollup = require('rollup-stream');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tslint = require('gulp-tslint');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const yargs = require('yargs').argv;
const createRollupConfig = require('./rollupConfig');

const isObject = a => typeof a === 'object';
const isString = s => typeof s === 'string';

class TSBuild {
    constructor(entry, dest, srcGlob, gulp) {
        this.entry = entry;
        this.entryPath = path.parse(entry);
        this.srcGlob = srcGlob;

        this.dest = dest;
        this.destPath = path.parse(dest);

        this.verbose = yargs.verbose;
        this.gulp = gulp;

        this.lint = this.lint.bind(this);
        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }

    lint(lintOptions, reportOptions) {
        return this.gulp.src(this.srcGlob)
            .pipe(tslint(
                isObject(lintOptions) ? lintOptions : { formatter: 'prose' }
            ))
            .pipe(tslint.report(
                isObject(reportOptions) ? reportOptions : { emitError: false }
            ));
    }

    build(rollupConfig) {
        return plumber()
            .pipe(rollup(
                isObject(rollupConfig) || isString(rollupConfig)
                    ? rollupConfig
                    : createRollupConfig(this.entry, this.dest)
            ))
            .pipe(source(this.entryPath.base, this.entryPath.dir))
            .pipe(buffer())
            .pipe(rename(`${this.destPath.base}`))
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('.'))
            .pipe(size())
            .pipe(this.gulp.dest(this.destPath.dir));
    }

    watch(lintOptions, reportOptions, rollupConfig) {
        this.gulp.watch(this.srcGlob, () => {
            this.lint(lintOptions, reportOptions);
            this.build(rollupConfig);
        });
    }
}

module.exports = TSBuild;