import Vue from 'vue'
import Router from 'vue-router'
import Cart from '../components/cart'
import Order from '../components/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cart',
      name: '/cart',
      component: Cart
    },
    {
      path: '/order',
      name: '/order',
      component: Order
    },
    {
      path: '/order',
      name: '/order',
      component: Order
    }
  ]
})
