<template>
  <div>
    <router-link to="./add">123</router-link>
    <lts-search-from @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-from>
    <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"></lts-table>
    <!--@menuClick="handleMenuItemClick"-->


  </div>
</template>

<script>
  import Request from 'request'
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  export default {
    name: 'list',
    components: {
      ltsTable, ltsSearchFrom
    },
    data () {
      return {
        api: {
          api: 'wbmApi',
          method: '/gateway/api',
          bizparams: {}
        },
        form: {
          formFileds: [
            {
              'search': {
                // shopType: {
                //   'label': '门店类型',
                //   'type': 'select',
                //   'bindValue': 'type',
                //   'bindPlaceholder': '所有类型',
                //   'children': [{'label': '加盟店', 'bindValue': '加盟店'}, {'label': '普通店', 'bindValue': '普通店'}, {'label': '直营店', 'bindValue': '直营店'}]
                // },
                // shopNmae: {'label': '', 'type': 'input', 'bindValue': 'shopName', 'bindPlaceholder': '搜索店铺名称'},
                orderBy: {
                  'label': '排序',
                  'type': 'select',
                  'bindValue': 'orderBy',
                  'bindPlaceholder': 'id/uid/pid',
                  'children': [{'label': 'id', 'bindValue': 'id'}, {'label': 'pid', 'bindValue': 'pid'}, {'label': 'uid', 'bindValue': 'uid'}]
                },
                openCode: {'label': '', 'type': 'input', 'bindValue': 'openCode', 'bindPlaceholder': 'openCode'},
                shopNmae: {'label': '', 'type': 'input', 'bindValue': 'shopName', 'bindPlaceholder': '搜索店铺名称'},
                search: {'bindValue': '确定', 'type': 'submitbutton'}
              }
            }
          ],
          formInline: {
            app_key: '00000-500mi',

            method: 'wbm.tp.merchant.store.get_store_list',
            openCode: 'PP32V2IX',
            page: 1,
            pageSize: 100,
            orderBy: '',
            session: 111
            //
            // // 需要从处理结果另外带回来的参数 存这里 默认返回一条对象。若返回多个。自己
            // callbackParameter: {}
          },
          autocomplete: {
            api: 'wbmApi',
            method: '/gateway/api',
            autoShowKey: 'shop_name',
            callBack: this.getJsonData
          }
        },
        pagination: {
          page: 1,
          pagesize: 10,
          total: 0,
          sizes: [10, 20, 30],
          layout: 'total, sizes, prev, pager, next, jumper' // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
        },
        table: {
          tableDataForm: 'api', // json
          tableField: {
            '':{"value":"","type":"selection"},
            '名字':{"value":"shop_name","type":"text"},
            '地址':{"value":"address","type":"text"},
            '联系人':{"value":"concact","type":"text"},
            '联系电话': {"value":"contact_phone","type":"text"}
            // 'abced': {"value":"id","type":"text"},
            // '输入数量':{"value":"","type":"inputNumber"},
            // '功能':{"value":"","type":"menu","width":"200","menulist":[
            //     {
            //       value:"查看详情",
            //       command: 'link'
            //     },
            //     {
            //       value:"测试多个菜单",
            //       command: 'default',
            //       children:[
            //         {value:"狮子头", command:"detail"},
            //         {value:"删除", command:"delete"},
            //       ]
            //     }
            //   ]}
          }
        }
      }
    },
    methods: {
      getParameter (val) {
        console.log(val)
        this.form.formInline = val
        this.search()
      },
      search () {
        console.log(this.form.formInline)
        let link = Request.wbmApi(this.api.method, this.form.formInline)
        link.then((data) => {
          console.log('success')
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试'})
        })
      }
    }
  }
</script>

<style scoped>

</style>
