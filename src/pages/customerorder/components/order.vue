<template>
  <div id="order">
    <transition name="slide-fade">
        <div slot="header" class="clearfix">
           <span>您正在为<el-tag
             v-for="(val,index) in customerList"
             :key="val.id" type="success"
             style="margin:0 5px"
             @close="handleClose(index)"
             closable>{{val.value}}</el-tag>抄单</span>
          <div @click="showOrder" style="float: right; padding: 3px 0" >
            <el-badge :value="cart.cartTotal" class="item">
              <el-button type="primary" icon="el-icon-goods" :disabled="cartItemListLength == 0"></el-button>
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
            ref="itemTable"
            @inputNumberChange="addCart"></lts-table>
        </div>
    </transition>
  </div>
</template>

<script>
    import {ltsTable,ltsSearchForm} from 'ui'
  import cartService from '@/services/CartService.js'
  export default {
    name: 'order',
    components: {ltsTable, ltsSearchForm},
    data () {
      return {
          // 抄单客户
          customerList: [],
          itemTable: {
              api: {
                  method: '/wholesale/item/getList',
                  bizparams: {
                      user_id: '',
                  },
              },
              tableField: {
                  "名字": {"value": "item_name", "type": "text"},
                  "ID": {"value": "puser_id", "type": "text"},
                  "类目ID": {"value": "category_id", "type": "text"},
                  "价格": {"value": "price", "type": "text"},
                  "类型": {"value": "discount_type", "type": "text"},
                  "订单数量": {"value": "order_num", "type": "text"},
                  "abced": {"value": "id", "type": "text"},
                  "输入数量": {"value": "num", "type": "inputNumber", "width": "200px"},
              },
              pagination: {
                  page: 1,
                  pagesize: 10,
                  total: 0,
                  sizes: [10, 20, 30],
                  layout: "total, sizes, prev, pager, next, jumper" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
              },
          },
          itemform: {
              formFileds: [
                  {
                      "search": {
                          order_by: {
                              "label": "",
                              "type": "select",
                              "bindValue": "sort",
                              "bindPlaceholder": "排序方式",
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
                              "label": "",
                              "type": "input",
                              "bindValue": "itemName",
                              "width": "300px",
                              "bindPlaceholder": "请输入商品名称或者条形码",
                          },
                          // brand_search: {
                          //   "label": "",
                          //   "type" : "input",
                          //   "bindValue": "item_name",
                          //   "bindPlaceholder": "请输入品牌",
                          // },
                          search: {"bindValue": "搜索", "type": "searchbutton"},
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
          cartItemListLength:0,
          cart: {
              cartTotal: 0,
              cartPriceTotal: 0,
          },

      }
    },
    methods: {
        getItemParameter(val) {
            this.itemform.formInline = val;
        },
        handleClose(index) {
            this.customerList.splice(index, 1);
            if (this.customerList.length === 0) {
                this.cartItemList = [];
                this.isShowOrder = false;
            }
        },
        showOrder() {
            this.isShowOrder = true;
        },
        // 添加购物车
        addCart(item) {
            cartService.putCartPlus(this.customerUid,item).then((data) => {
                this.queryCartList();
            },(msg) => {
                this.$ltsMessage.show({type:"error",message:msg.error_message})
            });
        },
        queryCartList(){
            cartService.queryCartList(this.customerUid).then((data) => {
                this.cartItemListLength = data.data.length;
            },(msg) => {
                this.$ltsMessage.show({type:"error",message:msg.error_message})
            })
        },
    }
  }
</script>

<style scoped>

</style>
