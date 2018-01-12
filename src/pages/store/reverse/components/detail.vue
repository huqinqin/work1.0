<template>
    <div>
        <el-alert
            :title="detail.status_title"
            type="success" class="status-info" show-icon :closable="false" v-if="detail.status == 7 || detail.status == 9">
        </el-alert>
        <el-alert
            :title="detail.status_title"
            type="info" class="status-info" show-icon :closable="false" v-else>
        </el-alert>

        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>订单信息</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item label="订单编号">
                    {{detail.oid}}
                </el-form-item>
                <el-form-item label="订单创建时间">
                    {{detail.item_remark.order_cdate}}
                </el-form-item>
                <el-form-item label="付款时间">
                    {{detail.item_remark.pay_time}}
                </el-form-item>
                <el-form-item label="出库时间">
                    {{detail.item_remark.out_time}}
                </el-form-item>
                <el-form-item label="商品名称">
                    {{detail.item_remark.item_name}}
                </el-form-item>
                <el-form-item label="规格">
                    {{detail.item_remark.spec}}
                </el-form-item>
                <el-form-item label="单价">
                    {{detail.item_remark.price | money2str}}
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>退款协议信息</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item label="退款工程商">
                    {{detail.user_name}}
                </el-form-item>
                <el-form-item label="退款申请时间">
                    {{detail.start_time | timestamp2str}}
                </el-form-item>
                <el-form-item label="赔付时间" v-if="detail.status == 4 || detail.status == 7">
                    {{detail.tobuy_time | timestamp2str}}
                </el-form-item>
                <el-form-item label="退款完成时间" v-if="detail.status == 7">
                    {{detail.end_time | timestamp2str}}
                </el-form-item>
                <el-form-item label="退款关闭时间" v-if="detail.status == 9">
                    {{detail.end_time | timestamp2str}}
                </el-form-item>
                <el-form-item label="退款原因">
                    {{detail.reverse_reason_title}}
                </el-form-item>
                <el-form-item label="退款类型">
                    {{detail.refund_type_title}}
                </el-form-item>
                <el-form-item label="退款数量">
                    <div v-if="detail.reverse_remark.stockout_item">
                        缺货:{{detail.reverse_remark.stockout_item.num}}{{detail.reverse_remark.stockout_item.unit}}</div>
                    <div v-if="detail.reverse_remark.return_item">
                        退货:{{detail.reverse_remark.return_item.num}}{{detail.reverse_remark.return_item.unit}}</div>
                </el-form-item>
                <el-form-item label="退款金额">
                    {{detail.refund_real | money2str}}
                </el-form-item>
                <el-form-item label="留言记录">
                    <div v-for="(remark, index) in detail.remark" :key="index">
                        <span v-if="remark.uid == detail.user_id">工程商<i class="el-icon-caret-left" style="color: #909399"></i><el-tag type="info">{{remark.remark}} {{remark.date}}</el-tag></span>
                        <span v-if="remark.uid == detail.to_uid"><el-tag>{{remark.remark}} {{remark.date}}</el-tag><i class="el-icon-caret-right" style="color: #409EFF"></i>门店</span>
                    </div>
                </el-form-item>
                <el-form-item label="操作记录">
                    <div v-for="(remark, index) in detail.deal_remark" :key="index">
                        <span v-if="remark.uid == detail.user_id">工程商<i class="el-icon-caret-left" style="color: #909399"></i><el-tag type="info">{{remark.remark}} {{remark.date}}</el-tag></span>
                        <span v-if="remark.uid == detail.to_uid"><el-tag>{{remark.remark}} {{remark.date}}</el-tag><i class="el-icon-caret-right" style="color: #409EFF"></i>门店</span>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import revereService from '@/services/ReverseService'
    export default {
        props: {},
        components: {
        },
        data() {
            return {
                detail: {
                    id: '',
                    item_remark: {
                       order_cdate : ''
                    },
                    reverse_remark: {

                    },
                    status: 0
                }
            }
        },
        methods: {
            get () {
                revereService.get(this.detail.id).then((resp) => {
                    this.detail = resp.data;
                }, (err) => {

                });
            }
        },
        mounted(){
            this.detail.id = this.$route.params.id;
            this.get();
        }
    }
</script>
<style lang="less">
.status-info {
    height: 60px;
}
.base-info {
    margin-top: 20px;
}
.form-row {
    font-size: 0;
    label {
        width: 100px;
        color: #99a9bf;
    }
    .el-form-item {
        width: 100%;
        color: #666;
        margin-right: 0;
        margin-bottom: 0;
    }
}
</style>
