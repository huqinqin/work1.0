import Vue from 'vue'
import Router from 'vue-router'
import selectCategory from '../components/selectCategory'
import addSpuInfo from '../components/addSpuInfo'
import addSpuSpec from '../components/addSpuSpec'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
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
