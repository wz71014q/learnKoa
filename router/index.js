const koa = require('koa');
const fs = require('fs');
const chalk = require('chalk');
const Router = require('koa-router');

const app = new koa();
let home = new Router();

home.get('/', async (ctx) => {
  let view = await render('index.html')
  ctx.body = view
})

let page = new Router()
page
  .get('/404', (ctx) => {
    ctx.body = '404 page'
  })
  .get('/hello', (ctx) => {
    ctx.body = 'hello world'
  })

let router = new Router()

router.prefix('/mma/v1')

router.use('/', home.routes());
router.use('/page', page.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log(chalk.yellow('Your application is running here:') + chalk.green('http://10.9.8.98:3000'))
})

function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}