<template>
  <div class="customerorder">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:12px;margin-bottom:12px;border-bottom:solid 1px #eeeeee">
      <el-breadcrumb-item ><a href="http://www.baidu.com">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>代客下单</el-breadcrumb-item>
    </el-breadcrumb>

    <lts-search-from
        @get-from="getCustomerParameter"
        :form-fileds="customerform.formFileds"
        :form-inlines="customerform.formInline"
        :autocomplete="customerform.autocomplete">
    </lts-search-from>
    <!--customerlist show 抄单模块-->
    <div v-if="customerList.length > 0">

      <!--下单-->
      <transition name="slide-fade">
        <el-card class="box-card" v-show="!isShowOrder">
         <div slot="header" class="clearfix">
           <span>您正在为<el-tag
                          v-for="(val,index) in customerList"
                          :key="val.id" type="success"
                          style="margin:0 5px"
                          @close="handleClose(index)"
                          closable>{{val.value}}</el-tag>抄单</span>
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

           <!--<lts-table-->
               <!--:t-api="itemTable.api"-->
               <!--:t-form="itemform.formInline"-->
               <!--:t-table="itemTable"-->
               <!--:t-pagination="itemTable.pagination"-->
               <!--ref="itemTable"-->
               <!--@inputNumberChange="addCart"></lts-table>-->
             <el-table
                 :data="itemTable.tableData"
                 v-loading="loading"
                 style="width: 100%">
                 <el-table-column v-for="(field, index) in itemTable.tableField"
                          v-if="field.type === 'text' || field.type === 'selection'"
                          :key="field.value"
                          :type="field.type"
                          :prop="field.value"
                          :width="field.width"
                          :label="index">
                 </el-table-column>
                 <el-table-column v-for="(field, index) in itemTable.tableField"
                                  v-if="field.type === 'popver'"
                                  :key="field.value"
                                  :type="field.type"
                                  :width="field.width"
                                  :label="index">
                     <template slot-scope="scope">
                         <el-popover
                             placement="left"
                             width="400"
                             trigger="click">
                             <el-form  label-width="70px" class="demo-ruleForm">
                                 <el-form-item  prop="name" v-for="prop in scope.row.item_prop_value_maps" :label="prop.prop_name" :key="prop.prop_name">
                                     <el-radio-group v-model="prop.checked_prop" >
                                         <el-radio-button  v-for="propvalue in prop.prop_values" :label="propvalue.value" :disabled="!propvalue.can_checked" :key="propvalue.value" :click="checkedProp(prop,scope.row)"></el-radio-button>
                                     </el-radio-group>
                                 </el-form-item>
                                 <el-form-item label="数量">
                                     <el-input-number size="mini" v-model="scope.row.num"></el-input-number> <span>库存{{checkedSpu.storage}}</span>
                                 </el-form-item>
                                 <el-form-item>
                                     <el-button type="primary" @click="addCart(scope.row)">立即购买</el-button>
                                 </el-form-item>
                             </el-form>
                             <el-button type="primary" slot="reference">加入购物车</el-button>
                         </el-popover>
                     </template>
                 </el-table-column>
             </el-table>
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
                :t-api="cardirectivesinsertedtItemTable.api"
                :t-table="cartItemTable"
                :t-pagination="cartItemTable.pagination"
                :t-tabledata="cartItemList"
                @inputNumberChange="addCart"></lts-table>
            <div class="cartbottom">
              <el-tag>
                共<span class="num">{{cart.cartTotal}}</span>
                <span>合计$<span class="num">{{cart.cartPriceTotal}}</span>元</span>
              </el-tag>
              <span class="cart-price"></span>
              <el-button type="primary" @click="addCart(item)">确认订单</el-button>
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
  import cartService from '@/services/CartService.js'
  import orderService from '@/services/OrderService.js'
  import goodsService from '@/services/GoodsService.js'
  export default {
      props: '',
      components: {
        ltsTable, ltsSearchFrom
      },
      data () {
          return {
              customerform: {
                  formFileds: [
                      {
                          'search': {
                              custom_vip: {
                                  'label': '客户分组',
                                  'type': 'select',
                                  'bindValue': 'custom_vip',
                                  'bindPlaceholder': '所有客户',
                                  'children': [{'label': '上海', 'bindValue': 'shanghai'}, {
                                      'label': '北京',
                                      'bindValue': 'beijing'
                                  }]
                              },
                              custom_type: {
                                  'label': '搜索类型',
                                  'type': 'select',
                                  'bindValue': 'custom_type',
                                  'bindPlaceholder': '所有类型',
                                  'children': [{'label': '网店名称', 'bindValue': '1'}, {
                                      'label': '网店联系人',
                                      'bindValue': '2'
                                  }, {'label': '手机', 'bindValue': '3'}]
                              },
                              user: {
                                  'label': '',
                                  'type': 'autocomplete',
                                  'bindValue': 'shopName',
                                  'bindPlaceholder': '搜索客户',
                              },
                              search: {'bindValue': '确定', 'type': 'submitbutton'},
                          }
                      }
                  ],
                  // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
                  formInline: {
                      page: 1,
                      page_size: 100,
                      order_by: 'id',
                      shopName: '',
                      // custom_vip : '',
                      // custom_type : '',
                      //需要从处理结果另外带回来的参数 存这里 默认返回一条对象。若返回多个。自己
                      callbackParameter: {},
                  },
                  // 若需要使用搜索插件 autocomplete  需要定义好接口来获取后端数据
                  autocomplete: {
                      api: '',
                      method: '/installer/getStoreList',
                      //定义一个转换的key autocomplete插件需要把显示的字段的key定义成value
                      autoShowKey: 'shop_name',
                      //参数回调函数 目前的用法是来处理返回结果
                      callBack: this.getJsonData,
                      bizparams: {}
                  },
              },
              itemform: {
                  formFileds: [
                      {
                          'search': {
                              order_by: {
                                  'label': '',
                                  'type': 'select',
                                  'bindValue': 'sort',
                                  'bindPlaceholder': '排序方式',
                                  'children': [
                                      {'label': 'id降序', 'bindValue': 'id desc'},
                                      {'label': 'id升序', 'bindValue': 'id'},
                                      {'label': 'order_num降序', 'bindValue': 'order_num desc'},
                                      {'label': 'rank降序', 'bindValue': 'rank desc'},
                                  ]
                              },
                              // short_search: {
                              //   "label": "",
                              //   "type" : "input",
                              //   "bindValue": "short_search",
                              //   "bindPlaceholder": "搜索短编码",
                              // },
                              itemName: {
                                  'label': '',
                                  'type': 'input',
                                  'bindValue': 'itemName',
                                  'width': '300px',
                                  'bindPlaceholder': '请输入商品名称或者条形码',
                              },
                              // brand_search: {
                              //   "label": "",
                              //   "type" : "input",
                              //   "bindValue": "item_name",
                              //   "bindPlaceholder": "请输入品牌",
                              // },
                              search: {'bindValue': '搜索', 'type': 'searchbutton'},
                          }
                      }
                  ],
                  // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
                  formInline: {
                      // sort: 'id desc',
                      // itemName: "111",
                      //需要从处理结果另外带回来的参数 存这里 默认返回一条对象。若返回多个。自己
                      callbackParameter: {},
                  },
              },
              itemTable: {
                  api: {
                      method: '/wholesale/item/getList',
                      bizparams: {
                          user_id: '',
                      },
                  },
                  tableData: [],
                  tableField: {
                      '名字': {'value': 'item_name', 'type': 'text'},
                      'ID': {'value': 'puser_id', 'type': 'text'},
                      '类目ID': {'value': 'category_id', 'type': 'text'},
                      '价格': {'value': 'price', 'type': 'text'},
                      '类型': {'value': 'discount_type', 'type': 'text'},
                      '订单数量': {'value': 'order_num', 'type': 'text'},
                      'abced': {'value': 'id', 'type': 'text'},
                      '属性': {'value': '', 'type': 'popver', 'width': '200px'},
                  },
                  pagination: {
                      page: 1,
                      pagesize: 10,
                      total: 0,
                      sizes: [10, 20, 30],
                      layout: 'total, sizes, prev, pager, next, jumper' // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                  },
              },
              cartItemTable: {
                  tableDataForm: 'json',
                  tableField: {
                      '名字': {'value': 'item_name', 'type': 'text'},
                      'puserId': {'value': 'puser_id', 'type': 'text'},
                      '类目ID': {'value': 'category_id', 'type': 'text'},
                      '价格': {'value': 'price', 'type': 'text'},
                      '类型': {'value': 'discount_type', 'type': 'text'},
                      '订单数量': {'value': 'num', 'type': 'text'},
                      'ID': {'value': 'id', 'type': 'text'},
                      '输入数量': {'value': 'num', 'type': 'inputNumber', 'width': '200px'},
                  },
                  pagination: {
                      page: 1,
                      pagesize: 10,
                      total: 0,
                      sizes: [10, 20, 30],
                      layout: '' // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                  },
              },
              // 抄单客户
              customerList: [],
              customerUid: '',
              // 购物车商品
              cartItemList: [],
              cart: {
                  cartTotal: 0,
                  cartPriceTotal: 0,
              },

              isShowOrder: false,

              callBack: Function,

              loading: false,

              radio3: '上海',

              checkedSpu: {},
          }
      },
      methods: {
          getCustomerParameter (val) {
              if (!val.callbackParameter.value) {
                  this.$ltsMessage.show({'type': 'error', 'message': '请选择客户'})
                  return false
              }
              this.customerUid = val.callbackParameter.uid
              this.customerList.push(val.callbackParameter)
              this.getItemList()
              this.queryCartList(this.customerUid)
          },
          getItemList () {
              goodsService.getList(this.customerUid).then((data) => {
                  this.itemTable.tableData = data.datalist
              }, (msg) => {
                  this.$ltsMessage.show({type: 'error', mseeage: msg.errorMessage})
              })
          },
          getItemParameter (val) {
              this.itemform.formInline = val
          },
          // 添加购物车
          addCart (item) {
              cartService.putCartPlus(this.customerUid, item, this.checkedSpu).then((data) => {
                  this.queryCartList()
              }, (msg) => {
                  this.$ltsMessage.show({type: 'error', message: msg.error_message})
              })
          },
          queryCartList () {
              cartService.queryCartList(this.customerUid).then((data) => {
                  this.cartItemList = data.datalist
              }, (msg) => {
                  this.$ltsMessage.show({type: 'error', message: msg.error_message})
              })
          },
          handleClose (index) {
              this.customerList.splice(index, 1)
              if (this.customerList.length === 0) {
                  this.cartItemList = []
                  this.isShowOrder = false
              }
          },
          showOrder () {
              this.isShowOrder = true
          },
          closeOrder () {
              this.isShowOrder = false
              this.$refs.itemTable.refresh()
          },
          getJsonData (json) {
              if (json) {
                  for (const value of json) {
                      value.value = value.shop_name
                  }
                  return json
              }
          },
          checkedProp (prop, data, checkedValue) {
              if (prop.checked_prop != '') {
                  this.skuMapEach(prop, data)
              }
          },
          skuMapEach (prop, data) {
              let key = prop.prop_name
              let prop_value = {}
              let checked_sku_prop = {}
              // 匹配sku
              checked_sku_prop[key] = prop.checked_prop
              // 匹配库存
              prop_value[key] = prop.checked_prop
              if (data.item_prop_value_maps.length > 1) {
                  data.item_prop_value_maps.forEach((value, index, array) => {
                      if (value.prop_name !== prop.prop_name) {
                          checked_sku_prop[value.prop_name] = value.checked_prop
                          this.equalsProp(checked_sku_prop, data.item_struct_props, 'checkedSku')
                          value.prop_values.forEach((val, key, array) => {
                              prop_value[value.prop_name] = val.value
                              val.can_checked = this.equalsProp(prop_value, data.item_struct_props)
                          })
                      }
                  })
              } else {
                  this.equalsProp(prop_value, data.item_struct_props)
              }
          },
          equalsProp (propObj, skuList, type) {
              let Boolean = 0 // 0 false, 1 true;
              let self = this
              try {
                  skuList.forEach(function (sku, index, array) {
                      let clone_prop = JSON.parse(sku.prop_value)
                      let count = 0
                      for (let key in propObj) {
                          if (!clone_prop[key]) {
                              Boolean = 0
                              return false
                          }
                          if (clone_prop[key] == propObj[key]) {
                              count++
                          } else {
                              Boolean = 0
                              return false
                          }
                      }
                      if (count >= 2 && sku.storage > 0) {
                          if (type == 'checkedSku') {
                              self.checkedSpu = sku
                          }
                          Boolean = 1
                          // 跳出循环抛出的异常 别删
                          throw new Error('foreach.break')
                      } else {
                          Boolean = 0
                      }
                      return false
                  })
              } catch (e) {
                  if (e === 'foreach.break') return
              }
              if (Boolean == 1) {
                  return true
              } else {
                  return false
              }
          },
          // 购物车结算
          submit () {
              let items = []
              this.cartItemList.forEach(function (value, index, array) {
                  items.push({
                      id: value.id,
                      num: value.num,
                      puser_id: value.puser_id,
                      spu_id: 179886,
                      item_prop_ids: [
                          26,
                          27
                      ],
                  })
              })
              console.log(this.cartItemList)
              let param = {
                  'userId': this.customerUid,
                  'payMethod': 'online',
                  'miliPay': 0,
                  'items': items,
                  'remarkList': {
                      '37701': '阿亮发货啊',
                      '42170': '雨茜发货啊'
                  },
                  'source': 'work.500mi.com.shop.pifa.market'
              }
              orderService.createTrade(param)
          }
      },
      mounted () {
          let array = []
          let itemlist = this.itemTable.tableData
      },
      watch: {
          cartItemList: {
            deep: true,
            handler(newval, oldval) {
              this.cart.cartTotal = 0;
              this.cart.cartPriceTotal = 0;
              newval.forEach((value, index, array) => {
                if (value.num === 0) {
                  array.splice(index, 1);
                }
                this.cart.cartTotal = parseInt(value.num) + parseInt(this.cart.cartTotal);
                this.cart.cartPriceTotal += parseInt(value.num) * parseInt(value.price);
              })
            }
          },
      }
  }
</script>
<style lang="less">
.customerorder{
    .el-radio-button{
        margin-right: 5px;
    }
    .el-radio-button__inner{
        border-radius: 4px;
    }
}

</style>
