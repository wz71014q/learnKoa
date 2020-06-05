const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const koaStatic  = require('koa-static');
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const prefixer = postcss([ require('autoprefixer') ]);

const { resolveFile, render } = require('./utils');

const app = new Koa();
const router = new Router()

async function resolveRoute(ctx) {
  const viewUrl = path.join(__dirname, `./static/views${ctx.request.url}.ejs`)
  const myCss = await resolveFile(path.join(__dirname, `./assets/styles${ctx.request.url}.css`))
  const cssResult = await postcss([ autoprefixer ]).process(myCss)
  console.log(cssResult.css)
  let html = await render(viewUrl, {
    url: 'urllllllllllllll',
    title: cssResult.css
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