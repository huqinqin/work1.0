<template>
  <div class="productList">
    <lts-search-form @cascAderHandleChange="cascAderHandleChange" :form-fileds="form.formFileds" :form-inlines="form.formInline" :cascader="form.cascader" class="cateform"></lts-search-form>
    <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"
               @menuClick="handleMenuItemClick"></lts-table>
  </div>
</template>
<script>
  import  {ltsSearchForm,ltsTable} from 'ui'
  import  categoryService from '@/services/CategoryService'
  export default {
    name : 'productList',
    components:{
      ltsSearchForm,ltsTable,
    },
    data(){
      return{
        api: {
          method: '/spu/getList',
          bizparams: {
            spu : {cids : null},
          },
        },
        form: {
          formFileds: [
            {
              search: {
                tid: {
                  label: '选择类目',
                  type: 'cascader',
                  bindValue : 'selectCategory',
                  bindPlaceholder: '选择类目'
                },
                search: {bindValue: "确定", type: "searchbutton"}
              }
            }
          ],
          // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
          formInline: {

          },
          cascader:{
            options:[],
            selectOpotion : [],
          }
        },
        table: {
          tableDataForm: 'api',
          tableField: {
            "": {value: "", type: "selection"},
            "产品名称": {value: "spuName", type: "text"},
            "操作": {
              value: "x",
              type: "menu",
              width: "200",
              menulist: [
                {
                  value: "操作",
                  command: 'default',
                  children: [
                    {value: "编辑", command: "link"},
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
      cascAderHandleChange(val){
          this.api.bizparams.spu.cids = val.pop();
      },
      handleMenuItemClick(){

      },
    },
    mounted(){
      categoryService.getAllCategoryList().then((data)=>{
        data.data.forEach(function(value,index,array){
          value.value = value.id;
          value.label = value.name;
          if(value.children.length > 0){
            value.children.forEach(function(val,key){
              val.value = val.id;
              val.label = val.name;
              if(val.children && val.children.length > 0){
                val.children.forEach(function(threeval,threekey){
                  threeval.value = threeval.id;
                  threeval.label = threeval.name;
                  threeval.children = ""; // 到三级类目不在展开
                })
              }else{
                val.children = "";
              }
            })
          }else{
            value.children = "";
          }
        });
        this.form.cascader.options = data.data;
      });
    },
  }
</script>
<style lang="less" scoped>

</style>
