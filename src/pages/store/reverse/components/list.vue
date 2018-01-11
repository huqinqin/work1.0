<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-form>
        <el-table :data="datalist" v-loading="loading" style="width: 100%">
            <el-table-column type="index" label="#"/>
            <el-table-column prop="oid" label="订单编号"></el-table-column>
            <el-table-column prop="item_remark.item_name" label="商品"></el-table-column>
            <el-table-column prop="user_name" label="退款用户"></el-table-column>
            <el-table-column prop="total_num" label="申请数量"></el-table-column>
            <el-table-column prop="status_title" label="状态"></el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">{{scope.row.start_time | timestamp2str}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button round size="mini"><router-link :to="'/detail/' + scope.row.id">详情</router-link></el-button>
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
    import {request, dateUtils} from 'ltsutil'
    import {ltsSearchForm} from 'ui'
    import reverseService from '@/services/ReverseService'
    export default {
        props: {},
        components: {
            ltsSearchForm
        },
        data() {
            return {
                loading: true,
                datalist:[],
                params: {
                    start_time: '',
                    end_time: '',
                    oid: '',
                    item_name:'',
                    status: '',
                },
                form: {
                    formFileds: [
                        {
                            search: {
                                tid: {
                                    label: '订单号',
                                    type: 'input',
                                    bindValue : 'oid',
                                    bindPlaceholder: '订单号'
                                },
                                item_name: {
                                    label: '商品名称',
                                    type: 'input',
                                    bindValue : 'item_name',
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
                        item_name:'',
                        status: '',
                        date: [dateUtils.timeToStr(new Date().getTime() - 3600 * 1000 * 24 * 30), dateUtils.format(new Date())],
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
            handleMenuItemClick(command, order) {
                switch (command) {
                    case "accept":
                        if (order.pay_type !== 3) {
                            this.$ltsMessage.show({type: 'error', message: "不支持非货到付款订单"})
                        } else if (order.status !== 0) {
                            this.$ltsMessage.show({type: 'error', message: "不支持的订单状态"})
                        } else {
                            orderService.accept(order.tid).then((resp)=>{
                                this.$ltsMessage.show({type: 'success', message: "通过成功"});
                            }, (err)=>{
                                this.$ltsMessage.show({type: 'success', message: "通过失败：" + err.error_message});
                            });
                        }

                        break;
                    case "reject":
                        if (order.pay_type !== 3) {
                            this.$ltsMessage.show({type: 'error', message: "不支持非货到付款订单"})
                        } else if (order.status !== 0) {
                            this.$ltsMessage.show({type: 'error', message: "不支持的订单状态"})
                        } else {
                            this.$ltsMessage.show({type: 'success', message: "拒绝" + order.tid});
                        }
                        break;
                    case "remark":
                        this.$ltsMessage.show({type: 'success', message: "备注:" + order.tid});
                        break;
                }
            },
            getParameter (val) {
                this.search()
            },
            search () {
                reverseService.getList(this.params.oid, this.params.status, this.params.start_time, this.params.end_time).then((resp) => {
                    this.datalist = resp.datalist;
                    this.loading = false;
                }, (err) => {
                    this.loading = false;
                    this.datalist = [];
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试:' + err.error_message})
                });
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
                this.pagination.pageSize = val
                this.search()
            },
            handleCurrentChange(val) {
                this.pagination.page = val
                this.search()
            },
        },
        mounted(){
            this.search();
        },
        created(){
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

</style>
