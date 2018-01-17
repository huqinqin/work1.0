import Vue from 'vue'
import Router from 'vue-router'
import list from '../components/list'
import add from '../components/add'
import edit from '../components/edit'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: list
        },
        {
            path: '/add',
            component: add
        },
        {
            path: '/list',
            component: list
        },
        {
            name: 'edit',
            path: '/edit/:uid',
            component: edit
        }
    ]
})
