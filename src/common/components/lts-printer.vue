<template>
    <div>
        <el-select v-model="printer" placeholder="请选择打印机">
            <el-option
                v-for="item in printerList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: "lts-printer",
        data() {
            return {
                printer: 1,
                printerList: [
                    {
                        value: 1,
                        label: '打印机1'
                    },
                    {
                        value: 2,
                        label: '打印机2'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="less">

</style>
