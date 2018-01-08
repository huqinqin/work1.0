import Vue from 'vue'
import Router from 'vue-router'
import goodsList from '../components/goodsList'
import addGoods from '../components/addGoods'
import editGoods from '../components/editGoods'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name : 'goodsList',
      component: goodsList
    },
    {
      path: '/addGoods',
      name : 'addGoods',
      component: addGoods
    },
    {
      path: '/editGoods/:id',
      name : 'editGoods',
      component: editGoods
    }
  ]
})
