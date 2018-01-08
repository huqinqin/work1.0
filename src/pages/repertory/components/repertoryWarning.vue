<template>
  <div>
    <lts-table :t-api="api"  :t-table="table" :t-pagination="pagination" @menuClick="handleMenuItemClick"></lts-table>
  </div>
</template>


<script>
  import {request} from 'ltsutil'
  import ltsTable from '@/common/components/lts-table.vue'
  export default {
    name: "repertoryWarning",
    components: {ltsTable},
    data(){
      return{
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
            '商品名称': {'value': 'sinr', 'type': 'text'},
            '商品条码': {'value': 'unit', 'type': 'text'},
            '商品规格': {'value': 'storage_avg_cost', 'type': 'text'},
            '安全库存': {'value': 'storage', 'type': 'text'},
            '实际库存': {'value': 'storage_avg', 'type': 'text'},
            '功能': {
              'value': '',
              'type': 'menu',
              'width': '200',
              'menulist': [
                { value: '查看详情', command: 'detail' }
              ]
            }
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
      handleMenuItemClick (command, item) {
        // 库存警告查看详情
        console.log(item)
      },
    }
  }
</script>

<style scoped>

</style>
