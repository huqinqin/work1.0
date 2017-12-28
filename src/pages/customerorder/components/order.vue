<template>
  <div>
    1234567
    <div slot="header" class="clearfix">
      <span>您正在为<el-tag v-for="(val,index) in customerList1" :key="val.id" type="success" style="margin:0 5px" @close="handleClose(index)" closable>{{val.value}}</el-tag>抄单</span>
      <div style="float: right; padding: 3px 0" >
        <el-badge :value="cart1.cartTotal" class="item">
          <el-button type="primary" icon="el-icon-goods" :disabled="cartItemList1.length == 0"></el-button>
        </el-badge>
      </div>
    </div>
    <div>
      <lts-search-from @get-from="getItemParameter" :form-fileds="itemform1.formFileds" :form-inlines="itemform1.formInline"></lts-search-from>
      <lts-table :t-api="itemTable1.api" :t-form="itemform1.formInline" :t-table="itemTable1" :t-pagination="itemTable1.pagination" @inputNumberChang="inputNumberChang"></lts-table>
    </div>
  </div>
</template>

<script>
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  export default {
    name: 'order',
    props: [
      'customerList', 'cartItemList', 'cart',
      'itemform', 'itemTable',
      'customerForm'
    ],
    components: {ltsTable, ltsSearchFrom},
    data () {
      return {
        customerList1: this.customerList,
        cartItemList1: this.cartItemList,
        cart1: this.cart,
        itemform1: this.itemform,
        itemTable1: this.itemTable

      }
    },
    methods: {
      inputNumberChang (item) {
        this.$emit('inputNumberChang', item)
      },
      getItemParameter (val) {
        this.itemform.formInline = val
      },
      handleClose (index) {
        this.$emit('handleClose', index)
      }
    }
  }
</script>

<style scoped>

</style>
