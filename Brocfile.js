const funnel = require('broccoli-funnel')
const merge = require('broccoli-merge-trees')
const compileSass = require('broccoli-sass-source-maps')(require('sass'))
const babel = require('broccoli-babel-transpiler')

const appRoot = "app"

const html = funnel(appRoot, {
    files: ["index.html"],
    destDir: "/",
    annotation: 'Index file',
})

let js = funnel(appRoot, {
    files: ["app.js"],
    destDir: "/assets",
    annotation: "JS files"
})

js = babel(js, {
    browserPolyfill: true,
    sourceMap: 'inline'
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
