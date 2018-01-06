<template>
  <div class="trade-reverse">
    <!--查询条件-->
    <el-form ref="form" :model="form" :rules="rules" label-position="left">
      <el-form-item label="订单编号" label-width="110px" prop="bizName">
        <el-input v-model="form.bizName"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" label-width="110px" prop="bizEname">
        <el-input v-model="form.bizEname"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" label-width="110px" prop="bizEname">
        <el-input v-model="form.bizEname"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" label-width="110px" prop="bizEname">
        <el-input v-model="form.bizEname"></el-input>
        -
        <el-input v-model="form.bizEname"></el-input>
      </el-form-item>
      <el-form-item label="" label-width="110px">
        <el-button type="primary" @click="submit">登记</el-button>
        <el-button type="error" @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>

    <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"
               @menuClick="oper"></lts-table>
  </div>
</template>
<script>
  import {request} from 'ltsutil'
  import segmentsService from '@/services/SegmentsService'

  export default {
    props  : {},
    name   : 'tradeReverse',
    data() {
      return {
        api       : '',
        form      : {},
        pagination: {
          page    : 1,
          pagesize: 10,
          total   : 0,
          sizes   : [10, 20, 30],
          layout  : 'total, sizes, prev, pager, next, jumper' // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
        },
        table     : {
          datalist     : true,
          tableDataForm: 'api', // json
          tableField   : {
            '订单编号/商品信息': {'value': 'biz_ename', 'type': 'text'},
            '规格': {'value': 'biz_name', 'type': 'text'},
            '订单数量/金额': {'value': 'contact', 'type': 'text'},
            '退货数量/金额' : {'value': 'status_cname', 'type': 'text'},
            '申请时间/付款时间' : {'value': 'status_cname', 'type': 'text'},
            '状态' : {'value': 'status_cname', 'type': 'text'},
            '功能' : {
              'value'   : '',
              'type'    : 'menu',
              'width'   : '200',
              'menulist': [
                {value: '详情', command: 'detail'},
                {
                  value   : '菜单',
                  command : 'default',
                  children: [
                    {value: '退款详情', command: 'detail'},
                    {value: '复核', command: 'return'},
                    {value: '入/驳/关/备', command: 'multi'}
                  ]
                }
              ]
            }
          }
        }
      }
    },
    methods: {
      submit() {
        let formData    = Object.assign({}, this.form);
        let addSegments = segmentsService.addSegmentsItem(formData)
        addSegments.then((data) => {
          console.log('success')
        }, (msg) => {
          console.log(msg)
          this.$ltsMessage.show({type: 'error', message: msg.error_message})
        })
      },
      oper() {

      }
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
  .trade-reverse {

  }
</style>
