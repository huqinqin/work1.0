<template>
  <div class="confirmPassword" type="flex" align="center">
    <el-row class="header" type="flex" justify="space-between" align="bottom">
      <el-col><img class="svg" src="../../../../static/icon/logo.png" alt="logo"></el-col>
      <el-col><span>找回密码</span></el-col>
    </el-row>




    <el-row type="flex" justify="start"><p>新密码</p></el-row>
    <el-row><el-input placeholder="请输入您的新密码" v-model="user" clearable></el-input></el-row>
    <el-row type="flex" justify="start"><p>确认密码</p></el-row>
    <el-row><el-input placeholder="请再次输入您的新密码" v-model="email" clearable></el-input></el-row>



    <el-button class="next" type="primary" @click="finish">完成</el-button>
  </div>
</template>
<script>
  export default {
    props: '',
    name: 'confirmPassword',
    data () {
      return {
        user: '',
        email: ''
      }
    },
    methods: {
      next () {
        console.log(this.user)
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
    .el-row{
      p{
        font-size: 16px;
        color:rgba(0,0,0,0.7);
        margin-top: 12px;
        margin-bottom: 6px;
        margin-left: 9px;
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
    .el-button.next{
      width:300px;
      height: 40px;
      font-weight: bold;
      font-size: 18px;
      margin-top: 24px;
    }
  }
</style>
