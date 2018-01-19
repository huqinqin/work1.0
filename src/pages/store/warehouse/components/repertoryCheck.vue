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
    name: "repertoryCheck",
    components: {ltsTable, ltsSearchFrom},
    data(){
      return{
        form: {
          formFileds: [
            {
              'search': {
                shopNmae: {'label': '', 'type': 'input', 'bindValue': 'shopName', 'bindPlaceholder': '搜索产品名称/条码'},
                date: {'label': '选择时间','type': 'date'},
                search: {'bindValue': '确定', 'type': 'searchbutton'}
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
          tableDataForm: 'api', // json
          tableField: {
            '序号': {'value': 'id', 'type': 'text'},
            '操作时间': {'value': 'cate_name', 'type': 'text'},
            '供货商': {'value': 'spu_name', 'type': 'text'},
            '产品名称': {'value': 'sinr', 'type': 'text'},
            '产品条码': {'value': 'unit', 'type': 'text'},
            '操作类型': {'value': 'storage_avg_cost', 'type': 'text'},
            '出入数量': {'value': 'storage', 'type': 'text'},
            '剩余库存': {'value': 'storage_avg', 'type': 'text'},
            '操作备注': {'value': 'storage_', 'type': 'text'},
          }
        },
        api: {
          method: '/sku/query_list',
          bizparams: {
            wholesale_sku_query : {}
          }
        },
      }
    },
    methods:{
      getParameter (val) {
        console.log('获取查询参数')
        this.search()
      },
      search () {
        console.log('调接口')
      },
      handleMenuItemClick (command, item) {
        console.log('列表操作')
      },
    }
  }
</script>

<style scoped>

</style>
