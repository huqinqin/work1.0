<template>
    <div>
        <el-dialog
            title="退款申请"
            :visible.sync="dialogVisible"
            width="800px">
            <div style="margin-top: -20px">
                <el-form label-position="left" size="small" label-width="100px" class="detail-info">
                    <el-form-item label="主订单号">
                        {{orderItem.parent_id}}
                    </el-form-item>
                    <el-form-item label="子订单号">
                        {{orderItem.tid}}
                    </el-form-item>
                    <el-form-item label="工程商">
                        {{installer.name}}
                    </el-form-item>
                    <el-form-item label="联系电话">
                        {{installer.mobile}}
                    </el-form-item>
                    <el-form-item label="商品名称">
                        {{item.item_name}}
                    </el-form-item>
                    <el-form-item label="规格">
                        {{item.spec}}
                    </el-form-item>
                    <el-form-item label="单价">
                        {{item.price | money2str}}
                    </el-form-item>
                    <el-form-item label="数量">
                        {{orderItem.num}}{{item.unit}}
                    </el-form-item>
                    <el-form-item label="小计">
                        {{orderItem.pay_real | money2str}}
                    </el-form-item>
                    <el-form-item label="退款原因">
                        <el-select v-model="refundFrom.reason" placeholder="请选择退款原因">
                            <el-option label="货有破损" value="111"></el-option>
                            <el-option label="其他" value="222"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="退货退款数量">
                        <el-input-number v-model="refundFrom.num" size="small" controls-position="right" :min="1" :max="refundFrom.num"></el-input-number>
                    </el-form-item>
                    <el-form-item label="退货退款金额">
                        <el-input v-model="refundFrom.refund" style="width: 150px">
                            <template slot="append">$</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="refundFrom.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitRefund">提交退货退款</el-button>
                        <el-button @click="dialogVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    /**
     * 根据订单发起退货退款
     * @author Nation
     * @cdate 2018-01-13
     */
    import {dateUtils} from 'ltsutil'
    import reverseService from '@/services/ReverseService'
    export default {
        props: ['dialogVisible', 'orderItem', 'installer', 'item'],
        data() {
            return {
                dialogVisible: false,
                refundFrom:{
                    reason: '',
                    num: 1,
                    refund: 0,
                    remark: ''
                },
            }
        },
        methods: {
            showorderItemItem(orderItem){
                this.dialogVisible = true;
                this.orderItem = orderItem;
            },
            onSubmitRefund(){
                this.$ltsMessage.show({type: 'success', message: "退货退款申请成功"});
            },
        },
        mounted() {
        },
        created() {
        },
    }
</script>
<style lang="less">
    .detail-info {
        label {
            color: #99a9bf;
        }
        .el-form-item {
            margin-bottom: 5px;
        }
    }
</style>
