<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:12px;margin-bottom:12px;border-bottom:solid 1px #eeeeee">
      <el-breadcrumb-item ><a href="http://www.baidu.com">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>待客下单</el-breadcrumb-item>
    </el-breadcrumb>
    <lts-search-from @get-from="getCustomerParameter" :form-fileds="customerform.formFileds" :form-inlines="customerform.formInline" :autocomplete="customerform.autocomplete"></lts-search-from>
    <!--customerlist show 抄单模块-->
    <div v-if="customerList.length > 0">
      <el-card class="box-card">
       <div slot="header" class="clearfix">
         <span>您正在为<el-tag v-for="(val,index) in customerList" :key="val.id" type="success" style="margin:0 5px" @close="handleClose(index)" closable>{{val.value}}</el-tag>抄单</span>
         <el-badge :value="cartTotal" class="item" style="float: right; padding: 3px 0" ><el-button type="primary" icon="el-icon-goods"></el-button></el-badge>
       </div>
       <div>
         <lts-search-from @get-from="getItemParameter" :form-fileds="itemform.formFileds" :form-inlines="itemform.formInline"></lts-search-from>
         <lts-table :t-api="itemTable.api" :t-form="itemform.formInline" :t-table="itemTable" :t-pagination="itemTable.pagination" @inputNumberChang="getCartItem"></lts-table>
       </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  export  default {
    props: '',
    components : {
      ltsTable,ltsSearchFrom
    },
    mounted(){
    },
    data() {
      return {
        customerform:{
          formFileds: [
            {
              "search": {
                custom_vip: {
                  "label": "客户分组",
                  "type" : "select",
                  "bindValue": "custom_vip",
                  "bindPlaceholder": "所有客户",
                  "children": [{"label": "上海", "bindValue": "shanghai"}, {"label": "北京", "bindValue": "beijing"}]
                },
                custom_type: {
                 "label": "搜索类型",
                 "type" : "select",
                 "bindValue": "custom_type",
                 "bindPlaceholder": "所有类型",
                 "children": [{"label": "网店名称", "bindValue": "1"}, {"label": "网店联系人", "bindValue": "2"},{"label": "手机", "bindValue": "3"}]
                },
                user: {"label": "","type" : "autocomplete", "bindValue": "keywords", "bindPlaceholder": "搜索客户",},
                search:{"bindValue":"确定","type" : "submitbutton"},
              }
            }
          ],
          // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
          formInline : {
            custom_vip : '',
            custom_type : '',
            keywords : '',
            //需要从处理结果另外带回来的参数 存这里 默认返回一条对象。若返回多个。自己
            callbackParameter : {},
          },
          // 若需要使用搜索插件 autocomplete  需要定义好接口来获取后端数据
          autocomplete : {
            api: 'wbmApi',
            method: '/mobile/consumer/item/searchItem',
          },
        },
        itemform : {
          formFileds: [
            {
              "search": {
                short_search: {
                  "label": "",
                  "type" : "input",
                  "bindValue": "short_search",
                  "bindPlaceholder": "搜索短编码",
                },
                batch_search: {
                  "label": "",
                  "type" : "input",
                  "bindValue": "batch_search",
                  "width":"300px",
                  "bindPlaceholder": "请输入商品名称或者条形码",
                },
                brand_search: {
                  "label": "",
                  "type" : "input",
                  "bindValue": "item_name",
                  "bindPlaceholder": "请输入品牌",
                },
                search:{"bindValue":"搜索","type" : "searchbutton"},
              }
            }
          ],
          // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
          formInline : {
            short_search : '',
            batch_search : '',
            item_name : '',
            //需要从处理结果另外带回来的参数 存这里 默认返回一条对象。若返回多个。自己
            callbackParameter : {},
          },
        },
        itemTable:{
          api:{
            api: 'wbmApi',
            method: '/mobile/consumer/item/searchItem',
            bizparams:{
              puser_id : 138890,
              shop_id : 21985,
              cate_id : 9494699,
            },
          },
          tableField : {
            "名字":{"value":"item_name","type":"text"},
            "ID":{"value":"puser_id","type":"text"},
            "类目ID":{"value":"category_id","type":"text"},
            "价格": {"value":"price_value","type":"text"},
            "类型": {"value":"discount_type","type":"text"},
            "订单数量":{"value":"order_num","type":"text"},
            "abced" : {"value":"id","type":"text"},
            "输入数量":{"value":"num","type":"inputNumber","width":"200px"},
          },
          pagination: {
            page : 1,
            pagesize : 10,
            total : 0,
            sizes : [10,20,30],
            layout : "total, sizes, prev, pager, next, jumper" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
          },
        },
        // 抄单客户
        customerList : [],
        // 购物车商品
        cartItemList : [],
        cartTotal : 0,
      }
    },
    methods:{
      getCustomerParameter(val){
        if(!val.callbackParameter.value){
          this.$ltsMessage.show({"type":"error","message":"请选择客户"})
          return false;
        }
        this.customerList.push(val.callbackParameter);
      },
      getItemParameter(val){
        this.itemform.formInline = val;
      },
      getCartItem(item){
        if(this.cartItemList.length == 0){
          this.cartItemList.push(item);
        }else{
          let count = 0;
          for(let value of this.cartItemList){
            if(value.id == item.id){
              count++;
              value.num += item.num;
              break;
            }
          }
          if(count === 0){
            this.cartItemList.push(item);
          }
        }
      },
      handleClose(index){
         this.customerList.splice(index,1);
      },
    },
    watch:{
      cartItemList:{
        deep:true,
        handler(newval,oldval) {
          console.log(newval);
          this.cartTotal = 0;
          for(let value in newval){
            this.cartTotal = parseInt(newval[value].num) + parseInt(this.cartTotal);
          }
        }
      }
    }
  }
</script>
<style lang="less">

</style>
