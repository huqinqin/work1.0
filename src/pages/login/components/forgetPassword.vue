<template>
  <div class="forgetPassword" type="flex" align="center">
    <el-row class="header" type="flex" justify="space-between" align="bottom">
      <el-col><img class="svg" src="../../../../static/icon/logo.png" alt="logo"></el-col>
      <el-col><span>找回密码</span></el-col>
    </el-row>
    <el-row type="flex" justify="start"><p>用户名</p></el-row>
    <el-row><el-input placeholder="请输入您的用户名" v-model="form.user" clearable></el-input></el-row>
    <el-row type="flex" justify="start"><p>邮箱</p></el-row>
    <el-form :model="form" ref="form">
      <el-form-item
        prop="email"
        :rules="[
          { message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]">
        <el-input placeholder="请输入您注册账号时预留的邮箱" v-model="form.email"></el-input>
      </el-form-item>
    </el-form>
    <el-row class="code" type="flex" justify="space-between">
      <el-col><el-input placeholder="请输入验证码"></el-input></el-col>
      <el-col><el-button type="primary" @click="getCode" clearable v-model="form.code">获取验证码</el-button></el-col>
    </el-row>
    <router-link to="/confirmPassword"><el-button class="next" type="primary" @click="next">下一步</el-button></router-link>
  </div>
</template>
<script>
  export default {
    props: '',
    name: 'forgetPassword',
    data () {
      return {
        form: {
          user: '',
          email: '',
          code: ''
        }
      }
    },
    methods: {
      next () {
        console.log(this.form.user)
      },
      getCode () {
        console.log('获取验证码')
      }
    }
  }
</script>
<style lang="less" scoped>
  a{color: inherit;text-decoration: none;}
  .forgetPassword{
    font-family: "Microsoft YaHei";
    width:300px;
    height:480px;
    margin:100px auto;
    padding: 0 50px;
    box-shadow:0 3px 30px #d5d5d5;
    border-radius: 10px;
    img.svg{
      display: block;
      width: 174px;
      height: 61px;
      margin-top: 56px;
    }
    .el-row{
      p{
        font-size: 16px;
        color:rgba(0,0,0,0.7);
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
    .el-row.header{
      margin-bottom: 16px;
      span{
        margin-right: -45px;
        font-size: 20px;
      }
    }
    .el-row.code{
      margin-top: 24px;
      .el-input{
        width:160px;
      }
      .el-button{
        margin-right: -20px;
      }
    }
    .el-button.next{
      width:300px;
      height: 40px;
      font-weight: bold;
      font-size: 18px;
      margin-top: 24px;
    }

  }
</style>
