<template>
    <div>
        <el-card class="box-card">
            <h4>网点名称：{{detail.spot_name}}</h4>
            <h4>联系人：{{detail.owner_name}}</h4>
            <h4>联系电话：{{detail.owner_mobile}}</h4>
            <h4>备货时间：{{detail.to_time | timestamp2str}}</h4>
            <div>备注：{{detail.remark}}</div>
        </el-card>
        <el-table :detail="detail.orders" show-summary @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" label=""/>
            <el-table-column type="index" label="序号"/>
            <el-table-column prop="item_remark_object.item_name" label="商品"></el-table-column>
            <el-table-column prop="spec" label="规格"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="real_num" label="数量(缺)"></el-table-column>
            <el-table-column label="单价">
                <template slot-scope="scope">{{scope.row.item_remark_object.price_real | money2str}}</template>
            </el-table-column>
            <el-table-column label="应付/实付">
                <template slot-scope="scope">{{scope.row.real_pay | money2str}}</template>
            </el-table-column>
            <el-table-column label="优惠">
                <template slot-scope="scope">{{scope.row.item_remark_object.discount | money2str}}</template>
            </el-table-column>
            <el-table-column label="状态">未备货</el-table-column>
            <el-table-column prop="item_remark_object.sinr" label="条码">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        components: {
        },
        data() {
            return {
                detail: {
                    orders: []
                },
                multipleSelection: []
            }
        },
        mounted(){
        },
        methods: {
            batchOpt(){
                console.log(this.multipleSelection)
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },
            confirmWarehousing(item) {
                console.log(item)
            }
        }
    }
</script>
<style lang="less">

</style>
