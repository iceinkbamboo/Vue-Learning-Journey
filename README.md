# source

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test

#run server
npm run server
```
# koa

```bash
#安装koa
npm install koa -S

#安装数据库插件
npm install mysql -s

#安装koa-router中间件
# koa2 对应的版本是 7.x
npm install --save koa-router@7

#安装koa2版本的koa-bodyparser@3中间件
#对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
npm install --save koa-bodyparser@3

#安装koa2-cors,设置请求跨域
npm install --save koa2-cors
```
#实例

```bash

#创建mySql.js
#引入const mysql = require('mysql')，连接数据库
#声明query函数进行数据库操作
const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  '127.0.0.1',
  user     :  'root',
  password :  'zhsh217218',
  database :  'poetry'
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }

#创建server1.js——server...js
#搭建get/post服务
function server5() {
  console.log('开始')
  const Koa = require('koa')
  const Router = require('koa-router')
  const bodyParser = require('koa-bodyparser')
  const {query} = require('./mySql')
  const cors = require('koa2-cors')
  const app = new Koa()
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
  app.use(cors())
  app.use(bodyParser())
  app.use(router.routes()).use(router.allowedMethods())
  app.listen(3000, () => {
    console.log('server is starting at port 3000')
  })
}

module.exports = server5

#创建server.js
#服务入口文件，引入服务
const server  = require('./server5.js')
server()

#启用服务
#在package.json中设置
#scripts": {
#  "server": "node server.js"
#}
#使用下面命令开启
npm run server

```
# Vue

```bash
# Vue组件
#使用组件的三种方式
1、<Header1 v-bind:title="title" @select="getEaxm"></Header1>
2、<component v-bind:is="currentTabComponent"  v-bind:title="title" @select="getEaxm"></component>
3、<div is="Header1"  v-bind:title="title" @select="getEaxm"></div>

#父组件传值给子组件
1、父组件使用子组件时，将数据绑定到一个特性
v-bind:title="title1"

2、子组件定义props【数组】，接收父组件传值
props:['title']

#父组件监听子组件事件
1、父组件自定义事件select
@select="getEaxm"

2、子组件通过$emit(eventName,[...args])传递数据
$emit('select',examid)

3、父组件在getEaxm函数中接收参数
getEaxm = (examid) => {
  // todo
}

# 计算机属性computed
# {{msg}}
computed: {
  msg () {
    return this.$store.state.msg
  }
}
```
# Vuex
```bash
#安装vuex
npm install vuex --save

#创建store/store.js文件
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    msg: 'hello world'
  },
  mutations: {
    changeMsg (state, value) {
      console.log('获取值', value)
      state.msg = value
    }
  }
})

#在main.js中引入store.js
import store from './store/store'

#在实例Vue中引入store
#通过this.$store.state获取值
#通过this.$store.commit('eventName', value)更改值