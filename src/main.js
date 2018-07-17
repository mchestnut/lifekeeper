import datalist from './polyfills/datalist.js'

import Vue from 'vue'
import App from './App'
import directives from './directives'
import router from './router'
import store from './store'
import touch from './touch'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  touch,
  render: h => h(App)
})
