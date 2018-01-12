<template>
    <div>
        <el-steps :active="0" simple style="margin-bottom: 20px">
            <el-step title="仓库备货" icon="el-icon-tickets" ></el-step>
            <el-step title="配送入库" icon="el-icon-menu" ></el-step>
            <el-step title="配送发货" icon="el-icon-printer" ></el-step>
        </el-steps>

        <lts-search-form @get-from="getParameter" :form-fileds="formFileds" :form-inlines="params"></lts-search-form>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="batchOpt">批量备货</el-button>
            <el-select v-model="printer" placeholder="请选择打印机">
                <el-option
                    v-for="item in printerList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-table :data="datalist" v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection"/>
            <el-table-column type="index" label="#"/>
            <el-table-column prop="spot_name" label="网点" show-overflow-tooltip></el-table-column>
            <el-table-column prop="spot_addr" label="地址" show-overflow-tooltip></el-table-column>
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
            <el-table-column prop="status_title" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button round size="mini" @click="showDetail(scope.row)">查看</el-button>
                    <el-button round type="primary" size="mini" v-if="scope.row.status == 0" @click.native.prevent="stockup(scope.row)">备货</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="备货单"
            :visible.sync="dialogVisible"
            width="1100px">
            <div style="margin-top: -20px">
                <el-form label-position="left" inline class="detail-info">
                    <el-form-item label="备货时间" v-if="detail.to_time">
                        <el-tag>{{detail.to_time | timestamp2str}}</el-tag>
                    </el-form-item>
                    <el-form-item label="网点名称">
                        <span>{{detail.spot_name}}</span>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <span>{{detail.owner_name}}</span>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <span>{{detail.owner_mobile}}</span>
                    </el-form-item>
                    <el-form-item label="备注" style="width: 100%">
                        <span v-if="detail.remark">{{detail.remark}}</span>
                        <span v-else>无</span>
                    </el-form-item>
                </el-form>
                <el-table :data="detail.orders" size="small" show-summary :summary-method="getSummaries" style="width: 100%"
                          @selection-change="detailHandleSelectionChange">
                    <el-table-column type="selection" label="" width="54px"/>
                    <el-table-column type="index" label="#" width="50px"/>
                    <el-table-column prop="item_remark_object.sinr" label="条码" width="120px" />
                    <el-table-column prop="item_remark_object.item_name" label="商品" show-overflow-tooltip />
                    <el-table-column prop="spec" label="规格" width="60px" />
                    <el-table-column prop="unit" label="单位" width="50px" />
                    <el-table-column prop="real_num" label="数量" width="50px" />
                    <el-table-column prop="stock_num" label="缺" width="50px" />
                    <el-table-column label="单价" width="85px">
                        <template slot-scope="scope">{{scope.row.item_remark_object.price_real | money2str}}</template>
                    </el-table-column>
                    <el-table-column label="应付/实付" width="85px">
                        <template slot-scope="scope">{{scope.row.real_pay | money2str}}</template>
                    </el-table-column>
                    <el-table-column label="优惠" width="60px">
                        <template slot-scope="scope">{{scope.row.item_remark_object.discount | money2str}}</template>
                    </el-table-column>
                    <el-table-column prop="status_title" label="状态" width="65px"></el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="detailBatchOpt" v-if="params.status === 0">批量备货</el-button>
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
                ],
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
                    } else if (index === 6 || index === 7 || index === 9 || index === 10) {
                        let total = 0;
                        data.forEach((row) => {
                            if (index === 6) {
                                if (row.real_num) {
                                    total += row.real_num;
                                }
                            } else if (index === 7) {
                                if (row.stock_num) {
                                    total += row.stock_num;
                                }
                            } else if (index === 9) {
                                if (row.real_pay) {
                                    total += row.real_pay / 100;
                                }
                            } else {
                                if (row.item_remark_object.discount) {
                                    total += row.item_remark_object.discount / 100;
                                }
                            }
                        });
                        sums[index] = index !== 6 && index !== 7 ? total.toFixed(2) : total;
                    } else {
                        sums[index] = '';
                    }
                });

                return sums;
            },

            batchOpt(){
                let idArr = [];
                this.multipleSelection.forEach(value => {
                    value.id_arr.forEach(id => {idArr.push(id)})
                })
                this._stockup(idArr)
            },
            handleSelectionChange(selectionList) {
                this.multipleSelection = selectionList;
            },

            detailBatchOpt(){
                let idArr = [];
                this.detailMultipleSelection.forEach(value => {
                    idArr.push(value.id)
                });
                this._stockup(idArr).then((resp) => {
                    this.dialogVisible = false;
                }, (err)=>{
                });
            },
            detailHandleSelectionChange(selectionList) {
                this.detailMultipleSelection = selectionList;
            },

            stockup(item) {
                this._stockup(item.id_arr)
            },
            _stockup(ids = []) {
                if (!ids || ids.length === 0) {
                    this.$ltsMessage.show({type: 'warning', message: '未选中项目'})
                    return;
                }
                return deliveryService.start_stock_up(ids).then((resp)=>{
                    this.$ltsMessage.show({type: 'success', message: '备货成功'})
                },(err)=>{
                    this.$ltsMessage.show({type: 'error', message: '备货失败，请稍后重试:' + err.error_message})
                });
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
                deliveryService.get_provider_spot_view_order_list_by_deliver(this.params.status, this.params.stock_time, null).then((resp) => {
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
    .detail-info {
        font-size: 0;
    }
    .detail-info label {
        width: 90px;
        color: #99a9bf;
    }
    .detail-info .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 25%;
    }
</style>
