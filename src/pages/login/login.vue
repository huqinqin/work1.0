<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import ForgetPassword from './components/forgetPassword'
  import ConfirmPassword from './components/confirmPassword'
  import InputForm from './components/inputForm'

  export default {
    name: 'Login',
    components: {InputForm, ForgetPassword, ConfirmPassword}
  }
</script>

<style scoped>
  #app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  }
</style>
