<template>
    <div>
        <lts-table :t-api="api" :t-table="table" :t-pagination="pagination" @menuClick="handleMenuItemClick"></lts-table>
    </div>
</template>

<script>
    import {ltsTable} from 'ui'
    import storeService from '@/services/StoreService.js'
    export default {
        components: {ltsTable},
        data () {
            return {
                api: {
                    method: '/market/getChildrenByOpenCode',
                    bizparams:{}
                },
                pagination: {
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    sizes: [10, 20, 30],
                    layout: 'total, sizes, prev, pager, next, jumper' // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                },
                table: {
                    datalist: [],
                    tableDataForm: 'api', // json
                    tableField: {
                        '门店名称': {'value': 'biz_name', 'type': 'text'},
                        '联系人': {'value': 'contact', 'type': 'text'},
                        '状态': {'value': 'status_cname', 'type': 'text'},
                        '操作': {
                            'value': '',
                            'type': 'menu',
                            'width': '200',
                            'menulist': [
                                {value: '编辑', command: 'edit' },
                                {value: '删除', command: 'delete', type:'' },
                            ]
                        }
                    }
                }
            }
        },
        methods: {
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
        }
    }
</script>

<style scoped>

</style>
