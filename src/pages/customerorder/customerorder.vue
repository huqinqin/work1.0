<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:12px;margin-bottom:12px;border-bottom:solid 1px #eeeeee">
      <el-breadcrumb-item ><a href="http://www.baidu.com">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>代客下单</el-breadcrumb-item>
    </el-breadcrumb>

    <lts-search-from
        @get-from="getCustomerParameter"
        :form-fileds="customerform.formFileds"
        :form-inlines="customerform.formInline"
        :autocomplete="customerform.autocomplete"></lts-search-from>
    <!--customerlist show 抄单模块-->
    <div v-if="customerList.length > 0">

      <!--下单-->
      <transition name="slide-fade">
        <el-card class="box-card" v-show="!isShowOrder">
         <div slot="header" class="clearfix">
           <span>您正在为<el-tag v-for="(val,index) in customerList" :key="val.id" type="success" style="margin:0 5px" @close="handleClose(index)" closable>{{val.value}}</el-tag>抄单</span>
           <div @click="showOrder" style="float: right; padding: 3px 0" >
             <el-badge :value="cart.cartTotal" class="item">
               <el-button type="primary" icon="el-icon-goods" :disabled="cartItemList.length == 0"></el-button>
             </el-badge>
           </div>
         </div>
         <div>
           <lts-search-from
               @get-from="getItemParameter"
               :form-fileds="itemform.formFileds"
               :form-inlines="itemform.formInline"></lts-search-from>
           <lts-table
               :t-api="itemTable.api"
               :t-form="itemform.formInline"
               :t-table="itemTable"
               :t-pagination="itemTable.pagination"
               @inputNumberChang="getCartItem"></lts-table>
         </div>
        </el-card>
      </transition>

      <!--购物车-->
      <transition name="slide-fade">
        <el-card class="box-card" v-if="isShowOrder">
          <div slot="header" class="clearfix">
            <span>您正在为<el-tag v-for="(val,index) in customerList" :key="val.id" type="success" style="margin:0 5px" @close="handleClose(index)" closable>{{val.value}}</el-tag>下单</span>
            <div style="float: right; padding: 3px 0" @click="closeOrder"><el-button type="primary" >继续下单</el-button></div>
          </div>
          <div class="cart-box">
            <lts-table
                :t-api="cartItemTable.api"
                :t-table="cartItemTable"
                :t-pagination="cartItemTable.pagination"
                :t-tabledata="cartItemList"
                @inputNumberChang="getCartItem"></lts-table>
            <div class="cartbottom">
              <el-tag>
                共<span class="num">{{cart.cartTotal}}</span>
                <span>合计$<span class="num">{{cart.cartPriceTotal}}</span>元</span>
              </el-tag>
              <span class="cart-price"></span>
              <el-button type="primary" @click="submit">确认订单</el-button>
            </div>
          </div>
        </el-card>
      </transition>
    </div>
  </div>
</template>
<style lang="less">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .cart-box{
    position: relative;
  }
  .cartbottom{
    position: absolute;
    right:3px;
    bottom:0;
    color: #000;
    .el-tag{
      color: #333;
    }
    .num{
      color: #409EFF;
    }
  }
</style>
<script>
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  import customerOrderService from '@/services/customerOrderService.js'
  export default {
    props: '',
    components : {
      ltsTable,ltsSearchFrom
    },
    mounted(){
      console.log(this.cartItemTable.api);
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
            //定义一个转换的key autocomplete插件需要把显示的字段的key定义成value
            autoShowKey : 'item_name',
            //参数回调函数 目前的用法是来处理返回结果
            callBack : this.getJsonData,
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
        cartItemTable:{
          tableDataForm : 'json',
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
            layout : "" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
          },
        },
        // 抄单客户
        customerList : [],
        // 购物车商品
        cartItemList : [],
        cart: {
          cartTotal : 0,
          cartPriceTotal : 0,
        },

        isShowOrder :false,

        callBack : Function,
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
        if(this.cartItemList.length === 0){
          this.cartItemList.push(item);
        }else{
          let count = 0;
          for(let value of this.cartItemList){
            if(value.id === item.id){
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
         if(this.customerList.length === 0){
           this.cartItemList = [];
           this.isShowOrder = false;
         }
      },
      showOrder(){
        this.isShowOrder = true;
      },
      closeOrder(){
        this.isShowOrder = false;
      },
      getJsonData : function(json){
        if(json){
          for(const value of json){
            value.value = value.item_name;
          }
          return json;
        }
      },
      submit(){
        let params = {
            customerList: this.customerList,
            cartItemList: this.cartItemList
        }
        alert('购物车结算')
      }
    },
    watch:{
      cartItemList:{
        deep:true,
        handler(newval,oldval) {
          this.cart.cartTotal = 0;
          this.cart.cartPriceTotal = 0;
          newval.forEach((value,index,array) => {
            if(value.num === 0){
              array.splice(index,1);
            }
            this.cart.cartTotal = parseInt(value.num) + parseInt(this.cart.cartTotal);
            this.cart.cartPriceTotal += parseInt(value.num) * parseInt(value.price_real_value);
          })
        }
      }
    }
  }
</script>
<style lang="less">

</style>
