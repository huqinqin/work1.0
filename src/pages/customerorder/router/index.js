import Vue from 'vue'
import Router from 'vue-router'
import Cart from '../components/cart'
import Order from '../components/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/order',
      component: Order
    }
  ]
})
