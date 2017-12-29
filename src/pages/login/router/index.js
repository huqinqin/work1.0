import Vue from 'vue'
import Router from 'vue-router'
import InputForm from '../components/inputForm'
import ForgetPassword from '../components/forgetPassword'
import ConfirmPassword from '../components/confirmPassword'

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
    },
    {
      path: '/confirmPassword',
      component: ConfirmPassword
    }
  ]
})
