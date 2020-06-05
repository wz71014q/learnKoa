const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const koaStatic  = require('koa-static');

const { render } = require('./utils/render');

const app = new Koa();
const router = new Router()

async function resolveRoute(ctx) {
  let viewUrl = ctx.request.url
  viewUrl = path.join(__dirname, './static/views', `${viewUrl}.ejs`)
  let html = await render(viewUrl, {
    url: 'urllllllllllllll',
    title: 'ggg'
  })
  ctx.body = html
}

router.get('/home', resolveRoute);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(koaStatic(path.resolve(__dirname, './assets')));

app.listen(3000, () => {
  console.log('Your application is running in http://localhost:3000')
})