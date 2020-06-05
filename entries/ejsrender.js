const Koa = require('koa');
const path = require('path');
const { render } = require('./utils/render');

const app = new Koa();

async function route(url) {
  let viewUrl = '404.html'
  switch (url) {
    case '/':
      viewUrl = './static/views/home.ejs'
      break
    default:
      viewUrl = './static/views/home.ejs'
      break
  }
  let html = await render(viewUrl, {
    url,
    title: 'ggg'
  })
  return html
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await route(url)
  ctx.body = html
})

app.listen(3000, () => {
  console.log('Your application is running in http://localhost:3000')
})