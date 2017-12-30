<template>
  <div>
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
    <lts-search-from @cascAderHandleChange="cascAderHandleChange" :form-fileds="searchform.formFileds" :form-inlines="searchform.formInline" :cascader="searchform.cascader" class="cateform"></lts-search-from>
    <el-card class="box-card" v-if="productList.length > 0">
      <div slot="header" class="clearfix">
        <span>商品模板</span>
        <div class="productsearch">
          <lts-search-from @get-from="getProductParameter" :form-fileds="productsearch.formFileds" :form-inlines="productsearch.formInline"></lts-search-from>
        </div>
      </div>
      <lts-table :t-table="table" :t-pagination="table.pagination" :t-tabledata="productList"  @menuClick="handleMenuItemClick" @currentRowHandleCurrentChange="currentRowHandleCurrentChange"></lts-table>
      <router-link to="/addSpuInfo">
        <el-alert
          title="没有我要的模板"
          center
          :closable="false"
          type="warning">
        </el-alert>
      </router-link>
    </el-card>
  </div>
</template>
<script>
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  const categorylist = [
    {
      "name":"厂家直销厂家直销厂家直销厂家直销厂家直销厂家直销厂家直销厂家直销厂家直销厂家直销厂家直销",
      "id":"1840842222",
      "second_category":[
        {
          "aggregate_objs":"182039",
          "id":"9484005",
          "item_count":0,
          "name":"冰冻榴莲",
          "owner_type":1,
          "owner_uid":138890,
          "second_category":[
            {
              "id":"9494701",
              "name":"速冻食品",
              "owner_type":101,
              "owner_uid":163464
            },
            {
              "id":"9494702",
              "name":"海鲜水产",
              "owner_type":101,
              "owner_uid":163464
            },
            {
              "id":"9494703",
              "name":"速冻饮品",
              "owner_type":101,
              "owner_uid":163464
            }
          ],
          "show_child":false,
          "type":"分销类目"
        },
        {
          "aggregate_objs":"182388",
          "id":"9484025",
          "item_count":0,
          "name":"百年老店",
          "owner_type":1,
          "owner_uid":138890,
          "second_category":[

          ],
          "show_child":false,
          "type":"分销类目"
        },
        {
          "aggregate_objs":"182280",
          "id":"9494589",
          "item_count":0,
          "name":"大希地",
          "owner_type":1,
          "owner_uid":138890,
          "second_category":[

          ],
          "show_child":false,
          "type":"分销类目"
        },
        {
          "aggregate_objs":"183988",
          "id":"9495633",
          "item_count":0,
          "name":"世界到家",
          "owner_type":1,
          "owner_uid":138890,
          "second_category":[

          ],
          "show_child":false,
          "type":"分销类目"
        }
      ],
      "show_child":false,
      "type":"厂家直销"
    },
    {
      "id":"9494699",
      "item_count":0,
      "name":"生鲜速冻",
      "owner_type":101,
      "owner_uid":163464,
      "second_category":[
        {
          "name":"全部",
          "id":"9494699",
          "second_category":[

          ],
          "show_child":false,
          "type":"默认排序"
        },
        {
          "id":"9494700",
          "name":"猪牛羊肉",
          "owner_type":101,
          "owner_uid":163464
        }
      ],
      "show_child":false,
      "type":"标准类目"
    },
  ];
  export  default {
    name : 'selectCategory',
    components : {
      ltsTable,ltsSearchFrom
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
            "名字":{"value":"item_name","type":"text"},
            "ID":{"value":"puser_id","type":"text"},
            "类目ID":{"value":"category_id","type":"text"},
            "价格": {"value":"price_value","type":"text"},
            "类型": {"value":"discount_type","type":"text"},
            "订单数量":{"value":"order_num","type":"text"},
            "abced" : {"value":"id","type":"text"},
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
      categorylist.forEach(function(value,index,array){
        value.value = value.id;
        value.label = value.name;
        if(value.second_category.length > 0){
          value.children = value.second_category;
          value.second_category.forEach(function(val,key){
            val.value = val.id;
            val.label = val.name;
            if(val.second_category && val.second_category.length > 0){
              val.children = val.second_category;
              val.second_category.forEach(function(threeval,threekey){
                threeval.value = threeval.id;
                threeval.label = threeval.name;
              })
            }
          })
        }
      });
      this.searchform.cascader.options = categorylist;
    },
    mounted(){

    },
    methods:{
      handleChange(val){
        console.log(val);
      },
      cascAderHandleChange(val){
        this.selectCategory = val;
        this.stepActive = 2;
        this.productList = [{
          "id":1945899,
          "item_name":"西班牙海鲜饭",
          "promotion_title":"",
          "puser_id":138890,
          "category_id":"138890999",
          "tag":"",
          "url":"99e5d6b0f83491ed081b4cb566ec8f7a.jpg",
          "image_value":"http://res.500mi.com/item/99e5d6b0f83491ed081b4cb566ec8f7a.jpg",
          "price_value":"29.00",
          "price_real_value":"19.00",
          "spec_value":"325g",
          "follow_num":0,
          "storage":-4,
          "status":6,
          "discount_type":2,
          "num":0,
          "attribute":1073746432,
          "type":0,
          "order_num":5,
          "isBuynu":false,
          "isStart":false,
          "isEnding":false,
          "sale_rule":{
            "limit_buy":0
          },
          "send_rule":{
            "discount":1000,
            "discountType":2,
            "express":"3,4/WEEK",
            "sendTime":"每周星期三，星期四",
            "sku0Time":"2017-06-27 11:43:29",
            "type":3
          },
          "is_member_exclusive":false
        },
          {
            "id":1944833,
            "item_name":"哈根达斯芒果味82g",
            "promotion_title":"",
            "puser_id":138890,
            "category_id":9494699,
            "tag":"",
            "url":"108741a04f015bcb670b37ad50a822e1.jpg",
            "image_value":"http://res.500mi.com/item/108741a04f015bcb670b37ad50a822e1.jpg",
            "price_value":"35.00",
            "price_real_value":"35.00",
            "spec_value":"82g",
            "follow_num":0,
            "storage":-1,
            "status":1,
            "discount_type":0,
            "num":0,
            "attribute":4608,
            "type":0,
            "order_num":1,
            "isBuynu":true,
            "is_member_exclusive":false
          }];
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
        console.log(val);
        if(this.selectCategory.length == 0  &&  val.keywords == ''){
          this.$ltsMessage.show({type:"error",message:'请输入搜索参数'});
          return false;
        }
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
  #lts-table{
    padding-bottom:  0px !important;
  }
  .productsearch{
    float: right;
    display: flex;
    align-items: center;
    align-self: center;
    margin-top: -8px;
  }
  .cateform .el-form-item,.el-form-item__content{
    width: 100%;
  }
</style>
