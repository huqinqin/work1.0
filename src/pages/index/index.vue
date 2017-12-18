<template>
    <div>
      <lts-search-from @get-from="getParameter"></lts-search-from>
      <lts-table v="table" @refresh></lts-table>
    </div>
</template>
<script>
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  import UserService from '@/services/UserService.js'
  const userService = new UserService();
  const tableField = {
    "名称":{"value":"item_name","type":"text"},
    "ID":{"value":"puser_id","type":"text"},
    "类目ID":{"value":"category_id","type":"text"},
    "价格": {"value":"price_value","type":"text"},
    "类型": {"value":"discount_type","type":"text"},
    "订单数量":{"value":"order_num","type":"text"},
    "abced" : {"value":"id","type":"text"},
  };
  export  default {
    props: '',
    components : {
      ltsTable,ltsSearchFrom
    },
    mounted(){
    },
    data() {
      return {
        "table" : {
          "api": 'wbmApi',
          "method": '/mobile/consumer/item/searchItem',
          "pagination": {
            total : 0,
            layout : "total, sizes, prev, pager, next, jumper" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
          },
          "comparams":{
            page : 1,
            pagesize : 10,
          },
          "bizparams":{
            puser_id : 138890,
            shop_id : 21985,
            cate_id : 9494699,
          },
          tableField : tableField,
          "searchparams" : {
            test : 2,
          },
        },
      }
    },
    methods:{
      getParameter(val){
         this.table.searchparams.test = val;
      }
    }
  }
</script>
<style lang="less">

</style>
