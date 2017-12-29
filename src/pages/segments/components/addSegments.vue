<template>
    <div class="segments" type="flex" align="center">
        <el-form ref="form" :model="form" label-position="left">
            <el-form-item label="市场信息" class="title"></el-form-item>
            <el-form-item label="市场名称" label-width="100px" prop="bizName">
                <el-input v-model="form.bizName" ></el-input>
            </el-form-item>
            <el-form-item label="市场英文名称" label-width="100px" prop="bizEname">
                <el-input v-model="form.bizEname" ></el-input>
            </el-form-item>
            <el-form-item label="特性" label-width="100px" prop="attribute" >
                <el-checkbox-group v-model="form.attribute">
                    <el-checkbox label="批发"></el-checkbox>
                    <el-checkbox label="零售"></el-checkbox>
                    <el-checkbox label="派收"></el-checkbox>
                    <el-checkbox label=""></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                    <el-checkbox label="分销"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>





        </el-form>
    </div>
</template>
<script>

    export default {
        props: '',
        name: 'addSegments',
        data() {
            return {
                form:{
                    bizName: '',
                    bizEname: '',

                }
            }
        },
        methods: {

        },
        mounted(){

        }
    }
</script>
<style lang="less" scoped>

</style>
