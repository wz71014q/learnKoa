const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

const app = new Koa();

function readFile(filePath) {
  let viewUrl = `./view/${filePath}`;
  return fs.readFileSync(viewUrl, 'UTF-8')
}

function getSuffixName(fileName) {
  let nameList = fileName.split('.');
  return nameList[nameList.length - 1];
}

function uploadFile(ctx, options) {
  const req = ctx.req;
  const busboy = new Busboy({
    headers: req.headers
  })
  return new Promise((resolve, reject) => {
    console.log('文件上传开始');
    let result = '';
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
      let fileName = Math.random().toString(16).substring(2) + '.' + getSuffixName(filename)
      if (!fs.existsSync(options.path)) {
        fs.mkdirSync(options.path);
      }
      let saveTo = path.join(options.path, fileName)
      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', function() {
        result = 'success';
        console.log('文件上传成功！')
        resolve(result)
      });
    });
    busboy.on('finish', function() {
      console.log('文件上传结束')
      resolve(result)
    });
    busboy.on('error', function(err) {
      console.log('文件上传出错')
      reject(result)
    })
    req.pipe(busboy);
  })
}

app.use(async (ctx) => {
  if (ctx.method === 'GET' && ctx.url === '/') {
    ctx.body = await readFile('upload.html');
  } else if (ctx.url === '/upload' && ctx.method === 'POST') {
    let result = { success: false };
    let serverFilePath = path.join(__dirname, '../uploadfiles');
    result = await uploadFile(ctx, {
      fileType: 'image',
      path: serverFilePath
    })
    ctx.body = result
  } else {
    ctx.body = '<h1>404</h1>'
  }
})

app.listen(3000, () => {
  console.log('Your application is running in http://localhost:3000')
})