import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import VueResource from 'vue-resource'
import Layout from 'layout'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(VueResource)
Vue.config.lang = 'cn'
Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: Vue.config.lang,    // 语言标识
  messages: {
    // 中文语言包
    cn: require('@/lang/cn').default,
    en: require('@/lang/en').default
  }
})
export default function(App,routerView){
  Layout.components = {'lts-content':App};
  new Vue({
    el: '#app',
    i18n:i18n,
    template: '<Layout/>',
    components: { Layout }
  })
}
