import Lib from '@/common/js/'
import App from './incar.vue'
import Vue from 'vue'
import Router from 'vue-router'
import incar from './components/incar'

Vue.config.productionTip = false;
Vue.use(Router)
Lib(App, new Router({
    routes: [
        {
            path: '/',
            component: incar
        }
    ]
}));


