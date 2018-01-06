<template>
  <div>
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
          <lts-table
            :t-api="itemTable.api"
            :t-form="itemform.formInline"
            :t-table="itemTable"
            :t-pagination="itemTable.pagination"
            ref="itemTable"
            @inputNumberChange="addCart"></lts-table>
        </div>
      </el-card>
    </transition>
  </div>
</template>

<script>
  import {ltsTable,ltsSearchForm} from 'ui'
  export default {
    name: 'order',
    components: {ltsTable, ltsSearchForm},
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
