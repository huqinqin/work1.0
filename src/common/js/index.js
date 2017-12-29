import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import VueResource from 'vue-resource'
import Router from 'vue-router'

import Layout from 'layout'
import 'element-ui/lib/theme-chalk/index.css'
import Loading from '@/common/components/lts-loading'
import Message from '@/common/components/lts-message'
import MessageBox from '@/common/components/lts-messageBox'

Vue.use(ElementUI)
Vue.use(VueI18n)

Vue.prototype.$ltsLoading = Loading
Vue.prototype.$ltsMessage = Message
Vue.prototype.$ltsMessageBox = MessageBox

Vue.config.lang = 'en'
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: Vue.config.lang,    // 语言标识
  messages: {
    // 中文语言包
    cn: require('@/lang/cn').default,
    en: require('@/lang/en').default
  }
})

export default function (App, router = new Router()) {
  Layout.components = {'lts-content': App}
  new Vue({
    el: '#app',
    i18n: i18n,
    Loading: Loading,
    Message: Message,
    router,
    template: '<Layout/>',
    components: { Layout }
  })
}
