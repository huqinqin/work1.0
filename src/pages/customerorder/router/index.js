import Vue from 'vue'
import Router from 'vue-router'
import Cart from '../components/cart.vue'
import beforePay from '../components/beforePay.vue'
import settle from '../components/settle.vue'
import finish from '../components/finish.vue'
import order from '../components/order.vue'
Vue.use(Router)
export default new Router({
  routes: [
      {
          path: '/',
          name: 'order',
          component: order
      },
      {
            path: '/cart',
            name: 'cart',
            component: Cart
      },
      {
            path: '/settle',
            name: 'settle',
            component: settle
      },
      {
            path: '/beforePay',
            name: 'beforePay',
            component: beforePay
      },
      {
          path: '/finish',
          name: 'finish',
          component: finish
      }
  ]
})
