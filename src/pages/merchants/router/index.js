import Vue from 'vue'
import Router from 'vue-router'
import List from '../components/list'
import AddMerchants from '../components/addMerchants'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: List
    },
    {
      path: '/add',
      component: AddMerchants
    },
    {
      path: '/list',
      component: List
    }
  ]
})
