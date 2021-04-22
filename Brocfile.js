const funnel = require('broccoli-funnel')
const merge = require('broccoli-merge-trees')
const compileSass = require('broccoli-sass-source-maps')(require('sass'))
const babel = require('rollup-plugin-babel')
const Rollup = require('broccoli-rollup')

const appRoot = "app"

const html = funnel(appRoot, {
    files: ["index.html"],
    destDir: "/",
    annotation: 'Index file',
})

let js = new Rollup(appRoot, {
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
            babel({
                exclude: "node_modules/**"
            })
        ]
    }
})

const css = compileSass(
    [appRoot],
    "styles/app.scss",
    "assets/app.css",
    {
        sourceMap: true,
        sourceMapContents: true,
        annotation: "Sass files"
    })

const public = funnel('public', {
    annotation: "Public files"
})

module.exports = merge([html, js, css, public], { annotation: "Final output" })
