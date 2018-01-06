import Lib from '@/common/js/login.js'
import Vue from 'vue'
import App from '@/pages/login/login.vue'
import routerView from './router'

Vue.config.productionTip = false

const RouterView = routerView ? routerView : ''
Lib(App, RouterView)
