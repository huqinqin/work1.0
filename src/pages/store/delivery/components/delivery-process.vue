<template>
    <el-steps :active="active" simple style="margin-bottom: 20px">
        <el-step title="仓库备货" icon="el-icon-tickets" ></el-step>
        <el-step title="配送入库" icon="el-icon-menu" ></el-step>
        <el-step title="配送发货" icon="el-icon-printer" ></el-step>
    </el-steps>
</template>
<script>
    export default {
        props: ['active'],
        data() {
            return {

            }
        }
    }
</script>
<style lang="less">

</style>
