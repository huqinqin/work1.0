<template>
    <div>
        <el-dialog
            title="退款申请"
            :visible.sync="show"
            width="800px">
            <div style="margin-top: -20px">
                <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon inline-message size="small" label-width="110px" class="detail-info">
                    <el-form-item label="订单号">
                        {{orderItem.parent_id}}
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
                        {{orderItem.price_real | money2str}}
                    </el-form-item>
                    <el-form-item label="数量">
                        {{orderItem.num}}{{item.unit}}
                    </el-form-item>
                    <el-form-item label="小计">
                        {{orderItem.pay_real | money2str}}
                    </el-form-item>
                    <el-form-item label="退款原因" prop="reason">
                        <el-select v-model="form.reason" placeholder="请选择退款原因">
                            <el-option
                                v-for="item in reasonList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="退货退款数量" prop="num">
                        <el-input-number v-model.number="form.num" size="small" controls-position="right" :min="1" :max="orderItem.num" />
                    </el-form-item>
                    <el-form-item label="退货退款金额" prop="refund">
                        <el-input v-model="form.refund" style="width: 150px">
                            <template slot="append">$</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="form.remark" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitRefund">提交退货退款</el-button>
                        <el-button @click="show = false">取消</el-button>
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
        name: 'reverse-apply',
        props: {
            visible: Boolean,
            orderItem: Object,
            installer: Object,
            item: Object,
        },
        data() {
            return {
                show: this.visible,
                form:{
                    reason: '',
                    num: 1,
                    refund: 0,
                    remark: ''
                },
                rules: {
                    reason: [
                        {required: true, message: '请选择退货退款原因', trigger: 'change'},
                    ],
                    num: [
                        {required: true, message: '请输入退货退款数量', trigger: 'blur'},
                    ],
                    refund: [
                        {required: true, message: '请输入退款金额', trigger: 'blur'},
                    ],
                    remark: [
                        {min: 5, max: 500, message: '备注长度在 5 到 500 个字符', trigger: 'blur'}
                    ],
                },
                reasonList: [
                    {
                        value: 'REFUND_STOCK_OUT',
                        label: '未收到货 - 要求退'
                    },
                    {
                        value: 'REFUND_ERROR_NUM',
                        label: '已收到货 - 数量不对'
                    },
                    {
                        value: 'REFUND_BAD_PACKING',
                        label: '已收到货 - 包装缺损'
                    },
                    {
                        value: 'REFUND_BAD_QUALITY',
                        label: '已收到货 - 商品质量问题'
                    },
                    {
                        value: 'REFUND_BAD_CDATE',
                        label: '已收到货 - 生产日期不好'
                    },
                    {
                        value: 'REFUND_ERROR_PROPS',
                        label: '已收到货 - 口味/规格不对'
                    },
                    {
                        value: 'REFUND_CONSULT',
                        label: '协商一致退款'
                    },
                    {
                        value: 'REFUND_OTHER',
                        label: '其它原因'
                    }
                ]
            }
        },
        methods: {
            onSubmitRefund(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let stock_item = {},
                            return_item = {
                                num : this.form.num,
                                unit : this.item.unit,
                                refund : this.form.refund * 100,
                            },
                            bad_item = {
                                // num : 0,
                                // unit : this.item.unit,
                                // refund : 0,
                            };

                        reverseService.apply(this.orderItem.tid, this.orderItem.customer.id, this.form.reason, stock_item, return_item, bad_item, this.form.remark).then((resp)=>{
                            this.$ltsMessage.show({type: 'success', message: "退货退款申请成功"});
                        },(error)=>{
                            this.$ltsMessage.show({type: 'error', message: "退货退款申请失败：" + error.error_message});
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        },
        watch: {
            visible() {
                if (this.visible) {
                    this.show = this.visible;
                }
            },
            show() {
                if (!this.show) {
                    this.form.reason = '';
                    this.form.num = 1;
                    this.form.refund = 0;
                    this.form.remark = '';
                    this.$emit('update:visible', this.show);
                }
            },
            orderItem() {
                this.form.refund = this.orderItem.price_real_value * this.form.num;
            }
        }
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
