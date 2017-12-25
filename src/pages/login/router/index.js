import Vue from 'vue'
import Router from 'vue-router'
import Login from '../login'
import InputForm from '../components/inputForm'
import ForgetPassword from '../components/forgetPassword'
import ConfirmPassword from '../components/confirmPassword'

Vue.use(Router)

export default new Router({
  hashbang: false,
  routes: [
    {
      path: '/',
      component: InputForm
    },
    {
      path: '/forgetPassword',
      component: ForgetPassword
    },
    {
      path: '/confirmPassword',
      component: ConfirmPassword
    }
  ]

})
