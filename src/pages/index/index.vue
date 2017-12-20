<template>
    <div>
      <lts-search-from @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-from>
      <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination"  @menuClick="handleMenuItemClick"></lts-table>
    </div>
</template>
<script>
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  export  default {
    props: '',
    components : {
      ltsTable,ltsSearchFrom
    },
    mounted(){

    },
    data() {
      return {
        api:{
          api: 'wbmApi',
          method: '/mobile/consumer/item/searchItem',
          bizparams:{
            puser_id : 138890,
            shop_id : 21985,
            cate_id : 9494699,
          },
        },
        form:{
          formFileds: [
            {
              "search": {
                input: {"label": this.$t('menu.order'), "bindValue": "user", "bindPlaceholder": "选择审批人"},
                select: {
                  "label": "请选择区域",
                  "bindValue": "area",
                  "children": [{"label": "上海", "bindValue": "shanghai"}, {"label": "北京", "bindValue": "beijing"}]
                },
                date: {"label": "请选择时间", "bindValue": "data_value"}
              }
            },
            {
              "toolbar": {
                input: {"label": this.$t('menu.order'), "bindValue": "user", "bindPlaceholder": "选择审批人"},
                select: {
                  "label": "请选择区域",
                  "bindValue": "area",
                  "children": [{"label": "上海", "bindValue": "shanghai"}, {"label": "北京", "bindValue": "beijing"}]
                },
                date: {"label": "请选择时间", "bindValue": "data_value"}
              }
            }
          ],
          // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
          formInline : {
            test : 2,
            region : '',
            user : '',
            start_date : '',
            end_date : '',
          },
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
            "功能":{"value":"","type":"menu","width":"300","menulist":[
              {
                value:"查看详情",
                command: 'link',
                backgroundColor : 'red'
              },
              {
                value:"测试多个菜单",
                command: 'default',
                children:[
                  {value:"狮子头", command:"detail"},
                  {value:"删除", command:"delete"},
                ]
              }
            ]},
          },
        },
        pagination: {
          page : 1,
          pagesize : 10,
          total : 0,
          sizes : [10,20,30],
          layout : "total, sizes, prev, pager, next, jumper" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
        },
      }
    },
    methods:{
      getParameter(val){
        console.log(val);
         this.form.formInline = val;
      },
      handleMenuItemClick(command,item){
        switch(command){
          case "link":
            alert("设置详情"+item.id);
            break;
          case "detail":
            alert("狮子头" + item.id);
            break;
          case "delete":
            alert("删除" + item.id);
            break;
        }
      },
    }
  }
</script>
<style lang="less">

</style>
