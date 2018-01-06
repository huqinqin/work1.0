import Vue from 'vue'
import Router from 'vue-router'
import RepertoryList from '../components/repertoryList'
import RepertoryManage from '../components/repertoryManage'
import RepertoryWarning from '../components/repertoryWarning'
import RepertoryCheck from '../components/repertoryCheck'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: "manage",
            component: RepertoryManage
        },
        {
            path: '/list',
            name: "list",
            component: RepertoryList
        },
        {
            path: '/manage',
            name: 'manage',
            component: RepertoryManage
        },
        {
            path: '/warning',
            name: 'warning',
            component: RepertoryWarning
        },
        {
            path: '/check',
            name: 'check',
            component: RepertoryCheck
        }
    ]
})
