<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">工程商列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增工程商</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" :rules="rules" label-position="left">


        </el-form>
    </div>
</template>

<script>
    import {request} from 'ltsutil'
    import {ltsLocation} from 'ui'
    import installerService from '@/services/InstallerService'

    export default {
        components: {ltsLocation},
        data() {
            return {
                isSubmiting: false,
            }
        },
        methods: {

        },
    }
</script>

<style lang="less">

</style>
