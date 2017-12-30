import Vue from 'vue'
import Router from 'vue-router'
import MerchantsList from '../components/merchantsList'
import AddMerchants from '../components/addMerchants'
import EditMerchants from '../components/editMerchants'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: MerchantsList
        },
        {
            path: '/add',
            component: AddMerchants
        },
        {
            path: '/list',
            component: MerchantsList
        },
        {
            name: 'edit',
            path: '/edit/:uid',
            component: EditMerchants
        }
    ]
})
