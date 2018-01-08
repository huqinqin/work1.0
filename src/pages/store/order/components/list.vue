<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds"
                         :form-inlines="form.formInline"></lts-search-form>
        <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"
                   @menuClick="handleMenuItemClick"></lts-table>
    </div>
</template>
<script>
    import {request, dateUtils} from 'ltsutil'
    import {ltsTable,ltsSearchForm} from 'ui'
    import orderService from '@/services/OrderService'
    export default {
        props: {},
        components: {
            ltsTable,
            ltsSearchForm
        },
        data() {
            return {
                api: {
                    method: '/store/order/list',
                    bizparams: {
                        start_time: '',
                        end_time: ''
                    },
                },
                form: {
                    formFileds: [
                        {
                            search: {
                                tid: {
                                    label: '订单号',
                                    type: 'input',
                                    bindValue : 'tid',
                                    bindPlaceholder: '订单号'
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
                                    bindPlaceholder: "请选择",
                                    children: [
                                        {label: "所有状态", bindValue: ""},
                                        {label: "等待付款", bindValue: "0"},
                                        {label: "已付款", bindValue: "1"},
                                        {label: "已完成", bindValue: "7"},
                                        {label: "已关闭", bindValue: "9"}
                                    ]
                                },
                                search: {bindValue: "确定", type: "submitbutton"}
                            }
                        }
                    ],
                    // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
                    formInline: {
                        tid: '',
                        status: '',
                        date: [dateUtils.timeToStr(new Date().getTime() - 3600 * 1000 * 24 * 7), dateUtils.format(new Date())],
                    },
                },
                table: {
                    tableDataForm: 'api',
                    tableField: {
                        "": {value: "xx", type: "selection"},
                        "订单号": {value: "tid", type: "text", width: 110},
                        "买家": {value: "user_name", type: "text", width: 80},
                        "手机": {value: "receiver_mobile", type: "text", width: 110},
                        "地址": {value: "user_addr", type: "text"},
                        "应付": {value: "pay_value", type: "text", width: 80},
                        "实付": {value: "fee_total_value", type: "text", width: 80},
                        "支付类型": {value: "pay_info.pay_type_title", type: "text", width: 80},
                        "付款状态": {value: "pay_info.pay_status_title", type: "text", width: 80},
                        "订单状态": {value: "status_title", type: "text", width: 80},
                        "下单时间": {value: "cdate", type: "text", width: 160},
                        "操作": {
                            value: "x",
                            type: "menu",
                            width: "200",
                            menulist: [
                                {
                                    value: "操作",
                                    command: 'default',
                                    children: [
                                        {value: "详情", command: "link", link: '/detail/', linkDataKey: 'tid'},
                                        {value: "通过", command: "accept"},
                                        {value: "拒绝", command: "reject"},
                                        {value: "备注", command: "remark"}
                                    ]
                                }
                            ]
                        },
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
                this.form.formInline = val;
                this.search()
            },
            search () {
                let link = request.api(this.api.method, this.api.bizparams);
                link.then((resp) => {
                    console.log('success')
                }, (err) => {
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试:' + err.error_message})
                })
            },
            updateDate() {
                if (this.form.formInline.date.length > 0) {
                    this.api.bizparams.start_time = this.form.formInline.date[0];
                    this.api.bizparams.end_time = this.form.formInline.date[1];
                }
            }
        },
        created(){
            this.updateDate();
        },
        watch: {
            form: {
                handler: function () {
                    this.updateDate();
                },
                deep: true
            }
        }
    }
</script>
<style lang="less">

</style>
