<template>
  <div class="container" type="flex" align="center">
    <img class="svg" src="../../../static/icon/LTS_W_Slogan_Logo.svg" alt="logo">
    <el-container type="flex" align="start" class="inputs">
      <label for="user" >用户名</label>
      <input type="text" id="user" placeholder="请输入您的用户名" v-model="user">
      <label for="password">密码</label>
      <input type="password" id="password" placeholder="请输入您的密码" v-model="password">
      <a href="#">忘记密码</a>
    </el-container>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>
<script>
  export  default {
    props: '',
    name: 'login',
    data () {
      return {
        user: '',
        password: ''
      }
    },
    methods: {
      login () {
        console.log(this.user)
      }
    }
  }
</script>
<style lang="less" scoped>
  .container{
    width:500px;
    height:465px;
    margin-top:100px;
    border:1px solid red;
    box-shadow:0 0 50px #d5d5d5;
    border-radius: 10px;
    img.svg{
      display: block;
      width:174px;
      height:61px;
      color:#ce2127;
      margin-top:56px;
      border:1px solid red;
    }
    label,input{
      display: block;
    }
  }
</style>
