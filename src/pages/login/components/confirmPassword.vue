<template>
  <div class="confirmPassword" type="flex" align="center">
    <el-row class="header" type="flex" justify="space-between" align="bottom">
      <el-col><img class="svg" src="../../../../static/icon/logo.png" alt="logo"></el-col>
      <el-col><span>找回密码</span></el-col>
    </el-row>

    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" >
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <!--<el-row type="flex" justify="start"><p>新密码</p></el-row>-->
      <!--<el-row>-->
        <!--<el-input placeholder="请输入您的新密码" v-model="user" clearable></el-input>-->
      <!--</el-row>-->
      <!--<el-row type="flex" justify="start"><p>确认密码</p></el-row>-->
      <!--<el-row>-->
        <!--<el-input placeholder="请再次输入您的新密码" v-model="email" clearable></el-input>-->
      <!--</el-row>-->
    </el-form>


    <el-button class="next" type="primary" @click="finish">完成</el-button>
  </div>
</template>
<script>
  export default {
    props: '',
    name: 'confirmPassword',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
        }
      },

    methods: {
      next() {
//        console.log(this.user)
      }
    }
  }
</script>
<style lang="less" scoped>
  a {
    color: inherit;
    text-decoration: none;
  }

  .confirmPassword {
    width: 300px;
    height: 437px;
    margin: 100px auto;
    padding: 0 50px;
    box-shadow: 0 3px 30px #d5d5d5;
    border-radius: 10px;
    img.svg {
      display: block;
      width: 174px;
      height: 61px;
      margin-top: 56px;
    }
    .el-row {
      p {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.7);
        margin-top: 12px;
        margin-bottom: 6px;
        margin-left: 9px;
      }
      a {
        margin: 6px 6px 12px;
        font-size: 14px;
      }
    }
    .el-row.header {
      margin-bottom: 16px;
      span {
        margin-right: -45px;
        font-size: 20px;
      }
    }
    .el-button.next {
      width: 300px;
      height: 40px;
      font-weight: bold;
      font-size: 18px;
      margin-top: 24px;
    }
  }
</style>
