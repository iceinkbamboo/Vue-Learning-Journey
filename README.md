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
```
#Vue组件

```bash
#使用组件的三种方式
1、<Header1 v-bind:title="title" @select="getEaxm"></Header1>
2、<component v-bind:is="currentTabComponent"  v-bind:title="title" @select="getEaxm"></component>
3、<div is="Header1"  v-bind:title="title" @select="getEaxm"></div>

#动态组件上使用<keep-alive>,上面的方法2即为动态组件
#保持组件，如果没有数据的改变，组件不会被重新渲染
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>

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

#组件上使用v-model,子组件中需要如下配置
<input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />

```

#计算机属性computed

```bash
#通过{{msg}}在templete中使用
computed: {
  msg () {
    return this.$store.state.msg
  }
}
```

#插槽
```bash

#1、默认插槽
#在子组件中添加<slot></slot>
<div>
  <h1>下面是插入内容</h1>
  <slot></slot>
</div>
#使用组件时，在组件中添加其他元素，如string、html、其他组件
<Component>
  你好
  <p>我是</P>
  <component-other></component-other>
</Component>
#调用组件中的内容会被插到<slot></slot>位置
<div>
  <h1>下面是插入内容</h1>
  你好
  <p>我是</P>
  <component-other></component-other>
</div>

#特殊：后备内容
<div>
  <slot>我是后备内容</slot>
</div>
1、使用组件时如果没有插槽内容时
<Compoent></Component>
会被渲染为
<div>
  我是后备内容
</div>

2、当有插槽内容时
<Component>
  我是插槽内容
</Component>
会被渲染为
<div>
  我是插槽内容
</div>

#2、具名插槽
1、使用场景——组件内需要多个插槽，将插槽内容分放到不同位置
<div>
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>

2、<slot>中使用'name'属性定义额外的插槽,不使用'name'的插槽其实是'name="default"'
<div>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

3、使用组件时，<template>元素中使用v-slot:指定插槽,'v-slot:'可以缩写为‘#’
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here some contact info</p>
  </template>
</base-layout>

4、没有被包含在<template>中的插槽内容，会被放到默认插槽中，其实也会被包裹在<template>中
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here some contact info</p>
  </template>
</base-layout>

#3、作用域插槽——子组件向父组件传递数据
1、子组件
<slot name="footer" v-bind:user="user"></slot>
2、父组件中引用
<template v-slot:footer="slotProps">
  {{slotProps.user.name}}
</template>

#4、动态插槽
<template v-slot:[slotName]></template>

```
#过滤器
```bash

#1、定义过滤器的两种方式（全局和局部）
全局
Vue.filter('capitalize', function(vallue) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
局部
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

#2、使用方式
1、{{ msg | capitalize }}
2、<div v-bind:id="msg | capitalize"></div>

#3、特殊使用
1、串连，msg作为参数传入filterA,返回的值作为filterB的参数传入filterB
{{ msg | filterA | filterB }}
2、{{ msg | filterA('arg1', 'arg2') }}
定义的filterA函数可接受3个参数，msg作为第一个参数传入，arg1是第二个参数，arg2是第三个参数

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
```

# Vue Router
```bash

#通过vue-cli创建项目时，自动创建，在src/router/index.js中

#手动配置如下
#安装vue-router
npm install vue-router

#import Vue from 'vue'
#import Router from 'vue-router'
#Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})

#在mian.js中引用，并加载到Vue实例中
import router from './router'

#跳转页面，传递参数
#如果路由不是动态路由，又需要传递参数
1、this.$router.push({name: 'index', params:{examid: id}})
#缺点：页面被强行刷新后，this.$route.params为空，需要提前存储
#如果只是放到data数据中，页面刷新后仍然记录不了数据，需要存储到localStorage中

2、this.$router.push({name: 'index', query: {examid: id}})
#这种方法,路由链接后加?id=1
#this.$route.query获取参数，即使刷新页面，也可获取参数


```

#简单动态路由
```bash

#router/index.js定义路由
routes: [
  {
    path: '/exam/:examid',
    name: 'exam',
    component: exam
  }
]

#跳转方式
this.$router.push({path: `/exam/${id}`})
this.$router.push({name: 'exam', params:{examid: id}})

#接收参数
this.$route.params: {examid: id}

#使用query传参
#跳转页面连接格式：/exam?examid=id
#路由配置
routes: [
  {
    path: '/exam',
    name: 'exam',
    component: exam
  }
]
#跳转方式
this.$router.push({name: 'exam'}, query: {examid: id})
#接收参数
this.$route.query: {examid: id}

```

#嵌套路由
```bash

#结构
routes: [
  { path: '/user/:id', component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'profile',
        component: UserProfile
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'posts',
        component: UserPosts
      }
    ]
  }
]

```

#命名视图
```bash

#通过路由<router-view />将多个组件渲染到同一个父组件中
#html中
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

#路由配置
routes: [
  {
    path: '/',
    components: {
      default: Foo,
      a: Bar,
      b: Baz
    }
  }
]

```
#SSR(服务端渲染)