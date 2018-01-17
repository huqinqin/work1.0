<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">门店列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑门店</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-position="left">
            <el-form-item label="市场名称" label-width="110px" prop="bizName">
                <el-input v-model="form.bizName"></el-input>
            </el-form-item>
            <el-form-item label="市场英文名称" label-width="110px" prop="bizEname">
                <el-input v-model="form.bizEname"></el-input>
            </el-form-item>
            <el-form-item label="开放码" label-width="110px">
                <span>{{openCode}}</span>
            </el-form-item>
            <el-form-item label="" label-width="110px">
                <el-button type="primary" @click="submit">登记</el-button>
                <el-button type="error" @click="resetForm('form')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {request, commonUtils} from 'ltsutil'
    import {ltsLocation} from 'ui'
    import storeService from '@/services/StoreService.js'

    export default {
        components: {ltsLocation},
        data() {
            return {
                isSubmiting: false,
                openCode: 'LTS AAA',
                form: {
                    bizName: '',
                    bizEname: '',
                    aaattribute: [],
                    attribute: '',
                    erea: '',
                    limit: true,
                    state: '内测',
                    bizStatus: '0',
                    id: 3076
                },
                api: {
                    method: '/market/update',
                    bizparams: {}
                },
            }
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            submit() {
                let formData = Object.assign({}, this.form)
                storeService.edit(formData).then((data) => {
                    console.log('success')
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
        },
        created() {
            this.form.id = this.$route.params.id
            console.log(this.form.id)
        }
    }
</script>

<style scoped lang="less">
    .el-form-item {
        margin-bottom: 10px;
        .el-checkbox-group {
            line-height: 20px;
            margin-top: 10px;
        }
        .el-checkbox {
            line-height: 20px;
            margin-left: 10px;
        }
        .el-input {
            width: 200px;
            .el-input__inner {
                height: 30px;
            }
        }
        .el-select {
            margin-left: 42px;
        }
    }

</style>
