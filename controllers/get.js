const Koa = require('koa');
const fs = require('fs');
const chalk = require('chalk');

const app = new Koa();

function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`;
    fs.readFile(viewUrl, 'UTF-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

app.use(async (ctx) => {
  let url = ctx.url;
  // 获取请求参数的第一种方式
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;
  // 获取请求参数的第二种方式
  let ctx_query = ctx.query;
  let ctx_querystring = request.querystring;
  // ctx.body = await render('get.html');
  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  };
})

app.listen(3000, () => {
  console.log(chalk.yellow('Your application is running here:') + chalk.green('http://10.9.8.98:3000'))
})