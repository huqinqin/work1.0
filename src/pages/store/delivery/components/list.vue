<template>
    <div>
        <el-steps :active="2" simple style="margin-bottom: 20px">
            <el-step title="仓库备货" icon="el-icon-tickets" ></el-step>
            <el-step title="配送入库" icon="el-icon-menu" ></el-step>
            <el-step title="配送发货" icon="el-icon-printer" ></el-step>
        </el-steps>

        <el-tabs v-model="params.status" type="card" @tab-click="tabHandleClick">
            <el-tab-pane label="未发货配送单" name="0"></el-tab-pane>
            <el-tab-pane label="历史发货批次" name="1">
                <lts-search-form @get-from="getParameter" :form-fileds="formFileds" :form-inlines="params"></lts-search-form>
                <el-checkbox-group v-model="selectedBatchList" size="mini" style="margin-bottom: 10px">
                    <el-checkbox border v-for="batch in batchList" :key="batch" :label="'批次号' + batch"></el-checkbox>
                </el-checkbox-group>
            </el-tab-pane>
        </el-tabs>

        <el-select v-model="printer" placeholder="请选择打印机">
            <el-option
                v-for="item in printerList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <div class="batch-info-list" v-for="(batchLine, index) in datalist" :key="index">
            <div class="batch-hd" v-if="batchLine.batch_no != 0"><i class="el-icon-document"></i> 发货单概览 批次号:{{batchLine.batch_no}}</div>
            <el-table :data="batchLine.list" v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"/>
                <el-table-column type="index" label="#"/>
                <el-table-column prop="spot_name" label="网点名称" width="400" show-overflow-tooltip></el-table-column>
                <el-table-column prop="spot_addr" label="地址" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="spot">
                        <el-button round size="mini" type="primary" @click="showDetail(spot.row)">查看</el-button>
                        <el-button round size="mini" v-if="params.status == 0" @click="printDetail(spot.row)">打印</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="datalist.length == 0">
            暂无数据
        </div>

        <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            width="1100px">
            <div style="margin-top: -20px">
                <el-form label-position="left" inline class="detail-info">
                    <el-form-item label="网点名称">
                        <span>{{detail.spot_name}}</span>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <span>{{detail.owner_name}}</span>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <span>{{detail.owner_mobile}}</span>
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
                    <el-table-column label="操作" width="150" align="center">
                        <template slot-scope="scope">
                            <el-popover
                                ref="popoverStockOut"
                                placement="top"
                                width="130"
                                v-model="showStockOutEdit">
                                <el-input-number v-model="stockOutNum" size="mini" controls-position="right" :min="1" :max="scope.row.real_num"></el-input-number>
                                <div style="text-align: right; margin-top: 10px;width: 130px;">
                                    <el-button size="mini" type="text" @click="showStockOutEdit = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="stockOut(scope.row)">确定</el-button>
                                </div>
                            </el-popover>
                            <el-button round size="mini" v-popover:popoverStockOut>缺货</el-button>
                            <el-button round size="mini" type="primary" @click="consignment(scope.row.id)" v-if="params.status == 0">发货</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="detailBatchOpt('consignment')" v-if="params.status == 0">批量发货</el-button>
                <el-button type="primary" @click="detailBatchOpt('print')" v-if="params.status == 1">批量打印</el-button>
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
                // 批次号
                batchList: [],
                selectedBatchList: [],
                loading: true,
                dialogVisible: false,
                datalist: [],
                detail: {
                    orders: []
                },
                stockOutNum: 0,
                showStockOutEdit: false,
                params: {
                    incar_time: dateUtils.format(new Date(), 'yyyy-MM-dd'),
                    spot_code: '',
                    status: 0,
                    batch_no_arr: ''
                },
                formFileds: [
                    {
                        search: {
                            date: {
                                label: '发货时间',
                                type: 'date',
                                bindValue: 'incar_time'
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
            tabHandleClick(tab, event) {
                this.datalist = [];
                this.search()
            },
            batchOpt(){

            },
            handleSelectionChange(selectionList) {
                this.multipleSelection = selectionList;
            },

            detailBatchOpt(type){
                let idArr = [];
                this.detailMultipleSelection.forEach(value => {
                    idArr.push(value.id)
                });
                if (type === 'consignment') {
                    this._consignment(idArr).then((resp) => {
                        this.dialogVisible = false;
                    }, (err) => {
                    });
                } else {

                }
            },
            detailHandleSelectionChange(selectionList) {
                this.detailMultipleSelection = selectionList;
            },

            stockOut(item) {
                console.log(item, this.stockOutNum)
                deliveryService.stock_out(item.id, this.stockOutNum).then((resp)=>{
                    this.$ltsMessage.show({type: 'success', message: '缺货成功'})
                    this.showStockOutEdit = false;
                },(err)=>{
                    this.$ltsMessage.show({type: 'error', message: '缺货失败，请稍后重试:' + err.error_message})
                })
            },
            consignmentBySpot(item) {
                this._consignment(item.id_arr)
            },
            consignment(id) {
                this._consignment([id])
            },
            _consignment(ids) {
                if (!ids || ids.length === 0) {
                    this.$ltsMessage.show({type: 'warning', message: '未选中项目'})
                    return;
                }
                return deliveryService.consignment(ids).then((resp)=>{
                    this.$ltsMessage.show({type: 'success', message: '发货成功'})
                },(err)=>{
                    this.$ltsMessage.show({type: 'error', message: '发货失败，请稍后重试:' + err.error_message})
                });
            },
            showDetail: function (item) {
                this.dialogVisible = true;
                deliveryService.get_in_car_order_list(this.params.status, null, item.line_code, item.spot_code).then((resp)=>{
                    this.detail = resp.datalist[0];
                },(err)=>{
                    this.$ltsMessage.show({type: 'error', message: '获取详情失败:' + err.error_message})
                })
            },
            printDetail: function (item) {
                this.$ltsMessage.show({type: 'success', message: '开发中'})
            },
            getParameter(bizParams) {
                this.search()
            },
            search() {
                this.loading = true;
                this.datalist = [];
                let incar_time = this.params.status == 0 ? null : this.params.incar_time;
                deliveryService.get_in_car_list(this.params.status, this.params.spot_code, incar_time, null).then((resp) => {
                    this.loading = false;
                    if (resp.data) {
                        let list = [];
                        for (let batch_no in resp.data) {
                            for (let line_code in resp.data[batch_no]) {
                                let item = {batch_no: batch_no, list: resp.data[batch_no][line_code]['spots']};
                                list.push(item);
                                break;
                            }
                        }
                        console.log(list)
                        this.datalist = list;
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
    .batch-info-list {
        margin-top: 10px;
        .batch-hd {
            height: 30px;
            line-height: 30px;
            color: #99a9bf;
        }
    }
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
