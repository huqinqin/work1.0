<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">门店列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增门店</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" :rules="rules" label-position="left">
            <h3>登录信息</h3>
            <el-form-item label="登陆账号" label-width="110px" prop="account" class="form-button" position="relative">
                <el-input v-model="form.account"></el-input>
                <span>注：登陆账号不可填手机号码，如需手机登陆，后续可以自主绑定手机登陆</span>
            </el-form-item>
            <el-form-item label="密码" label-width="110px" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="密码确认" label-width="110px" prop="checkPass">
                <el-input v-model="form.checkPass" type="password"></el-input>
            </el-form-item>

            <h3>详细信息</h3>
            <el-form-item label="门店名称" label-width="110px" prop="companyName">
                <el-input v-model="form.companyName"></el-input>
            </el-form-item>
            <el-form-item label="所在地区"  label-width="110px" props="location">
                <el-cascader :options="locationOptions" v-model="location" @change="changeLocation"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" label-width="110px" class="address">
                <el-input v-model="moreAddress"></el-input>
            </el-form-item>
            <el-form-item label="联系人" label-width="110px" prop="contact">
                <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系手机" label-width="110px" prop="contactMobile">
                <el-input v-model="form.contactMobile"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" label-width="110px" prop="contactPhone">
                <el-input v-model="form.contactPhone"></el-input>
            </el-form-item>
            <el-form-item label="备注" label-width="110px" prop="remark" class="remark">
                <el-input type="textarea" v-model="form.remark"
                          :autosize="{minRows:4}"></el-input>
            </el-form-item>
            <el-form-item label="" label-width="110px">
                <el-button type="primary" @click="submit" v-if="!isSubmiting" >提交</el-button>
                <el-button type="primary" :loading="true" v-else>提交中</el-button>
                <el-button type="error" @click="resetForm('form')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
    import {request} from 'ltsutil'
    import storeService from '@/services/StoreService'
    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                isSubmiting: false,
                location: ['北京市', '辖区', '东城区'],
                moreAddress: '',
                form:{
                    account: '',
                    password: '',
                    checkPass: '',
                    address: '',
                    companyName: '',// 公司名称
                    contact:'',
                    contactMobile: '',
                    contactPhone: '',
                    remark: '',
                    lcCode: '110101000000',
                },
                rules:{
                    checkPass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    open_code: [
                        {required:true,message:'数字与字母组合的八位编码',trigger: 'blur'}
                    ]
                },
                locationOptions: [{
                    value: '浙江省',
                    label: '浙江省',
                    children: [{
                        value: '杭州市',
                        label: '杭州市',
                        children: [{
                            value: '西湖区',
                            label: '西湖区'
                        }, {
                            value: '下城区',
                            label: '下城区'}
                        ]}, {
                        value: '温州市',
                        label: '温州市',
                        children: [{
                            value: '乐清市',
                            label: '乐清市'}
                        ]}
                    ]
                }, {
                    value: '云南省',
                    label: '云南省',
                    children: [{
                        value: '丽江市',
                        label: '丽江市',
                        children: [{
                            value: '古城区',
                            label: '古城区'
                        }, {
                            value: '永胜县',
                            label: '永胜县'}
                        ]}
                    ]
                }]
            }
        },
        methods: {
            resetForm (formName) {
                this.$refs[formName].resetFields()
                this.location = []
                this.moreAddress = ''
            },
            changeLocation(value){
                this.form.address = this.location[0] + this.location[1] + this.location[2]
            },
            submit(){
                let formData = Object.assign({},this.form)
                delete formData.aaattribute
                delete formData.select
                this.isSubmiting = true;
                setTimeout(()=>{
                    this.isSubmiting = false;
                }, 3000)
                // storeService.add(formData).then((data) => {
                //     console.log('success')
                // }, (msg) => {
                //     console.log(msg)
                //     this.$ltsMessage.show({type: 'error', message: msg.error_message})
                // });
            }
        },
        mounted(){
          storeService.getItemId().then((data) => {
            console.log(data)
            this.form.parentBizId = data.data.id
          }, (msg) => {
            console.log(msg)
            this.$ltsMessage.show({type: 'error', message: msg.error_message})
          })
        }
    }
</script>
<style lang="less" scoped>
    .el-form{
        h3{
            font-weight: normal;
            text-align: left;
        }
        .el-form-item{
            margin-bottom: 10px;
            .el-checkbox-group{
                line-height: 20px;
                margin-top: 10px;
            }
            .el-checkbox{
                line-height: 20px;
                margin-left: 10px;
            }
            .el-input{
                width:200px;
                .el-input__inner{
                    height: 30px;
                }
            }
            .el-form-item__error{
                padding-top: 0px;
            }
            .el-textarea{
                width:300px;
            }
            span{
                font-size: 12px;
            }
            .el-select{
                margin-left: 44px;
            }
        }
        .el-form-item.inline{
            display:inline-block;
            margin-right: 10px;
            .el-input{
                width:120px;
            }
        }
        .el-form-item.address{
            .el-input{
                width:390px;
            }
        }
        .el-form-item.remark{
            margin-top: 18px;
        }

    }
</style>
