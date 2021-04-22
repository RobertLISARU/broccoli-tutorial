const funnel = require('broccoli-funnel')
const merge = require('broccoli-merge-trees')
const compileSass = require('broccoli-sass-source-maps')(require('sass'))
const babel = require('rollup-plugin-babel')
const Rollup = require('broccoli-rollup')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const LiveReload = require('broccoli-livereload')
const log = require('broccoli-stew').log
const debug = require('broccoli-stew').debug
const esLint = require("broccoli-lint-eslint")
const sassLint = require("broccoli-sass-lint")

const appRoot = "app"

const html = funnel(appRoot, {
    files: ["index.html"],
    destDir: "/",
    annotation: 'Index file',
})

let js = esLint(appRoot, {
    persist: true
})

js = new Rollup(appRoot, {
    inputFiles: ["**/*.js"],
    annotation: "JS Transformation",
    rollup: {
        input: "app.js",
        output: {
            file: "assets/app.js",
            format: "iife",
            sourcemap: true
        },
        plugins: [
            nodeResolve({
                jsnext: true,
                browser: true,
            }),
            commonjs({
                include: 'node_modules/**',
            }),
            babel({
                exclude: "node_modules/**"
            })
        ]
    }
})

js = log(js, {
    output: 'js',
})

let css = sassLint(appRoot + '/styles', {
    disableTestGenerator: true,
})

css = compileSass(
    [appRoot],
    "styles/app.scss",
    "assets/app.css",
    {
        sourceMap: true,
        sourceMapContents: true,
        annotation: "Sass files"
    })

const publicFolder = funnel('public', {
    annotation: "Public files"
})

let tree = merge([html, js, css, publicFolder], { annotation: "Final output" })

tree = new LiveReload(tree, {
    target: 'index.html',
})

tree = log(tree, {
    output: 'tree',
})

tree = debug(tree, 'my-tree')

module.exports = tree
