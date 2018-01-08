import Vue from 'vue'
import Router from 'vue-router'
import selectCategory from '../components/selectCategory'
import addSpuInfo from '../components/addSpuInfo'
import addSpuSpec from '../components/addSpuSpec'
import productList from '../components/productList'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/productList',
      name : 'productList',
      component: productList
    },
    {
      path: '/',
      component: selectCategory
    },
    {
      path: '/selectCategory',
      name : 'selectCategory',
      component: selectCategory
    },
    {
      path: '/addSpuInfo',
      name : 'addSpuInfo',
      component: addSpuInfo
    },
    {
      path: '/addSpuSpec',
      name : 'addSpuSpec',
      component: addSpuSpec
    }
  ]
})
