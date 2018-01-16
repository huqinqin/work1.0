<template>
  <div>
    <lts-search-form
        :form-fileds="form.formFileds"
        :form-inlines="form.formInline"
        class="cateform"></lts-search-form>
    <lts-table
        :t-api="api"
        :t-form="form.formInline"
        :t-table="table"
        :t-pagination="pagination"
        @menuClick="handleMenuItemClick"></lts-table>
  </div>
</template>
<script>
  import  {ltsSearchForm,ltsTable} from 'ui'
  export default {
    name : 'goodslist',
    components:{
      ltsSearchForm,ltsTable,
    },
    data(){
      return{
        api: {
          method: '/wholesale/item/get_manage_list',
          bizparams: {

          },
        },
        form: {
          formFileds: [
            {
              search: {
                tid: {
                  label: '选择类目',
                  type: 'input',
                  bindValue : 'selectCategory',
                  bindPlaceholder: '选择类目'
                },
                search: {bindValue: "确定", type: "searchbutton"}
              }
            }
          ],
          // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
          formInline: {

          }
        },
        table: {
          tableDataForm: 'api',
          tableField: {
            "": {value: "", type: "selection"},
            "商品名称": {value: "item_name", type: "text"},
            "商品品牌": {value: "item_name", type: "text"},
            "商品图片": {value: "item_name", type: "text"},
            "商品状态": {value: "item_name", type: "text"},
            "商品创建时间": {value: "item_name", type: "text"},
            "商品销售标题": {value: "item_name", type: "text"},
            "商品销量": {value: "item_name", type: "text"},
            "操作": {
              value: "x",
              type: "menu",
              width: "200",
              menulist: [
                {
                  value: "操作",
                  command: 'default',
                  children: [
                    {value: "编辑", command: "edit"},
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
    methods:{
      handleMenuItemClick(val,item){
        if(val == 'edit'){
          console.log(item);
          this.$router.push({name:"editGoods",params : {
            id : item.id,
          }})
        }
      },
    },
    mounted(){

    },
  }
</script>
<style>

</style>
