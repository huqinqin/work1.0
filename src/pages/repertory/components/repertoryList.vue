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
    export default {
        name: "repertoryManage",
        components: {ltsTable, ltsSearchFrom},
        data(){
            return{
                form: {
                    formFileds: [
                        {
                            'search': {
                                shopNmae: {'label': '', 'type': 'input', 'bindValue': 'shopName', 'bindPlaceholder': '搜索产品名称/条码'},
                                date: {'label': '选择时间','type': 'date'},
                                handle: {
                                    'label': '',
                                    'type': 'select',
                                    'bindPlaceholder': '操作类型',
                                    'children':[
                                        {'label': '进货入库', 'bindValue': '0'},
                                        {'label': '调货入库', 'bindValue': '1'},
                                        {'label': '退货入库', 'bindValue': '2'},
                                        {'label': '出库', 'bindValue': '3'},
                                        {'label': '调货出库', 'bindValue': '4'},
                                        {'label': '交易出库', 'bindValue': '5'},
                                        {'label': '预售预出库', 'bindValue': '6'},
                                        {'label': '盘点', 'bindValue': '7'}
                                    ]},
                                search: {'bindValue': '确定', 'type': 'searchbutton'}
                            }
                        }
                    ],
                    formInline: {
                        shopName: '',
                        contact: '',
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
                        '名字': {'value': 'shop_name', 'type': 'text'},
                        '地址': {'value': 'address', 'type': 'text'},
                        '联系人': {'value': 'contact', 'type': 'text'},
                        '联系电话': {'value': 'contact_phone', 'type': 'text'}
                    }
                },
                api: {
                    method: 'wbm.tp.merchant.store.get_store_list_byCondition',
                    bizparams: {
                        orderBy: '',
                        shop:{},
                        lcCode: '330103',
                        openCode: '331088'
                    }
                },


            }
        },
        methods: {
            getParameter (val) {
                this.form.formInline = val
                this.api.bizparams.shop = JSON.stringify(val)
                this.search()
            },
            search () {
                let link = request.api(this.api.method, this.api.bizparams)
                link.then((data) => {
                    console.log('success')
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试'})
                })
            },
            handleMenuItemClick (command, item) {
                switch (command) {
                    case 'detail':
                        console.log(item)
                        alert('详情：' + item.shop_name)
                        break
                    case 'edit':
                        alert('编辑：' + item.uid)
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

