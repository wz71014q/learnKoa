const Koa = require('koa');
const fs = require('fs');
const chalk = require('chalk');

const app = new Koa();

// 解析上下文中node原生请求的post参数
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = '';
      ctx.req.on('data', data => {
        postdata += data;
        console.log('data = ', postdata)
      })
      ctx.req.on('end', () => {
        console.log('end data = ', postdata)
        let parseData = parseQueryStr(postdata);
        resolve(parseData);
      })
    }
    catch (err) {
      reject(err)
    }
  })
}

// 将post请求参数字符串解析成json
function parseQueryStr(queryStr) {
  let queryData = {};
  let queryList = queryStr.split('&');
  console.log(queryList);
  for (let [index, queryStr] of queryList.entries()) {
    console.log('index, queryStr', index, queryStr)
    let itemList = queryStr.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData;
}

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
    let postData = await parsePostData(ctx);
    ctx.body = postData;
  } else {
    ctx.body = '<h1>404</h1>'
  }
})

app.listen(3000, () => {
  console.log(chalk.yellow('Your application is running here:') + chalk.green('http://10.9.8.98:3000'))
})