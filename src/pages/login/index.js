import Lib from '@/common/js/login.js'
import Vue from 'vue'
import App from './index.vue'
import Router from 'vue-router'
import Login from './components/login'
import ForgetPassword from './components/forgetPassword'
import ConfirmPassword from './components/confirmPassword'

Vue.config.productionTip = false;
Vue.use(Router);
Lib(App, new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/forgetPassword',
            component: ForgetPassword
        },
        {
            path: '/confirmPassword',
            component: ConfirmPassword
        }
    ]
})
