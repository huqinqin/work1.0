import Vue from 'vue'
import Router from 'vue-router'
import RepertoryList from '../components/repertoryList'
import RepertoryManage from '../components/repertoryManage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: RepertoryList
        },
        {
            path: '/manage',
            component: RepertoryManage
        },
        {
            path: '/list',
            component: RepertoryList
        }
    ]
})
