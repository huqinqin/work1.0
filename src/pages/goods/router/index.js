import Vue from 'vue'
import Router from 'vue-router'
import goodsList from '../components/goodsList'
import addGoods from '../components/addGoods'
import editGoods from '../components/editGoods'
import selectCategory from '../components/selectCategory'
import addSpuInfo from '../components/addSpuInfo'
import addSpuSpec from '../components/addSpuSpec'
import productList from '../components/productList'
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
        path: '/selectCategory',
        name : 'selectCategory',
        component: selectCategory
    },
    {
        path: '/editGoods/:id',
        name : 'editGoods',
        component: editGoods
    },
    {
        path: '/addSpuSpec',
        name : 'addSpuSpec',
        component: addSpuSpec
    },
    {
        path: '/addSpuInfo',
        name : 'addSpuInfo',
        component: addSpuInfo
    }
  ]
})
