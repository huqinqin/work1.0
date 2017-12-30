<template>
  <div class="forgetPassword" type="flex" align="center">
    <el-row class="header" type="flex" justify="space-between" align="bottom">
      <el-col><img class="svg" src="../../../../static/icon/logo.png" alt="logo"></el-col>
      <el-col><span>找回密码</span></el-col>
    </el-row>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item  label="用户名" prop="name">
        <el-input placeholder="请输入您的用户名" v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item  label="邮箱" prop="email">
        <el-input placeholder="请输入您注册账号时预留的邮箱" v-model="form.email" clearable></el-input>
      </el-form-item>
      <el-row class="code" type="flex" justify="space-between">
        <el-col><el-input placeholder="请输入验证码" v-model="form.code"></el-input></el-col>
        <el-col><el-button type="primary" @click="getCode">获取验证码</el-button></el-col>
      </el-row>
    </el-form>
    <router-link to="/confirmPassword"><el-button class="next" type="primary" @click="next">下一步</el-button></router-link>
  </div>
</template>
<script>
  export default {
    props: {},
    name: 'forgetPassword',
    data () {
      return {
        form:{
          name: '',
          email: '',
          code:''
        },
        rules:{
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '6个数字', trigger: 'blur' }
          ]
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
      margin-top: 40px;
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
