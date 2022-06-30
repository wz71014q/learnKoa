#!/usr/bin/env node

const Koa = require('koa');
const serveStatic = require('koa-static');
const serveIndex = require('koa-serve-index');
const os = require('os');

const app = new Koa();
const dir = '/Users/wangzhiqiang/work/UI';
function getIPAddress() {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || '127.0.0.1';
}
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(serveIndex(dir, { icons: true }));

const options = {
  index: 'index.html',
  extensions: ['html', 'json']
};
app.use(serveStatic(dir, options));

app.listen(3005, () => {
  var url = 'http://' + getIPAddress() + ':3005';
  console.log('Your application is running here: ' + url);
});