const funnel = require("broccoli-funnel")
const merge = require("broccoli-merge-trees")
const compileSass = require('broccoli-sass-source-maps')(require('sass'))

const appRoot = "app"

const html = funnel(appRoot, {
    files: ["index.html"],
    destDir: "/",
    annotation: 'Index file',
})

const js = funnel(appRoot, {
    files: ["app.js"],
    destDir: "/assets",
    annotation: "JS files"
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
