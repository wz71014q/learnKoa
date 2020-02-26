const inspect = require('util').inspect;
const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

const busboy = new Busboy({
  headers: req.headers
})

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

function getSuffixName(fileName) {
  let nameList = fileName.split('.');
  return nameList[nameList - 1];
}

function uploadFile(ctx, options) {
  let req = ctx.req;
  let res = ctx.res;
  let fileType = options.fileType || 'common';
  let filePath = path.join(options.path, fileType);

  return new Promise((resolve, reject) => {
    console.log('文件上传中');
    let result = {
      success: false,
      formData: {}
    };
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log(`File [${fieldname}]: filename: ${filename}`);
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join( filePath, fileName )
      let saveTo = path.join(_uploadFilePath)

      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', function() {
        result.success = true
        result.message = '文件上传成功'
        console.log('文件上传成功！')
        resolve(result)
      })
    });

    // 解析表单中其他字段信息
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
      result.formData[fieldname] = inspect(val);
    });

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
  })
}

module.exports =  {
  uploadFile
}
