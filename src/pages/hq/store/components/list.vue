<template>
    <div>
        <el-button type="primary"><router-link to="/add">新增门店</router-link></el-button>
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
                    method: '/hq/store/get_store_list',
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
                        '门店名称': {value: 'shop.shop_name', type: 'text'},
                        '地址': {value: 'shop.address', type: 'text'},
                        '联系人': {value: 'shop.contact', type: 'text', width: '150px'},
                        '联系号码': {value: 'shop.contact_phone', type: 'text', width: '120px'},
                        '状态': {value: 'biz.status_title', type: 'text', width: '80px'},
                        '操作': {
                            value: '',
                            type: 'menu',
                            width: '160',
                            menulist: [
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
                    case 'edit':
                        this.$router.push({path: `/edit/${item.biz.id}`});
                        break;
                    case 'delete':
                        this.$ltsMessage.show('info','删除：' + item.shop.shop_name);
                        break
                }
            },
        }
    }
</script>

<style scoped>

</style>
