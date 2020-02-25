const walk = require('./walk.js');

function dir(url, reqPath) {
  let contentList = walk(reqPath);
  let html = `<ul>`
  for (let [index, item] of contentList.entries()) {
    html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a></li>`
  }
  html = `${html}</ul>`
  return html;
}

module.exports = dir;
