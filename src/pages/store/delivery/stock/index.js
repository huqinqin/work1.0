import Lib from '@/common/js/'
import App from './index.vue'
import Vue from 'vue'
import Router from 'vue-router'
import stock from './components/stock'

Vue.use(Router);
Vue.config.productionTip = false;
Lib(App, new Router({
    routes: [
        {
            path: '/',
            component: stock
        }
    ]
}));
