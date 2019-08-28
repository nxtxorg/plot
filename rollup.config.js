import { terser } from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const dev = process.env.NODE_ENV !== 'production';

const plugins = dev ? [
    resolve(),
    commonjs(),
    typescript(),
] : [
    resolve(),
    commonjs(),
    typescript(),
    terser()
];

export default {
    input: `src/${pkg.name}.ts`,
    output: {
        name: pkg.name.replace(/-/g, '_'),
        file: `build/${pkg.name}${(!dev ? '.min' : '')}.js`,
        format: 'iife',
        sourcemap: true
    },
    plugins: plugins
}