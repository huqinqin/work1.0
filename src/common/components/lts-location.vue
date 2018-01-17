<template>
    <el-cascader :options="locationOptions" v-model="location" class="lts-location" expand-trigger="hover" @change="changeHandler"/>
</template>

<script>
    /**
     * 行政区划联动选择器
     * @Author Nation
     * @cdate 2018-01-17 16:08
     */
    import {commonUtils} from 'ltsutil'
    import LocationConfig from 'config/LocationConfig'
    export default {
        name: 'lts-location',
        props: {
            value: Array,
            labels: Array
        },
        data() {
            return {
                location: [],
                locationOptions: LocationConfig
            }
        },
        methods:{
            changeHandler(newVal = []){
                let labelArray = commonUtils.getCascaderFullLabelByValue(LocationConfig, newVal);
                this.$emit('update:labels', labelArray);
            }
        },
        watch:{
            value(newVal){
                this.location = newVal;
            },
            location(newVal){
                this.$emit('input', newVal);
            }
        }
    }
</script>
<style scoped lang="less">
.lts-location{
    width: 350px;
    /deep/ .el-input {
        width: 100% !important;
    }
}
</style>

