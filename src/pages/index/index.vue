<template>
  <div>
    <lts-search-from @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-from>
    <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"  @menuClick="handleMenuItemClick"></lts-table>
  </div>
</template>
<script>
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  export default {
    props: '',
    components: {
      ltsTable, ltsSearchFrom
    },
    mounted () {
    },
    data () {
      return {
        api: {
          api: 'wbmApi',
          method: '/mobile/consumer/item/searchItem',
          bizparams: {
            puser_id: 138890,
            shop_id: 21985,
            cate_id: 9494699
          }
        },
        form: {
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
                user: {"label": "","type" : "autocomplete", "bindValue": "user", "bindPlaceholder": "搜索客户"},
                search:{"bindValue":"确定","type" : "submitbutton"}
              }
            }
          ],
          // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
          formInline: {
            test: 2,
            region: '',
            user: '',
            start_date: '',
            end_date: '',
            // 需要从处理结果另外带回来的参数 存这里 默认返回一条对象。若返回多个。自己
            callbackParameter: {}
          },
          // 若需要使用搜索插件 autocomplete  需要定义好接口来获取后端数据
          autocomplete: {
            api: 'wbmApi',
            method: '/mobile/consumer/item/searchItem'
          }
        },
        table : {
          tableField : {
            "":{"value":"","type":"selection"},
            "名字":{"value":"item_name","type":"text"},
            "ID":{"value":"puser_id","type":"text"},
            "类目ID":{"value":"category_id","type":"text"},
            "价格": {"value":"price_value","type":"text"},
            "类型": {"value":"discount_type","type":"text"},
            "订单数量":{"value":"order_num","type":"text"},
            "abced" : {"value":"id","type":"text"},
            "输入数量":{"value":"","type":"inputNumber"},
            "功能":{"value":"","type":"menu","width":"200","menulist":[
              {
                value:"查看详情",
                command: 'link',
              },
              {
                value:"测试多个菜单",
                command: 'default',
                children:[
                  {value:"狮子头", command:"detail"},
                  {value:"删除", command:"delete"},
                ]
              }
            ]}
          }
        },
        pagination: {
          page: 1,
          pagesize: 10,
          total: 0,
          sizes: [10, 20, 30],
          layout: 'total, sizes, prev, pager, next, jumper' // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
        }
      }
    },
    methods: {
      getParameter (val) {
        console.log(val)
        this.form.formInline = val
      },
      handleMenuItemClick (command, item) {
        switch (command) {
          case 'link':
            alert('设置详情' + item.id)
            break
          case 'detail':
            alert('狮子头' + item.id)
            break
          case 'delete':
            alert('删除' + item.id)
            break
        }
      },
    }
  }
</script>
<style lang="less">

</style>
