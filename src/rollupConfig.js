const Rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');

module.exports = function create(entry, dest, options = {}) {
  return Object.assign(
    {},
    {
      entry,
      dest,
      format: 'iife',
      sourceMap: true,
      plugins: [
        resolve({
          module: true,
          main: true,
          browser: true,
        }),
        commonjs(),
        typescript(),
        uglify()
      ],
    },
    options
  );
}
