<template>
    <div class="addMerchants">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">工程商列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增工程商</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="登陆账号" prop="account">
                <el-input v-model="form.account" />
                <span class="help-info">注：登陆账号不可填手机号码，如需手机登陆，后续可以自主绑定手机登陆</span>
            </el-form-item>
            <el-form-item label="手机" prop="contactMobile">
                <el-input v-model="form.contactMobile" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item label="密码确认" prop="checkPass">
                <el-input v-model="form.checkPass" type="password" />
            </el-form-item>
            <el-form-item label="工程商名称" prop="shopName">
                <el-input v-model="form.shopName" style="width: 500px" />
            </el-form-item>
            <el-form-item label="所在地区" prop="location">
                <lts-location v-model="form.location" :labels.sync="locationLabel"/>
            </el-form-item>
            <el-form-item label="详细地址" class="address" prop="address">
                <el-input v-model="form.address" style="width: 700px" />
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
                <el-input v-model="form.contact" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactPhone">
                <el-input v-model="form.contactPhone" />
            </el-form-item>
            <el-form-item label="备注" prop="remark" class="remark">
                <el-input type="textarea" v-model="form.remark" :autosize="{minRows:4}" style="width: 700px" />
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="submit" v-if="!isSubmiting" >提交</el-button>
                <el-button type="primary" :loading="true" v-else>提交中</el-button>
                <el-button type="error" @click="resetForm('form')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {request, commonUtils} from 'ltsutil'
    import {ltsLocation} from 'ui'
    import installerService from '@/services/InstallerService.js'

    export default {
        components: {ltsLocation},
        data() {
            let validatePass = (rule, value, callback) => {
                if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            };
            return {
                isSubmiting: false,
                locationLabel: [],
                form: {
                    account: '',
                    contactMobile: '',
                    password: '',
                    checkPass: '',
                    location: [],
                    shopName: '',
                    address:'',
                    contact: '',
                    contactPhone: '',
                    remark: '',
                    owner: '',
                    partnerName: '',
                },
                rules: {
                    account: [
                        {required: true, message: '请输入账号名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    contactMobile: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号为11位数字', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                        ],
                    checkPass: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    shopName: [
                        {required: true, message: '请输入店铺名称', trigger: 'blur'}
                        ],
                    location: [
                        { required: true, message: '请选择区域', trigger: 'change' }
                    ],
                    contact: [
                        {required: true, message: '请输入联系人', trigger: 'blur'}
                        ],
                    contactPhone: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'}
                        ],
                    address: [
                        {required: true, message: '请输入详细地址', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            resetForm() {
                this.$refs.form.resetFields();
            },
            // 新增工程商提交
            submit() {
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
                        installerService.add(param).then((resp)=>{
                            this.$ltsLoading.show({text:'新增工程商成功，跳转到工程商列表中'});
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
            },
        },
    }
</script>
<style lang="less">
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

