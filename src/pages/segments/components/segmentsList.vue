<template>
    <div>
        <lts-search-from @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-from>
        <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination" @menuClick="handleMenuItemClick"></lts-table>
    </div>
</template>

<script>
    import {request} from 'ltsutil'
    import ltsTable from '@/common/components/lts-table.vue'
    import ltsSearchFrom from '@/common/components/lts-search-from.vue'
    import segmentsService from '@/services/SegmentsService.js'
    export default {
        name: "segmentsList",
        components: {
            ltsTable, ltsSearchFrom
        },
        data () {
            return {
                api: {
                    method: '/market/getChildrenByOpenCode', // 查询api
                    bizparams: {
                      order_by:'id',
                      open_code:'666666'

                    }
                },
                form: {
                    formFileds: [
                        {
                            'search': {
                                bizName: {'label': '', 'type': 'input', 'bindValue': 'bizName', 'bindPlaceholder': '搜索市场名称'},
                                status: {
                                    'label': '',
                                    'type': 'select',
                                    'bindValue': 'status',
                                    'bindPlaceholder': '选择市场状态',
                                    'children': [
                                        {"label": "内测", "bindValue": "0"},
                                        {"label": "已上线", "bindValue": "1"},
                                        {"label": "冻结", "bindValue": "2"},
                                        {"label": "初始化", "bindValue": "3"},
                                        {"label": "待审核", "bindValue": "9"},
                                        {"label": "已删除", "bindValue": "-1"},
                                    ]
                                },

                                submit: {'bindValue': '确定', 'type': 'submitbutton'}
                            }
                        }
                    ],
                    formInline: {
                    }
                },
                pagination: {
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    sizes: [10, 20, 30],
                    layout: 'total, sizes, prev, pager, next, jumper' // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                },
                table: {
                    datalist: true,
                    tableDataForm: 'api', // json
                    tableField: {
                        '英文名': {'value': 'biz_ename', 'type': 'text'},
                        '中文名': {'value': 'biz_name', 'type': 'text'},
                        '联系人': {'value': 'contact', 'type': 'text'},
                        '状态': {'value': 'status_cname', 'type': 'text'},
                        '功能': {
                            'value': '',
                            'type': 'menu',
                            'width': '200',
                            'menulist': [
                                { value: '详情', command: 'detail' },
                                { value: '菜单',
                                    command: 'default',
                                    children: [
                                        {value: '编辑', command: 'edit'},
                                        {value: '删除', command: 'delete'}
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        },
        methods: {
            getParameter (val) {
                this.form.formInline = val
                this.search()
            },
            search () {
              let getSegmentsList = segmentsService.getSegmentsList(this.pagination,this.api.bizparams)
              getSegmentsList.then((data) => {
                    console.log('success')
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: errorMessage})
                })
            },
            handleMenuItemClick (command, item) {
                switch (command) {
                    case 'detail':
                        alert('详情：' + item.shop_name)
                        break
                    case 'edit':
                      const id = item.id
                      this.$router.push({path: `/edit/${id}`})
                        break
                    case 'delete':
                        alert('删除：' + item.shop_name)
                        break
                }
            },
        },
        watch: {
            form: {
                handler: function () {
                    console.log(this.api.bizparams.shop)
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
