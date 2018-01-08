import Vue from 'vue'
import Router from 'vue-router'
import RepertoryList from '../components/repertoryList'
import RepertoryManage from '../components/repertoryManage'
import RepertoryWarning from '../components/repertoryWarning'
import RepertoryCheck from '../components/repertoryCheck'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/repertory',
            component: RepertoryManage
        },
        {
            path: '/repertory/list',
            name: "list",
            component: RepertoryList
        },
        {
            path: '/repertory/manage',
            name: 'manage',
            component: RepertoryManage
        },
        {
            path: '/repertory/warning',
            name: 'warning',
            component: RepertoryWarning
        },
        {
            path: '/repertory/check',
            name: 'check',
            component: RepertoryCheck
        }
    ]
})
