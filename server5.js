function server5() {
  console.log('开始')
  const Koa = require('koa')
  const Router = require('koa-router')
  const bodyParser = require('koa-bodyparser')
  const {query} = require('./mySql')
  var cors = require('koa2-cors')
  const app = new Koa()
  app.use(cors())
  async function getUser() {
    let sql = 'select * from user'
    let data = await query(sql)
    return data
  }
  async function postUser(username) {
    let sql = "select * from user where username = '" + username + "'"
    let data = await query(sql)
    console.log(data)
    return data
  }
  let home = new Router()
  // 子路由
  home.get('/user', async ( ctx )=>{
    let data = await getUser()
    ctx.body = data[0]
  })
  home.post('/getUser', async (ctx) => {
    console.log(ctx.request.body)
    let username = ctx.request.body.username
    let data = await postUser(username)
    ctx.body = data[0]
  })

  // 装载所有子路由
  let router = new Router()
  router.use('/poetry', home.routes(), home.allowedMethods())

  // 加载路由中间件
  app.use(bodyParser())
  app.use(router.routes()).use(router.allowedMethods())
  app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
  })
}

module.exports = server5