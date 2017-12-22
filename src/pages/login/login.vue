<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import ForgetPassword from './components/forgetPassword'
  import InputForm from './components/inputForm'
  export default {
    name: 'Login',
    components: { InputForm, ForgetPassword }
  }
</script>

<style>
  #app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  }
</style>
