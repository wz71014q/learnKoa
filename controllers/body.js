const Koa = require('koa');
const fs = require('fs');
const chalk = require('chalk');
const bodyParser = require('koa-bodyparser')

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" value="koajs"/><br/>
        <p>nickName</p>
        <input name="nickName" value="1654864"/><br/>
        <p>email</p>
        <input name="email" value="1654864@qq.com"/><br/>
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body;
    ctx.body = postData;
  } else {
    ctx.body = '<h1>404</h1>'
  }
})

app.listen(3000, () => {
  console.log(chalk.yellow('Your application is running here:') + chalk.green('http://10.9.8.98:3000'))
})