<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">门店列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增门店</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="left">
            <h3>登录信息</h3>
            <el-form-item label="登陆账号" prop="account" class="form-button" position="relative">
                <el-input v-model="form.account" />
                <span class="help-info">注：登陆账号不可填手机号码，如需手机登陆，后续可以自主绑定手机登陆</span>
            </el-form-item>
            <el-form-item label="密码"  prop="password">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item label="密码确认" prop="checkPass">
                <el-input v-model="form.checkPass" type="password" />
            </el-form-item>

            <h3>详细信息</h3>
            <el-form-item label="门店名称" prop="storeName" style="width: 500px">
                <el-input v-model="form.storeName" />
            </el-form-item>
            <el-form-item label="所在地区" prop="location">
                <lts-location v-model="form.location" :labels.sync="locationLabel" />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" style="width: 700px" />
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
                <el-input v-model="form.contact" />
            </el-form-item>
            <el-form-item label="联系手机" prop="contactMobile">
                <el-input v-model="form.contactMobile" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactPhone">
                <el-input v-model="form.contactPhone" />
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="submit" v-if="!isSubmiting" >提交</el-button>
                <el-button type="primary" :loading="true" v-else>提交中</el-button>
                <el-button type="error" @click="resetForm">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {request, commonUtils} from 'ltsutil'
    import {ltsLocation} from 'ui'
    import ValidatorConfig from 'config/ValidatorConfig'
    import storeService from '@/services/StoreService'
    export default {
        components: {ltsLocation},
        data() {
            return {
                isSubmiting: false,
                locationLabel: [],
                form:{
                    account: '',
                    password: '',
                    checkPass: '',
                    storeName: '',
                    location: [],
                    address: '',
                    contact:'',
                    contactMobile: '',
                    contactPhone: '',
                },
                rules:{
                    account: ValidatorConfig.account,
                    password: ValidatorConfig.password,
                    checkPass: ValidatorConfig.passwordRepeat((rule, value, callback)=>{
                        ValidatorConfig.checkPasswordRepeat(this.form.password, value, callback)
                    }),
                    location: ValidatorConfig.location,
                    storeName: ValidatorConfig.storeName,
                    address: ValidatorConfig.address,
                    contact: ValidatorConfig.contact,
                    contactMobile: ValidatorConfig.mobile,
                    contactPhone: ValidatorConfig.phone,
                },
            }
        },
        methods: {
            resetForm () {
                this.$refs.form.resetFields();
            },
            submit(){
                this.isSubmiting = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let param = {
                            account : this.form.account,
                            password : this.form.password,
                            store_name : this.form.storeName,
                            address : this.locationLabel[0] + this.locationLabel[1] + this.locationLabel[2] + this.form.address,
                            lc_code : this.form.location[2],
                            contact : this.form.contact,
                            contact_phone : this.form.contactPhone,
                            contact_mobile : this.form.contactMobile,
                        };
                        storeService.add(param).then((resp)=>{
                            this.$ltsLoading.show({text:'新增门店成功，跳转到门店列表中'});
                            setTimeout(()=>{
                                this.$router.push({path: '/'});
                                this.$ltsLoading.close();
                            }, 1000);
                        },(error) => {
                            this.isSubmiting = false;
                            this.$message({
                                showClose: true,
                                message: error.error_message,
                                type: 'error',
                                duration: 0
                            });
                        });
                    } else {
                        this.isSubmiting = false;
                    }
                });
            }
        },
    }
</script>
<style lang="less" scoped>
    .help-info {
        color: #909399;
        font-size: 12px;
    }
    .el-form{
        h3{
            font-weight: normal;
            text-align: left;
        }
        .el-form-item {
            .el-input {
                width: 200px;
            }
        }
    }
</style>
