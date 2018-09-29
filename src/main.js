/*
* 入口js
* */
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/mockServer'  //加载mockServer
import './filters'            //加载过滤器
import VueLazyLoad from 'vue-lazyload'     // 图片懒加载的库
import loading from './common/imgs/loading.gif'
// 注册全局组件标签
Vue.component(Button.name,Button)    //<mt-button>
Vue.use(VueLazyLoad,{   //内部定义一个指令lazy
  loading
})

let app = new Vue({
  el: '#app',
  render: h => h(App),
  router,        // 使用上vue-router
  store         //使用vuex
})
Vue.use({
  app
})
