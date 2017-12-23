<template>
  <div class="confirmPassword" type="flex" align="center">
    <el-row class="header" type="flex" justify="space-between" align="bottom">
      <el-col><img class="svg" src="../../../../static/icon/logo.png" alt="logo"></el-col>
      <el-col><span>找回密码</span></el-col>
    </el-row>
    <el-form :model="form" status-icon :rules="rules" ref="form">
      <el-form-item prop="pass">
        <el-row type="flex" justify="start"><p>新密码</p></el-row>
        <el-input type="password" v-model="form.pass" auto-complete="off" placeholder="请输入您的密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-row type="flex" justify="start"><p>确认密码</p></el-row>
        <el-input type="password" v-model="form.checkPass" auto-complete="off" placeholder="请再次输入您的密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="finish" type="primary" @click="submit('form')">完成</el-button>
  </div>
</template>
<script>
  export default {
    props: '',
    name: 'confirmPassword',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
          } else {
            console.log('error submit!!')
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  a{color: inherit;text-decoration: none;}
  .confirmPassword{
    width:300px;
    height:437px;
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
    .el-row.header{
      margin-bottom: 30px;
      span{
        margin-right: -45px;
        font-size: 20px;
      }
    }
    .el-form{
      .el-form-item{
        margin-bottom: 12px;
      }
      p{
        font-size: 16px;
        color:rgba(0,0,0,0.7);
        margin-top: 12px;
        margin-bottom: 12px;
        margin-left: 9px;
        line-height: 16px;
      }
    }
    .el-button.finish{
      margin-top: 12px;
      width:300px;
    }
  }
</style>
