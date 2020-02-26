const Koa = require('koa');
const serve  = require('koa-static');
const path = require('path');
const chalk = require('chalk');

const app = new Koa();

const staticPath = '../static';

app.use(serve (
  path.join(__dirname, staticPath)
))

app.use((ctx) => {
  ctx.body = '<a href="/">该页面不存在，返回根目录</a>';
})

app.listen(3000, () => {
  console.log(chalk.yellow('Your application is running here:') + chalk.green('http://10.9.8.98:3000'))
})
