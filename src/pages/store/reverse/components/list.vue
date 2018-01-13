<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-form>
        <el-table :data="datalist" v-loading="loading" default-expand-all style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="detail-table-expand">
                        <el-form-item label="条码">
                            {{scope.row.item_remark.sinr}}
                        </el-form-item>

                        <el-form-item label="规格">
                            {{scope.row.item_remark.spec}}
                        </el-form-item>
                        <el-form-item label="原订单数量">
                            {{scope.row.item_remark.num}}
                        </el-form-item>
                        <el-form-item label="原订单单价">
                            {{scope.row.item_remark.price | money2str}}
                        </el-form-item>
                        <el-form-item label="退款类型">
                            {{scope.row.refund_type_title}}
                        </el-form-item>
                        <el-form-item label="下单时间">
                            {{scope.row.item_remark.order_cdate | strtime2str}}
                        </el-form-item>
                        <el-form-item label="付款时间">
                            {{scope.row.item_remark.pay_time | strtime2str}}
                        </el-form-item>
                        <el-form-item label="出库时间">
                            {{scope.row.item_remark.out_time | strtime2str}}
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#"/>
            <el-table-column prop="oid" label="订单编号" align="center" width="120"></el-table-column>
            <el-table-column prop="item_remark.item_name" label="商品" header-align="center" align="left"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="user_name" label="工程商" header-align="center" align="left" width="200"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="退货数量" align="center" width="80">
                <template slot-scope="scope">
                    <el-tooltip placement="top">
                        <div slot="content">
                            <p v-if="scope.row.reverse_remark.stockout_item">
                                缺货:{{scope.row.reverse_remark.stockout_item.num}}{{scope.row.reverse_remark.stockout_item.unit}}</p>
                            <p v-if="scope.row.reverse_remark.return_item">
                                退货:{{scope.row.reverse_remark.return_item.num}}{{scope.row.reverse_remark.return_item.unit}}</p>
                        </div>
                        <div>{{scope.row.total_num}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="reverse_reason_title" label="退货原因" header-align="center" align="left"
                             width="200"></el-table-column>
            <el-table-column label="退货金额" align="center" width="80">
                <template slot-scope="scope">{{scope.row.refund_real | money2str}}</template>
            </el-table-column>
            <el-table-column prop="status_title" label="状态" header-align="center" align="left" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status == 7 || scope.row.status == 9">
                        {{scope.row.status_title}}
                    </el-tag>
                    <span v-else>{{scope.row.status_title}}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" width="160">
                <template slot-scope="scope">{{scope.row.start_time | timestamp2str}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><router-link :to="'/detail/' + scope.row.id">详情</router-link></el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.status == 4">修改</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.real_num > 0 && (scope.row.status == 1 || scope.row.status == 2) && scope.row.hd_status == 0">退货取货</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.real_num > 0 && (scope.row.status == 1 || scope.row.status == 2) && (scope.row.status == 0 || scope.row.hd_status == 2)">退货入库</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.real_num > 0 && (scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 4) && scope.row.hd_status == 3">退货出库</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.real_num == 0 && (scope.row.status == 1 || scope.row.status == 2)">驳回</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.real_num == 0 && (scope.row.status == 1 || scope.row.status == 2)">关闭</el-dropdown-item>
                            <el-dropdown-item>备注</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="text-align: right;margin-top:20px"
            :current-page="pagination.page"
            :page-sizes="pagination.sizes"
            :page-size="pagination.pageSize"
            :layout="pagination.layout"
            :total="pagination.total">
        </el-pagination>
    </div>
</template>
<script>
    import {dateUtils} from 'ltsutil'
    import {ltsSearchForm} from 'ui'
    import reverseService from '@/services/ReverseService'

    export default {
        components: {
            ltsSearchForm
        },
        data() {
            return {
                loading: true,
                datalist: [],
                params: {
                    oid: '',
                    item_name: '',
                    status: '',
                    start_time: '',
                    end_time: '',
                },
                form: {
                    formFileds: [
                        {
                            search: {
                                tid: {
                                    label: '订单号',
                                    type: 'input',
                                    bindValue: 'oid',
                                    bindPlaceholder: '订单号'
                                },
                                item_name: {
                                    label: '商品名称',
                                    type: 'input',
                                    bindValue: 'item_name',
                                    bindPlaceholder: '商品名称'
                                },
                                date: {
                                    label: '创建时间',
                                    type: 'datetimerange',
                                    bindValue: 'date'
                                },
                                status: {
                                    label: "状态",
                                    type: "select",
                                    bindValue: "status",
                                    children: [
                                        {label: "所有状态", bindValue: ''},
                                        {label: "退款申请中", bindValue: 1},
                                        {label: "退款接受", bindValue: 2},
                                        {label: "退款驳回", bindValue: 3},
                                        {label: "卖家已赔", bindValue: 5},
                                        {label: "退款成功", bindValue: 7},
                                        {label: "退款关闭", bindValue: 9}
                                    ]
                                },
                                search: {bindValue: "搜索", type: "submitbutton"}
                            }
                        }
                    ],
                    // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
                    formInline: {
                        oid: '',
                        item_name: '',
                        status: '',
                        date: dateUtils.getNearMonth(),
                    },
                },
                pagination: {
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    sizes: [10, 20, 30],
                    layout: "total, sizes, prev, pager, next, jumper" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                },
            }
        },
        methods: {
            search() {
                reverseService.getList(this.params.oid, this.params.status, this.params.start_time, this.params.end_time,
                    this.pagination.page, this.pagination.pageSize, this.params.order_by).then((resp) => {
                    this.loading = false;
                    this.datalist = resp.datalist;
                    this.pagination.total = resp.total;
                }, (err) => {
                    this.loading = false;
                    this.datalist = [];
                    this.pagination.total = 0;
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试:' + err.error_message})
                });
            },
            getParameter(val) {
                this.search()
            },
            syncFormParam() {
                if (this.form.formInline.date.length > 0) {
                    this.params.start_time = this.form.formInline.date[0];
                    this.params.end_time = this.form.formInline.date[1];
                }
                this.params.oid = this.form.formInline.oid;
                this.params.item_name = this.form.formInline.item_name;
                this.params.status = this.form.formInline.status;
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.search()
            },
            handleCurrentChange(val) {
                this.pagination.page = val;
                this.search()
            },
        },
        mounted() {
            this.search();
        },
        created() {
            this.syncFormParam();
        },
        watch: {
            form: {
                handler: function () {
                    this.syncFormParam();
                },
                deep: true
            }
        }
    }
</script>
<style lang="less">
    .detail-table-expand {
        font-size: 0;
        label {
            width: 90px;
            color: #99a9bf;
        }
        .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 20%;
        }
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
    }
</style>
