import Lib from '@/common/js/'
import Vue from 'vue'
import App from '@/pages/customerorder/customerorder.vue'
import routerView from './router'

Vue.config.productionTip = false

Lib(App, routerView)
