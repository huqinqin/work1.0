import Vue from 'vue'
import Router from 'vue-router'
import TradeReverse from '../components/tradeReverse'

Vue.use(Router)

export default new Router({
  routes: [
    //退款管理
    {
      path     : '/tradeeverse',
      component: TradeReverse
    }
  ]
})
