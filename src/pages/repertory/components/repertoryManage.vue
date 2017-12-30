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
                                shopNmae: {'label': '', 'type': 'input', 'bindValue': 'shopName', 'bindPlaceholder': '搜索产品名称'},
                                contact: {'label': '', 'type': 'input', 'bindValue': 'contact', 'bindPlaceholder': '搜索条码'},
                                cascader: {'label':'', 'type': 'cascader','bindValue': 'cascader','bindPlaceholder': '选择类目',
                                    options:[
                                        {
                                            value: '01',
                                            label: '饮品饮料',
                                            children: [
                                                {value: '01-01',label: '01-01'},
                                                {value: '01-02',label: '01-02'},
                                                {value: '01-03',label: '01-03'},
                                                {value: '01-04',label: '01-04'},
                                                {value: '01-05',label: '01-05'},
                                                {value: '01-06',label: '01-06'}
                                            ]
                                        },
                                        {
                                            value: '02',
                                            label: '粮油副食',
                                            children: [
                                                {value: '02-02',label: '02-02'},
                                                {value: '02-03',label: '02-03'},
                                                {value: '02-04',label: '02-04'},
                                                {value: '02-05',label: '02-05'},
                                                {value: '02-06',label: '02-06'}
                                            ]
                                        },
                                        {
                                            value: '03',
                                            label: '美容洗护',
                                            children: [
                                                {value: '03-01',label: '03-01'},
                                                {value: '03-02',label: '03-02'},
                                                {value: '03-03',label: '03-03'},
                                                {value: '03-04',label: '03-04'}
                                            ]
                                        },
                                        {
                                            value: '04',
                                            label: '休闲零食',
                                            children: [
                                                {value: '04-01',label: '04-01'},
                                                {value: '04-02',label: '04-02'},
                                                {value: '04-03',label: '04-03'},
                                                {value: '04-04',label: '04-04'},
                                                {value: '04-05',label: '04-05'},
                                                {value: '04-06',label: '04-06'},
                                                {value: '04-07',label: '04-07'},
                                                {value: '04-08',label: '04-08'},
                                                {value: '04-09',label: '04-09'},
                                                {value: '04-10',label: '04-10'}
                                            ]
                                        },
                                        {
                                            value: '05',
                                            label: '方便速食',
                                            children: [
                                                {value: '05-01',label: '05-01'},
                                                {value: '05-02',label: '05-02'},
                                                {value: '05-03',label: '05-03'},
                                            ]
                                        }
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
                        '联系电话': {'value': 'contact_phone', 'type': 'text'},
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
                },
                // 级联选择器
                cascader:[
                    {
                        value: '01',
                        label: '饮品饮料',
                        children: [
                            {value: '01-01',label: '01-01'},
                            {value: '01-02',label: '01-02'},
                            {value: '01-03',label: '01-03'},
                            {value: '01-04',label: '01-04'},
                            {value: '01-05',label: '01-05'},
                            {value: '01-06',label: '01-06'}
                        ]
                    },
                    {
                        value: '02',
                        label: '粮油副食',
                        children: [
                            {value: '02-02',label: '02-02'},
                            {value: '02-03',label: '02-03'},
                            {value: '02-04',label: '02-04'},
                            {value: '02-05',label: '02-05'},
                            {value: '02-06',label: '02-06'}
                        ]
                    },
                    {
                        value: '03',
                        label: '美容洗护',
                        children: [
                            {value: '03-01',label: '03-01'},
                            {value: '03-02',label: '03-02'},
                            {value: '03-03',label: '03-03'},
                            {value: '03-04',label: '03-04'}
                        ]
                    },
                    {
                        value: '04',
                        label: '休闲零食',
                        children: [
                            {value: '04-01',label: '04-01'},
                            {value: '04-02',label: '04-02'},
                            {value: '04-03',label: '04-03'},
                            {value: '04-04',label: '04-04'},
                            {value: '04-05',label: '04-05'},
                            {value: '04-06',label: '04-06'},
                            {value: '04-07',label: '04-07'},
                            {value: '04-08',label: '04-08'},
                            {value: '04-09',label: '04-09'},
                            {value: '04-10',label: '04-10'}
                        ]
                    },
                    {
                        value: '05',
                        label: '方便速食',
                        children: [
                            {value: '05-01',label: '05-01'},
                            {value: '05-02',label: '05-02'},
                            {value: '05-03',label: '05-03'},
                        ]
                    }
                ],
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
