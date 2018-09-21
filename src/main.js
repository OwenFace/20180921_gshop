/*
* 入口js
* */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

let app = new Vue({
  el: '#app',
  render: h => h(App),
  router
})
Vue.use({
  app
})
