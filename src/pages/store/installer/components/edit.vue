<template>
    <div class="addMerchants">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">工程商列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑工程商</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left">
            <h3>登录信息</h3>
            <el-form-item label="登陆账号">
                {{detail.shop_name}}
            </el-form-item>
            <el-form-item label="手机">
                {{detail.user.mobile}}
            </el-form-item>

            <h3>详细信息</h3>
            <el-form-item label="工程商名称" prop="installerName">
                <el-input v-model="form.installerName" style="width: 500px" />
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
            <el-form-item label="">
                <el-button type="primary" @click="submit" v-if="!isSubmiting" >保存</el-button>
                <el-button type="primary" :loading="true" v-else>保存中</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {request, commonUtils} from 'ltsutil'
    import {ltsLocation} from 'ui'
    import ValidatorConfig from 'config/ValidatorConfig'
    import installerService from '@/services/InstallerService'

    export default {
        components: {ltsLocation},
        data() {
            return {
                isSubmiting: false,
                detail:{user:{}},
                locationLabel: [],
                form: {
                    contactMobile: '',
                    installerName: '',
                    location: [],
                    address:'',
                    contact: '',
                    contactPhone: '',
                },
                rules: {
                    contactMobile: ValidatorConfig.mobile,
                    installerName: ValidatorConfig.storeName,
                    location: ValidatorConfig.location,
                    address: ValidatorConfig.address,
                    contact: ValidatorConfig.contact,
                    contactPhone: ValidatorConfig.phone,
                }
            }
        },
        methods: {
            // 新增工程商提交
            submit() {
                this.isSubmiting = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let param = {
                            uid: this.detail.uid,
                            installer_name : this.form.installerName,
                            address : this.locationLabel[0] + ' ' + this.locationLabel[1] + ' ' + this.form.address,
                            lc_code : this.form.location[1],
                            contact : this.form.contact,
                            contact_phone : this.form.contactPhone,
                            contact_mobile : this.form.contactMobile,
                        };
                        installerService.update(param).then((resp)=>{
                            this.$ltsLoading.show({text:'编辑工程商成功，跳转到工程商列表中'});
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
            getDetail(){
                installerService.get(this.detail.id).then((resp)=>{
                    this.detail = resp.data;

                    let location = [];
                    location.push(this.detail.lc_code.substr(0, 2) + "0000");
                    location.push(this.detail.lc_code.substr(0, 4) + "00");

                    this.form.installerName = this.detail.shop_name;
                    this.form.location = location;
                    this.form.address = this.detail.spot.detail_address;
                    this.form.contact = this.detail.contact;
                    this.form.contactPhone = this.detail.contact_phone;
                },(error)=>{

                });
            },
        },
        mounted(){
            this.detail.id = this.$route.params.id;
            this.getDetail();
        }
    }
</script>
<style lang="less">
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

