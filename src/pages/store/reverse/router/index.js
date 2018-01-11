import Vue from 'vue'
import Router from 'vue-router'
import list from '../components/list'
import detail from '../components/detail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: list
        },
        {
            path: '/list',
            component: list
        },
        {
            path: '/detail/:id',
            component: detail
        }
    ]
})
