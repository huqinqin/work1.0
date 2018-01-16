<template>
    <el-dialog
        title="退货退款操作"
        :visible.sync="show"
        width="800px">
        <el-form label-position="left" size="small" label-width="110px" class="detail-info">
            <el-form-item label="订单号">
                {{reverse.tid}}
            </el-form-item>
            <el-form-item label="工程商">
                {{reverse.user_name}}
            </el-form-item>
            <el-form-item label="商品名称">
                {{reverse.item_remark.item_name}}
            </el-form-item>
            <el-form-item label="规格">
                {{reverse.item_remark.spec}}
            </el-form-item>
            <el-form-item label="单价">
                {{reverse.item_remark.price | money2str}}
            </el-form-item>
            <el-form-item label="原订单数量">
                {{reverse.item_remark.num}}
            </el-form-item>
            <el-form-item label="退款原因">
                {{reverse.reverse_reason_title}}
            </el-form-item>
            <el-form-item label="明细">
                <div v-if="reverse.reverse_remark.stockout_item">
                    缺货:{{reverse.reverse_remark.stockout_item.num}}{{reverse.reverse_remark.stockout_item.unit}}
                </div>
                <div v-if="reverse.reverse_remark.return_item">
                    退货:{{reverse.reverse_remark.return_item.num}}{{reverse.reverse_remark.return_item.unit}}
                </div>
            </el-form-item>
            <el-form-item label="留言记录">
                <div v-for="(remark, index) in reverse.remark" :key="index">
                    <span v-if="remark.uid == reverse.user_id">工程商<i class="el-icon-caret-left" style="color: #909399"></i><el-tag type="info">{{remark.remark}} {{remark.date}}</el-tag></span>
                    <span v-if="remark.uid == reverse.carrier_uid"><el-tag>{{remark.remark}} {{remark.date}}</el-tag><i class="el-icon-caret-right" style="color: #409EFF"></i>门店</span>
                </div>
                <el-input type="textarea" v-model="form.remark" style="margin-top: 10px;" />
            </el-form-item>
            <el-form-item label="操作记录">
                <div v-for="(remark, index) in reverse.deal_remark" :key="index">
                    <span v-if="remark.uid == reverse.user_id">工程商<i class="el-icon-caret-left" style="color: #909399"></i><el-tag type="info">{{remark.remark}} {{remark.date}}</el-tag></span>
                    <span v-if="remark.uid == reverse.carrier_uid"><el-tag>{{remark.remark}} {{remark.date}}</el-tag><i class="el-icon-caret-right" style="color: #409EFF"></i>门店</span>
                </div>
                <el-input type="textarea" v-model="form.deal_remark" style="margin-top: 10px;" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{optBtnName}}</el-button>
                <el-button @click="show = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import reverseService from '@/services/ReverseService';
    let optTypeConstant = {
        EDIT : {name:'edit', btn: '修改', value: null},
        IN_WAREHOUSE : {name:'in_warehouse', btn: '退货入库', value: 2},
        OUT_WAREHOUSE : {name:'out_warehouse', btn: '退货出库', value: 4},
        REJECT : {name:'reject', btn: '驳回', value: 3},
        CLOSE : {name:'close', btn: '关闭退货退款', value: 9},
        REMARK : {name:'remark', btn: '退货退款留言', value: 0},
    };
    export default {
        name: "opt-dialog",
        props: {
            visible: Boolean,
            optType: String,
            reverse: {
                type:Object,
                default(){
                    return {
                        item_remark: {item_name:'',spec:'',price:'',num:0},
                        reverse_remark:{
                            stockout_item: {},
                            return_item: {},
                        }
                    }
                }
            },
        },
        computed:{
            optBtnName(){
                for (let i in optTypeConstant) {
                    if (optTypeConstant[i].name === this.optType) {
                        return optTypeConstant[i].btn;
                    }
                }
                return '';
            }
        },
        data() {
            return {
                show: this.visible,
                form:{
                    remark: '',
                    deal_remark: '',
                },
            }
        },
        methods: {
            getOptValue(){
                for (let i in optTypeConstant) {
                    if (optTypeConstant[i].name === this.optType) {
                        return optTypeConstant[i].value;
                    }
                }
                return null;
            },
            onSubmit(){
                let optType = this.getOptValue();
                if (optType == null) {
                    this.$ltsMessage.show({type: 'error', message: '不支持的操作类型'});
                    return;
                }
                reverseService.operate(this.reverse.id, this.reverse.user_id, optType, this.form.remark, this.form.deal_remark).then((resp)=>{
                    this.$ltsMessage.show({type: 'success', message: this.optBtnName + "操作成功"});
                },(error)=>{
                    this.$ltsMessage.show({type: 'error', message: this.optBtnName + '操作失败:' + error.error_message});
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
                    this.form.remark = '';
                    this.form.deal_remark = '';
                    this.$emit('update:visible', this.show);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .detail-info {
        label {
            color: #99a9bf;
        }
        .el-form-item {
            margin-bottom: 5px;
        }
    }
</style>
