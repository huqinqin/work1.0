import Vue from 'vue'
import Router from 'vue-router'
import Cart from '../components/cart.vue'
import Order from '../components/order.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/customerorder/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/customerorder/order',
      name: 'order',
      component: Order
    }
  ]
})
