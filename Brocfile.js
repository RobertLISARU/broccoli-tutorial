const funnel = require("broccoli-funnel")
const merge = require("broccoli-merge-trees")

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

const css = funnel(appRoot, {
    srcDir: "styles",
    files: ["app.css"],
    destDir: "/assets",
    annotation: "CSS files"
})

const public = funnel('public', {
    annotation: "Public files"
})

module.exports = merge([html, js, css, public], { annotation: "Final output" })
