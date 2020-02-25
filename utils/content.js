const fs = require('fs');
const path = require('path');

const dir = require('./dir')

function readFile(filePath) {
  return fs.readFileSync(filePath, 'binary')
}

async function content(ctx, fullStaticPath) {
  let reqPath = path.join(fullStaticPath, ctx.url);
  let exist = fs.existsSync(reqPath);
  let content = '';
  if (!exist) {
    content = '404 Not Found!';
  } else {
    let stat = fs.statSync(reqPath);
    if( stat.isDirectory() ) {
      //如果为目录，则渲读取目录内容
      content = dir( ctx.url, reqPath );
    } else {
      // 如果请求为文件，则读取文件内容
      content = await readFile( reqPath );
    }
  }
  return content;
}

module.exports = content;
