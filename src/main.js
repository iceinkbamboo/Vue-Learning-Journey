// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

// 定义全局组件
Vue.component('global-component', {
  data: function () {
    return {
      title: '我是全局组件'
    }
  },
  template: '<div class="title">{{title}}</div>'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
