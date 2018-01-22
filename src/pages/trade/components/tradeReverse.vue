<template>
  <div class="trade-reverse">
    <lts-search-form
            @get-from="getParameter"
            :form-fileds="form.formFileds"
            :form-inlines="form.formInline"></lts-search-form>
    <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"
               @menuClick="oper"></lts-table>
  </div>
</template>
<script>
  import {ltsTable, ltsSearchForm} from 'ui'
  import {request} from 'ltsutil'

  export default {
    props     : {},
    name      : 'tradeReverse',
    components: {ltsTable, ltsSearchForm},
    data() {
      return {
        api       : {
          method   : '',
          bizparams: {
            user_id: ''
          }
        },
        form      : {
          formFileds: {
            'search':{
              test:{
                tid: {
                  label          : "订单编号",
                  type           : "input",
                  bindValue      : "tid",
                  width          : '120px'
                },
                shop_name: {
                  label          : "店铺名称",
                  type           : "input",
                  bindValue      : "tid",
                  width          : '120px'
                },
                item_name: {
                  label          : "商品名称",
                  type           : "input",
                  bindValue      : "tid",
                  width          : '120px'
                },
                cdate: {
                  label          : "创建时间",
                  type           : "date",
                  bindValue      : "tid",
                  width          : '120px'
                },
                search    : {"bindValue": "搜索", "type": "submitbutton"},
              }
            }
          },
          formInline: {
            page             : 1,
            page_size        : 100,
            order_by         : 'id',
            tid       : '',
            // custom_type : '',
            //需要从处理结果另外带回来的参数 存这里 默认返回一条对象。若返回多个。自己
            callbackParameter: {},
          }
        },
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
            '规格'       : {'value': 'biz_name', 'type': 'text'},
            '订单数量/金额'  : {'value': 'contact', 'type': 'text'},
            '退货数量/金额'  : {'value': 'mount', 'type': 'text'},
            '申请时间/付款时间': {'value': 'cdate', 'type': 'text'},
            '状态'       : {'value': 'state', 'type': 'text'},
            '功能'       : {
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
    methods   : {
      submit() {
      },
      oper() {

      },
      getParameter() {
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
