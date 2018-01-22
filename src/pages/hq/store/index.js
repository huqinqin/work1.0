import Lib from '@/common/js/'
import Vue from 'vue'
import App from './index.vue'
import routerView from './router/index'
Vue.config.productionTip = false;
Lib(App, routerView);
