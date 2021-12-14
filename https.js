const https = require('https');
const fs = require('fs');
const Koa = require('koa');
const path = require('path');

const app = new Koa();
const options = {
  key: fs.readFileSync(path.join(__dirname, './keys', 'privatekey.pem')),
  cert: fs.readFileSync(path.join(__dirname, './keys', 'certificate.pem'))
};

https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  })
  .listen(5005, function () {
    console.log('Https server listening on port ' + 5005);
  });
