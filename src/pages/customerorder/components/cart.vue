<template>
  <div id="cart">
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
        @inputNumberChange="addCart"></lts-table>
      <div class="cartbottom">
        <el-tag>
          共<span class="num">{{cart.cartTotal}}</span>
          <span>合计$<span class="num">{{cart.cartPriceTotal}}</span>元</span>
        </el-tag>
        <span class="cart-price"></span>
        <el-button type="primary" @click="submit">确认订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import cartService from '@/services/CartService.js'
  import orderService from '@/services/OrderService.js'
  export default {
    name: "cart",
    data(){
      return{
        // 购物车商品
        cartItemList: [],
        cart: {
          cartTotal: 0,
          cartPriceTotal: 0,
        },
        cartItemTable: {
          tableDataForm: 'json',
          tableField: {
              "名字": {"value": "item_name", "type": "text"},
              "puserId": {"value": "puser_id", "type": "text"},
              "类目ID": {"value": "category_id", "type": "text"},
              "价格": {"value": "price", "type": "text"},
              "类型": {"value": "discount_type", "type": "text"},
              "订单数量": {"value": "num", "type": "text"},
              "ID": {"value": "id", "type": "text"},
              "输入数量": {"value": "num", "type": "inputNumber", "width": "200px"},
          },
          pagination: {
              page: 1,
              pagesize: 10,
              total: 0,
              sizes: [10, 20, 30],
              layout: "" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
          },
      },
      }
    },
    methods:{
      addCart(item) {
        cartService.putCartPlus(this.customerUid,item).then((data) => {
          this.queryCartList();
        },(msg) => {
          this.$ltsMessage.show({type:"error",message:msg.error_message})
        });
      },
      // 购物车结算
      submit() {
        let items = [];
        this.cartItemList.forEach(function(value,index,array){
          items.push({
            id : value.id,
            num : value.num,
            puser_id : value.puser_id,
            spu_id : 179886,
            item_prop_ids :[
              26,
              27
            ],
          })
        });
        console.log(this.cartItemList);
        let param = {
          "userId":this.customerUid,
          "payMethod":"online",
          "miliPay":0,
          "items":items,
          "remarkList":{
            "37701":"阿亮发货啊",
            "42170":"雨茜发货啊"
          },
          "source":"work.500mi.com.shop.pifa.market"
        }
        orderService.createTrade(param);
      }
    }
  }
</script>

<style scoped>

</style>
