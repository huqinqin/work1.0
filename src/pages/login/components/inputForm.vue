<template>
  <div class="login" type="flex" align="center">
    <el-row><img class="svg" src="../../../../static/icon/logo.png" alt="logo"></el-row>
    <el-row type="flex" justify="start"><p>用户名</p></el-row>
    <el-row><el-input placeholder="请输入您的用户名" v-model="user" clearable></el-input></el-row>
    <el-row type="flex" justify="start"><p>密码</p></el-row>
    <el-row><el-input type="password" placeholder="请输入您的密码" v-model="password" clearable></el-input></el-row>
    <el-row type="flex" justify="end"><router-link to="/forgetPassword">忘记密码</router-link></el-row>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>
<script>
  export default {
    props: '',
    name: 'inputForm',
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
  a{color: inherit;text-decoration: none;}
  .login{
    width:300px;
    height:465px;
    margin:100px auto;
    padding: 0 50px;
    box-shadow: 0 3px 30px #d5d5d5;
    border-radius: 10px;
    img.svg{
      display: block;
      width: 174px;
      height: 61px;
      margin-top:78px;
      margin-bottom: 16px;
    }
    .el-row{
      p{
        font-size: 16px;
        color:rgba(0,0,0,0.7);
        font-family: "Microsoft YaHei";
        margin-top: 12px;
        margin-bottom: 6px;
        margin-left: 9px;
        font-weight:normal;
      }
      a{
        margin: 6px 6px 12px;
        font-size: 14px;
      }
    }
    .el-button{
      width:300px;
      height: 40px;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 78px;
    }
  }
</style>
