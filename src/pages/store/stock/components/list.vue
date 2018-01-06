<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="formFileds" :form-inlines="params"></lts-search-form>
        <el-table :data="datalist" v-loading="loading" style="width: 100%">
            <el-table-column type="selection" label=""/>
            <el-table-column type="index" label="序号"/>
            <el-table-column prop="spot_name" label="网点"></el-table-column>
            <el-table-column prop="spot_addr" label="地址"></el-table-column>
            <el-table-column label="预期到达时间">
                <template slot-scope="scope">{{scope.row.to_time | timestamp2str}}</template>
            </el-table-column>
            <el-table-column prop="real_num" label="商品总数"></el-table-column>
            <el-table-column label="支付方式">
                <template slot-scope="scope">
                    <span v-for="(type) in scope.row.pay_type_arr">
                        <strong v-if="type == 2">在线支付</strong>
                        <strong v-if="type == 3">货到付款</strong>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="订单总额">
                <template slot-scope="scope">{{scope.row.real_pay | money2str}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        round
                        size="small">
                        <router-link :to="'spot_detail/' + scope.row.tid">查看</router-link>
                    </el-button>
                    <el-button
                        @click.native.prevent="stockup(scope.row)"
                        type="primary" round
                        size="small">
                        备货
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {dateUtils} from 'ltsutil'
    import {ltsSearchForm} from 'ui'
    import deliveryService from '@/services/DeliveryService'

    export default {
        components: {
            ltsSearchForm
        },
        data() {
            return {
                loading: true,
                datalist: [],
                params: {
                    stock_time: dateUtils.format(new Date(), 'yyyy-MM-dd'),
                    status: 0
                },
                formFileds: [
                    {
                        search: {
                            date: {
                                label: '备货时间',
                                type: 'date',
                                bindValue: 'stock_time'
                            },
                            status: {
                                label: "状态",
                                type: "select",
                                bindValue: "status",
                                bindPlaceholder: "请选择",
                                children: [
                                    {label: "未备货", bindValue: 0},
                                    {label: "已备货", bindValue: 1}
                                ]
                            },
                            search: {bindValue: "搜索", type: "submitbutton"}
                        }
                    }
                ],
            }
        },
        mounted(){
            this.search();
        },
        methods: {
            stockup(item) {
                console.log(item)
            },
            getParameter(bizParams) {
                this.search()
            },
            search() {
                this.loading = true;
                this.datalist = [];
                deliveryService.get_picking_list(this.params.stock_time, this.params.status).then((resp) => {
                    this.loading = false;
                    if (resp.datalist.length > 0) {
                        this.datalist = resp.datalist[0].spots;
                    }
                }, (err) => {
                    this.loading = false;
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试:' + err.errorMessage})
                })
            }
        }
    }
</script>
<style lang="less">

</style>
