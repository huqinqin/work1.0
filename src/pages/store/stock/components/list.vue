<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="formFileds" :form-inlines="params"></lts-search-form>

        <div style="margin: 10px 0">
            <el-button @click="batchOpt">批量备货</el-button>
        </div>
        <el-table :data="datalist" v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection"/>
            <el-table-column type="index" label="#"/>
            <el-table-column prop="spot_name" label="网点"></el-table-column>
            <el-table-column prop="spot_addr" label="地址"></el-table-column>
            <el-table-column label="预期到达时间">
                <template slot-scope="scope">{{scope.row.to_time | timestamp2str}}</template>
            </el-table-column>
            <el-table-column label="备货时间">
                <template slot-scope="scope">{{scope.row.stockup_etime | timestamp2str}}</template>
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
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button round size="small" @click="showDetail(scope.row)">查看</el-button>
                    <el-button round type="primary" size="small" v-if="scope.row.status == 0" @click.native.prevent="stockup(scope.row)">备货</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="备货单"
            :visible.sync="dialogVisible"
            width="1100px">
            <div style="margin-top: -20px">
                <div>网点名称：{{detail.spot_name}} 联系人：{{detail.owner_name}} 联系电话：{{detail.owner_mobile}} 备货时间：{{detail.to_time | timestamp2str}}</div>
                <div>备注：{{detail.remark}}</div>
                <el-table :data="detail.orders" size="small" show-summary :summary-method="getSummaries" style="width: 100%"
                          :span-method="arraySpanMethod" @selection-change="detailHandleSelectionChange">
                    <el-table-column type="selection" label="" width="54px"/>
                    <el-table-column type="index" label="#" width="50px"/>
                    <el-table-column prop="item_remark_object.sinr" label="条码" width="120px" />
                    <el-table-column prop="item_remark_object.item_name" label="商品" />
                    <el-table-column prop="spec" label="规格" width="60px" />
                    <el-table-column prop="unit" label="单位" width="50px" />
                    <el-table-column prop="real_num" label="数量" width="50px" />
                    <el-table-column label="单价" width="85px">
                        <template slot-scope="scope">{{scope.row.item_remark_object.price_real | money2str}}</template>
                    </el-table-column>
                    <el-table-column label="应付/实付" width="85px">
                        <template slot-scope="scope">{{scope.row.real_pay | money2str}}</template>
                    </el-table-column>
                    <el-table-column label="优惠" width="60px">
                        <template slot-scope="scope">{{scope.row.item_remark_object.discount | money2str}}</template>
                    </el-table-column>
                    <el-table-column label="状态" width="65px"><template slot-scope="scope">未备货</template></el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="dialogVisible = false">批量备货</el-button>
            </span>
        </el-dialog>
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
                dialogVisible: false,
                datalist: [],
                detail: {
                    orders: []
                },
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
                multipleSelection: [],
                detailMultipleSelection: []
            }
        },
        mounted(){
            this.search();
        },
        methods: {
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                    } else if (index === 5 || index === 7 || index === 8) {
                        let total = 0;
                        data.forEach((row) => {
                            if (index === 5) {
                                if (row.real_num) {
                                    total += row.real_num;
                                }
                            } else if (index === 7) {
                                if (row.real_pay) {
                                    total += row.real_pay / 100;
                                }
                            } else {
                                if (row.item_remark_object.discount) {
                                    total += row.item_remark_object.discount / 100;
                                }
                            }
                        });
                        sums[index] = index !== 5 ? total.toFixed(2) : total;
                    } else {
                        sums[index] = '';
                    }
                });

                return sums;
            },
            arraySpanMethod({row, column, rowIndex, columnIndex }) {
                // console.log(row, column, rowIndex, columnIndex)
                // if (rowIndex === 0) {
                //     return [1, 2];
                // } else if (columnIndex === 1) {
                //     return [0, 0];
                // }
            },
            batchOpt(){
                console.log(this.multipleSelection)
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },
            detailHandleSelectionChange(val) {
                console.log(val)
                this.detailMultipleSelection = val;
            },
            stockup(item) {
                console.log(item)
            },
            showDetail: function (item) {
                this.dialogVisible = true;
                this.detail = item;
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
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试:' + err.error_message})
                })
            }
        }
    }
</script>
<style lang="less">

</style>
