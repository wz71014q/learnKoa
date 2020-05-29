const Koa = require('koa');
const views = require('koa-views');
const static = require('koa-static')
const path = require('path');

const app = new Koa();

app.use(static(path.resolve(__dirname, '../assets')));

app.use(views(path.join(__dirname, '../view'), {
  extension: 'ejs'
}));

app.use( async ( ctx ) => {
  let url = 'template'
  await ctx.render('get', {
    url,
    title: 'ggg'
  })
})

app.listen(3000, () => {
  console.log('Your application is running in http://localhost:3000')
})