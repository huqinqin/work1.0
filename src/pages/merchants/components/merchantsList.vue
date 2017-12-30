<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <router-link to="/edit">编辑</router-link>
    </el-breadcrumb>
    <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-form>
    <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination" @menuClick="handleMenuItemClick"></lts-table>
  </div>
</template>

<script>
  import {request} from 'ltsutil'
  import {ltsTable,ltsSearchForm} from 'ui'

  export default {
    name: 'list',
    components: {
      ltsTable, ltsSearchForm
    },
    data () {
      return {
        api: {
          method: 'wbm.tp.merchant.store.get_store_list_byCondition',
          bizparams: {
            orderBy: '',
            shop:{}
          }
        },
        form: {
          formFileds: [
            {
              'search': {
                shopNmae: {'label': '', 'type': 'input', 'bindValue': 'shopName', 'bindPlaceholder': '搜索店铺名称'},
                submit: {'bindValue': '确定', 'type': 'submitbutton'}
              }
            }
          ],
          formInline: {
            shopName: '',
            lcCode: '330103',
            openCode: '331088'
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
          datalist: true,
          tableDataForm: 'api', // json
          tableField: {
            '名字': {'value': 'shop_name', 'type': 'text'},
            '地址': {'value': 'address', 'type': 'text'},
            '联系人': {'value': 'contact', 'type': 'text'},
            '联系电话': {'value': 'contact_phone', 'type': 'text'},
            '功能': {
              'value': '',
              'type': 'menu',
              'width': '200',
              'menulist': [
                { value: '详情', command: 'detail' },
                { value: '菜单',
                  command: 'default',
                  children: [
                    {value: '编辑', command: 'link', link: '/edit'},
                    {value: '删除', command: 'delete'}
                  ]
                }
              ]
            }
          }
        }
      }
    },
    methods: {
      handleMenuItemClick (command, item) {
        switch (command) {
          case 'detail':
            console.log(item)
            alert('详情：' + item.shop_name)
            break
          case 'edit':
            alert('编辑：' + item.uid)
            break
          case 'delete':
            alert('删除：' + item.shop_name)
            break
        }
      },
      getParameter (val) {
        this.form.formInline = val
        this.api.bizparams.shop = JSON.stringify(val)
        this.search()
      },
      search () {
        let link = request.api(this.api.method, this.api.bizparams)
        link.then((data) => {
          console.log('success')
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试'})
        })
      }
    },
    created(){
      this.api.bizparams.shop = JSON.stringify(this.form.formInline)
    },
    watch: {
      form: {
        handler: function () {
          this.api.bizparams.shop = JSON.stringify(this.form.formInline)
          console.log(this.api.bizparams.shop)
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
