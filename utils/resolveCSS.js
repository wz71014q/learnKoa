const postcss = require("postcss")
const autoprefixer = require("autoprefixer")
const fs = require("fs")
const path = require("path")
const { resolveFile } = require("./index")

function resolvePath(file) {
  return path.resolve(__dirname, "../assets/styles", file)
}

async function resolveCss() {
  const myCss = await resolveFile(resolvePath("flex.css"))
  const cssResult = await postcss([autoprefixer()]).process(myCss, {
      from: resolvePath("flex.css"),
      to: resolvePath("flex_result.css")
    })
  fs.writeFile(resolvePath("flex_result.css"), cssResult.css, (err, data) => {})
  if (cssResult.map) fs.writeFile(resolvePath("flex.css.map"), cssResult.map, (err, data) => {})
  console.log(cssResult.css)
}
resolveCss()
