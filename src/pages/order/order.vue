<template>
    <div>
        <lts-search-from @get-from="getParameter" :form-fileds="form.formFileds"
                         :form-inlines="form.formInline"></lts-search-from>
        <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"
                   @menuClick="handleMenuItemClick"></lts-table>
    </div>
</template>
<script>
    import ltsTable from '@/common/components/lts-table.vue'
    import ltsSearchFrom from '@/common/components/lts-search-from.vue'

    export default {
        props: '',
        components: {
            ltsTable, ltsSearchFrom
        },
        mounted() {

        },
        data() {
            return {
                api: {
                    api: 'ltsApi',
                    method: 'wbm.tp.trade.master.getList',
                    bizparams: {
                        open_code: '331088'
                    },
                },
                form: {
                    formFileds: [
                        {
                            search: {
                                // keywords: {
                                //     label: '关键字',
                                //     type: 'text',
                                //     bindValue : 'keywords'
                                // },
                                status: {
                                    "label": "状态",
                                    "type": "select",
                                    "bindValue": "status",
                                    "bindPlaceholder": "所有状态",
                                    "children": [
                                        {"label": "等待付款", "bindValue": "0"},
                                        {"label": "已付款", "bindValue": "1"},
                                        {"label": "已完成", "bindValue": "7"},
                                        {"label": "已关闭", "bindValue": "9"}
                                    ]
                                },
                                search: {"bindValue": "确定", "type": "submitbutton"}
                            }
                        }
                    ],
                    // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
                    formInline: {
                        test: 2,
                        region: '',
                        user: '',
                        start_date: '',
                        end_date: '',
                        //需要从处理结果另外带回来的参数 存这里 默认返回一条对象。若返回多个。自己
                        callbackParameter: {},
                    },
                },
                table: {
                    tableDataForm: 'api', // json
                    tableField: {
                        "": {"value": "", "type": "selection"},
                        "订单号": {"value": "tid", "type": "text"},
                        "商品名称": {"value": "iname", "type": "text"},
                        "价格": {"value": "price", "type": "text"},
                        "数量": {"value": "num", "type": "text"},
                        "应付": {"value": "pay", "type": "text"},
                        "实付": {"value": "payReal", "type": "text"},
                        "操作": {
                            "value": "", "type": "menu", "width": "200", "menulist": [
                                {
                                    value: "查看详情",
                                    command: 'link',
                                },
                                {
                                    value: "测试多个菜单",
                                    command: 'default',
                                    children: [
                                        {value: "狮子头", command: "detail"},
                                        {value: "删除", command: "delete"},
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
            getParameter(val) {
                console.log(val);
                this.form.formInline = val;
            },
            handleMenuItemClick(command, item) {
                switch (command) {
                    case "link":
                        alert("设置详情" + item.id);
                        break;
                    case "detail":
                        alert("狮子头" + item.id);
                        break;
                    case "delete":
                        alert("删除" + item.id);
                        break;
                }
            },
        }
    }
</script>
<style lang="less">

</style>
