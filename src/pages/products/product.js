import Lib from '@/common/js/'
import App from '@/pages/products/product.vue'
import routerView from '@/pages/products/router/index.js'
const RouterView = routerView ? routerView : ''
Lib(App, RouterView)
