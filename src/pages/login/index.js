import Lib from '@/common/js/login.js'
import Vue from 'vue'
import App from './index.vue'
import routerView from './router'

Vue.config.productionTip = false
Lib(App, routerView)
