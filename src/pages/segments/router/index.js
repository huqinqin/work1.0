import Vue from 'vue'
import Router from 'vue-router'
import AddSegments from '../components/addSegments'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: AddSegments
    },
    {
      path: '/add',
      component: AddSegments
    }
  ]
})
