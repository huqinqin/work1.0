<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds"
                         :form-inlines="form.formInline"></lts-search-form>
        <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"
                   @menuClick="handleMenuItemClick"></lts-table>
    </div>
</template>
<script>
    import {request} from 'ltsutil'
    import {ltsTable,ltsSearchForm} from 'ui'
    export default {
        props: {},
        components: {
            ltsTable,
            ltsSearchForm
        },
        data() {
            return {
                api: {
                    method: 'wbm.tp.wholesale.order.list',
                    bizparams: {
                        wholesale_trade_query : {
                            open_code: '331088'
                        },
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
                                    type: 'date',
                                },
                                status: {
                                    label: "状态",
                                    type: "select",
                                    bindValue: "status",
                                    bindPlaceholder: "所有状态",
                                    children: [
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
                        start_time: '',
                        end_time: ''
                    },
                },
                table: {
                    tableDataForm: 'api',
                    tableField: {
                        "": {value: "xx", type: "selection"},
                        "订单号": {value: "tid", type: "text"},
                        "下单时间": {value: "cdate", type: "text"},
                        "买家": {value: "user_name", type: "text"},
                        "手机": {value: "receiver_mobile", type: "text"},
                        "地址": {value: "user_addr", type: "text"},
                        "应付": {value: "pay", type: "text"},
                        "实付": {value: "fee_total", type: "text"},
                        "订单状态": {value: "status", type: "text"},
                        "付款状态": {value: "pay_info.pay_status", type: "text"},
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
            handleMenuItemClick(command, item) {
                switch (command) {
                    case "accept":
                        this.$ltsMessage.show({type: 'success', message: "通过" + item.tid})
                        break;
                    case "reject":
                        this.$ltsMessage.show({type: 'success', message: "拒绝" + item.tid})
                        break;
                }
            },
            getParameter (val) {
                this.form.formInline = val
                this.api.bizparams.wholesale_trade_query = JSON.stringify(val)
                this.search()
            },
            search () {
                let link = request.api(this.api.method, this.api.bizparams)
                link.then((data) => {
                    console.log('success')
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试'})
                })
            }
        },
        created(){
            this.api.bizparams.wholesale_trade_query = JSON.stringify(this.form.formInline)
        },
        watch: {
            form: {
                handler: function () {
                    this.api.bizparams.wholesale_trade_query = JSON.stringify(this.form.formInline)
                },
                deep: true
            }
        }
    }
</script>
<style lang="less">

</style>
