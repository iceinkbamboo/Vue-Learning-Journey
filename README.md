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