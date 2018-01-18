<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"/>
        <el-button type="primary">
            <router-link to="/add">新增工程商</router-link>
        </el-button>
        <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination" @menuClick="handleMenuItemClick"/>
    </div>
</template>

<script>
    import {request} from 'ltsutil'
    import {ltsTable, ltsSearchForm} from 'ui'
    import installerService from '@/services/InstallerService'

    export default {
        components: {
            ltsTable, ltsSearchForm
        },
        data() {
            return {
                api: {
                    method: '/store/installer/get_list',
                    bizparams: {
                        order_by: 'id',
                    }
                },
                form: {
                    formFileds: [
                        {
                            'search': {
                                shopNmae: {
                                    'label': '',
                                    type: 'input',
                                    'bindValue': 'shopName',
                                    'bindPlaceholder': '搜索店铺名称'
                                },
                                submit: {'bindValue': '搜索', type: 'submitbutton'}
                            },
                        }
                    ],
                    formInline: {
                        shopName: '',
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
                        '工程商名称': {value: 'shop_name', type: 'text'},
                        '地址': {value: 'address', type: 'text'},
                        '联系人': {value: 'contact', type: 'text', width: '150px'},
                        '联系电话': {value: 'contact_phone', type: 'text', width: '120px'},
                        '状态': {value: 'status_title', type: 'text', width: '80px'},
                        '操作': {
                            value: '',
                            type: 'menu',
                            width: '160',
                            menulist: [
                                {value: '编辑', command: 'link', link: '/edit/', linkDataKey: 'id'},
                                {value: '删除', command: 'delete', type:'' },
                            ]
                        }
                    }
                }
            }
        },
        methods: {
            handleMenuItemClick(command, item) {
                switch (command) {
                    case 'delete':
                        this.$ltsMessage.show({type:'info', message: '删除：' + item.shop_name});
                        break;
                    default:

                }
            },
            getParameter(val) {
                this.form.formInline = val
                this.api.bizparams = JSON.stringify(val)
                this.getList()
            },
            getList() {
                installerService.getList(this.api.bizparams, this.pagination).then((data) => {
                    console.log('success')
                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message})
                })
            }
        },
    }
</script>

<style scoped>

</style>
