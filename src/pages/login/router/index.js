import Vue from 'vue'
import Router from 'vue-router'
import Login from '../login'
import InputForm from '../components/inputForm'
import ForgetPassword from '../components/forgetPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: InputForm
    },
    {
      path: '/forgetPassword',
      component: ForgetPassword
    }
  ]

})
