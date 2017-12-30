<template>
  <transition name="slide-fade">
    <el-card class="box-card" v-if="isShowOrder">
      <div slot="header" class="clearfix">
        <span>您正在为<el-tag v-for="(val,index) in customerList" :key="val.id" type="success" style="margin:0 5px" @close="handleClose(index)" closable>{{val.value}}</el-tag>下单</span>
        <div style="float: right; padding: 3px 0" @click="closeOrder"><el-button type="primary" >继续下单</el-button></div>
      </div>
      <div class="cart-box">
        <lts-table :t-api="cartItemTable.api" :t-table="cartItemTable" :t-pagination="cartItemTable.pagination" :t-tabledata="cartItemList"  @inputNumberChang="getCartItem"></lts-table>
        <div class="cartbottom">
          <el-tag>
            共<span class="num">{{cart.cartTotal}}</span>
            <span>合计$<span class="num">{{cart.cartPriceTotal}}</span>元</span>
          </el-tag>
          <span class="cart-price"></span>
          <el-button type="primary" >确认订单</el-button>
        </div>
      </div>
    </el-card>
  </transition>
</template>

<script>
  export default {
    name: "cart"
  }
</script>

<style scoped>

</style>
