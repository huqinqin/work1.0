import Lib from '@/common/js/'
import App from '@/pages/merchants/merchants.vue'
import routerView from './router'
import Vue from 'vue'

Vue.config.productionTip = false

const RouterView = routerView ? routerView : ''
Lib(App, RouterView)
