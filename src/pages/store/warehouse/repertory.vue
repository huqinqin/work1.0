<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="库存管理" name="manage"></el-tab-pane>
            <el-tab-pane label="库存明细" name="list"></el-tab-pane>
            <el-tab-pane label="盘亏盘盈" name="check"></el-tab-pane>
            <el-tab-pane label="库存预警" name="warning"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'manage'
            }
        },
        methods: {
            handleClick(tab) {
                this.$router.push({
                    name: tab.name, params: {}
                })
            },
        },
    }
</script>

<style scoped>

</style>
