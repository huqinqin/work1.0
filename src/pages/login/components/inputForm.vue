<template>
    <div class="login" type="flex" align="center">
        <el-form :model="form" status-icon :rules="rules" ref="form">
            <el-row><img class="svg" src="../../../../static/icon/logo.png" alt="logo"></el-row>
            <el-form-item label="用户名" prop="name">
                <el-input placeholder="请输入您的用户名" type="text" v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入您的密码" type="password" v-model="form.password" clearable></el-input>
            </el-form-item>
            <el-row type="flex" justify="end">
                <router-link to="/forgetPassword">忘记密码</router-link>
            </el-row>
            <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form>
    </div>
</template>
<script>
    import userService from '@/services/UserService'
    import store from 'util'
    import session from '@/library/Session'

    export default {
        props: {},
        name: 'inputForm',
        data() {
            return {
                form: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    store.setItem('account', this.form.name);
                    if (valid) {
                        userService.login(this.form.name, this.form.password).then( (resp) =>{
                            this.$ltsLoading.show({text: "登录成功跳转中"});
                            session.login(resp.data);
                        }, (err) => {
                            this.$ltsMessage.show({type: "error", message: err.errorMessage});
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted(){
            this.form.name = store.getItem('account');
        }
    }
</script>
<style lang="less" scoped>
    .el-input:focus {
        background: red;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    .login {
        width: 300px;
        height: 465px;
        margin: 100px auto;
        padding: 0 50px;
        box-shadow: 0 3px 30px #d5d5d5;
        border-radius: 10px;
        img.svg {
            display: block;
            width: 174px;
            height: 61px;
            margin-top: 78px;
            margin-bottom: 16px;
        }
        .el-row {
            p {
                font-size: 16px;
                color: rgba(0, 0, 0, 0.7);
                font-family: "Microsoft YaHei";
                margin-top: 12px;
                margin-bottom: 6px;
                margin-left: 9px;
                font-weight: normal;
            }
            a {
                margin: 6px 6px 12px;
                font-size: 14px;
            }
        }
        .el-button {
            width: 300px;
            height: 40px;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 78px;
        }
    }
</style>
