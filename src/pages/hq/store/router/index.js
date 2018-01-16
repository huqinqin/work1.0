import Vue from 'vue'
import Router from 'vue-router'
import add from '../components/add'
import edit from '../components/edit'
import list from '../components/list'
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
            path: '/edit/:id',
            component: edit
        },
        {
            path: '/list',
            component: list
        }
    ]
})
