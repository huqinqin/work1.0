<template>
  <div class="addCategory">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:12px;margin-bottom:12px;border-bottom:solid 1px #eeeeee">
      <el-breadcrumb-item ><a href="http://www.baidu.com">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item ><a href="http://www.baidu.com">商品</a></el-breadcrumb-item>
      <el-breadcrumb-item>发布商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="stepActive" align-center style="padding-bottom:12px;margin-bottom:12px;">
      <el-step title="步骤1" description="选择并确定类目"></el-step>
      <el-step title="步骤2" description="选择或添加商品模板"></el-step>
      <el-step title="步骤3" description="完善商品信息"></el-step>
    </el-steps>
    <lts-search-form @cascAderHandleChange="cascAderHandleChange" :form-fileds="searchform.formFileds" :form-inlines="searchform.formInline" :cascader="searchform.cascader" class="cateform"></lts-search-form>
    <el-card class="box-card" v-if="productList.length > 0">
        <div>
            <div slot="header" class="clearfix">
                <span>商品模板</span>
                <div class="productsearch">
                    <lts-search-form @get-from="getProductParameter" :form-fileds="productsearch.formFileds" :form-inlines="productsearch.formInline"></lts-search-form>
                </div>
            </div>
            <lts-table :t-table="table" :t-pagination="table.pagination" :t-tabledata="productList"  @menuClick="handleMenuItemClick" @currentRowHandleCurrentChange="currentRowHandleCurrentChange" id="spuTable"></lts-table>
            <div @click="addSpuInfo">
                <el-alert
                    title="没有我要的模板"
                    center
                    :closable="false"
                    type="warning">
                </el-alert>
            </div>
        </div>
        <!--<div v-if="productList.length === 0">-->
            <!--该类目下没有产品, <el-button @click="addSpuInfo">新增</el-button>-->
        <!--</div>-->
    </el-card>

  </div>
</template>
<script>
  import {ltsTable,ltsSearchForm} from 'ui'
  import categoryService from '@/services/CategoryService'
  import spuService from '@/services/SpuService'
  export default {
    name : 'selectCategory',
    components : {
      ltsTable,ltsSearchForm
    },
    data(){
      return{
        searchform : {
          formFileds:[
            {
              "search": {
                category: {"label": "","type" : "cascader", "bindValue": "catelist", "bindPlaceholder": "请选择类目","width":'100%'},
              }
            }
          ],
          formInline:{
            catelist : [],
            callbackParameter : [],
          },
          cascader:{
            options:[],
            selectOpotion : [],
          }
        },
        productsearch:{
          formFileds:[
            {
              "search": {
                keywords: {
                  "label": "",
                  "type" : "input",
                  "bindValue": "keywords",
                  "bindPlaceholder": "根据产品名称搜索",
                },
                search:{"bindValue":"搜索","type" : "searchbutton"},
              }
            }
          ],
          formInline:{
            keywords : '',
          },
        },
        table:{
          tableDataForm : 'json',
          isHighlightCurrentRow : true,
          tableField : {
            "产品ID":{"value":"id","type":"text"},
            "产品名称":{"value":"spuName","type":"text"},
            "产品品牌":{"value":"brand","type":"text"},
            "功能": {
              "value": "", "type": "menu", "width": "200", "menulist": [
                {
                  value: "使用",
                  command: 'next',
                }
              ]
            }
          },
          pagination: {
            page : 1,
            pagesize : 10,
            total : 0,
            sizes : [10,20,30],
            layout : "" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
          },
        },
        productList : [],
        selectProduct : null,
        selectCategory : [],

        stepActive : 1,
      }
    },
    created(){
      categoryService.getAllCategoryList().then((data) => {
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
                          val.children = [];
                      }
                  })
              }else{
                  value.children = [];
              }
          });
          this.searchform.cascader.options = data.data;
      })
    },

    methods:{
      handleChange(val){
        console.log(val);
      },
      cascAderHandleChange(val){
        this.selectCategory = val;
        this.stepActive = 2;
        this.getSpuList();
      },
      getSpuList(){
         let index = this.selectCategory.length - 1;
         let category_id = this.selectCategory[index];
         spuService.getSpuList(category_id).then((data) => {
             this.productList = data.datalist;
         })
      },
      currentRowHandleCurrentChange(val){
        this.selectProduct = val;
      },
      handleMenuItemClick(val){
        switch(val){
          case 'next' :
            this.next();
            break;
        }
      },
      next(){
        alert("加载商品");
      },
      getProductParameter(val){
        if(this.selectCategory.length === 0 && val.keywords === ''){
          this.$ltsMessage.show({type:"error",message:'请输入搜索参数'});
          return false;
        }
      },
      addSpuInfo(){
        let params = {category:this.searchform.cascader.options,selectCategory:this.selectCategory};
        this.$router.push({name: 'addSpuInfo',params : params});
      },
    },
  }
</script>
<style lang="less">
  .el-table__body tr.current-row>td{
    background-color: #f0f9eb !important;
  }
  .el-alert{
    cursor: pointer;
  }
  #spuTable{
    padding-bottom:  0px !important;
  }
  .productsearch{
    float: right;
    display: flex;
    align-items: center;
    align-self: center;
    margin-top: -8px;
  }
  .cateform .el-form-item,.el-form-item__content,.el-cascader{
    width: 100%;
  }
</style>
