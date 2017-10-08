import Vue from 'vue'
import Router from 'vue-router'
import viewMain from '@/components/view-main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: viewMain
    }
  ]
})
