<template>
  <div class="manage">
    <lts-search-from @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-from>
    <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination" @menuClick="handleMenuItemClick"></lts-table>
    <el-dialog title="库存设置" :visible.sync="dialogFormVisible">
      <el-form :model="handle" label-width="80px">
        <el-form-item label="操作类型" prop="radio">
          <el-radio-group v-model="handle.radio" @change="radio">
            <el-radio :label=0>采购入库</el-radio>
            <el-radio :label=1>调拨入库</el-radio>
            <el-radio :label=2>调拨出库</el-radio>
            <el-radio :label=3>盘点库存</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格">{{handle.g}}</el-form-item>
        <el-form-item label="现在库存">{{handle.k}}</el-form-item>
        <el-form-item :label=handle.type class="type">
          <el-input ></el-input><sapn>箱</sapn>
          <el-input ></el-input><span>罐</span>
        </el-form-item>
        <el-form-item v-if="handle.radio !== 3" :label=handle.type>
          12345
        </el-form-item>
        <el-form-item v-if="handle.radio === 3" label="盈？亏">
          54321
        </el-form-item>
        <el-form-item label="变更说明" prop="remark">
          <el-input type="textarea"  v-model="handle.remark" placeholder="库存变更说明"></el-input>
        </el-form-item>
        <el-form-item label="经办人" prop="operator">
          <el-input v-model="handle.operator"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {request} from 'ltsutil'
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  import repertoryHandle from './repertoryHandle.vue'
  export default {
    name: "repertoryManage",
    components: {ltsTable, ltsSearchFrom, repertoryHandle},
    data(){
      return{
        dialogFormVisible: false,
        handle:{
          radio:0,
          type:'采购入库',
          g:'310ml*24罐*1箱',
          k:'10箱0罐',
          remark:'',
          operator: ''
        },
        form: {
          formFileds: [
            {
              'search': {
                shopNmae: {'label': '', 'type': 'input', 'bindValue': 'shopName', 'bindPlaceholder': '搜索产品名称'},
                contact: {'label': '', 'type': 'input', 'bindValue': 'contact', 'bindPlaceholder': '搜索条码'},
                cascader: {'label':'', 'type': 'cascader','bindValue': 'cascader','bindPlaceholder': '选择类目',
                  options:[
                    {
                      value: '01',
                      label: '饮品饮料',
                      children: [
                        {value: '01-01',label: '01-01'},
                        {value: '01-02',label: '01-02'},
                        {value: '01-03',label: '01-03'},
                        {value: '01-04',label: '01-04'},
                        {value: '01-05',label: '01-05'},
                        {value: '01-06',label: '01-06'}
                      ]
                    },
                    {
                      value: '02',
                      label: '粮油副食',
                      children: [
                        {value: '02-02',label: '02-02'},
                        {value: '02-03',label: '02-03'},
                        {value: '02-04',label: '02-04'},
                        {value: '02-05',label: '02-05'},
                        {value: '02-06',label: '02-06'}
                      ]
                    },
                    {
                      value: '03',
                      label: '美容洗护',
                      children: [
                        {value: '03-01',label: '03-01'},
                        {value: '03-02',label: '03-02'},
                        {value: '03-03',label: '03-03'},
                        {value: '03-04',label: '03-04'}
                      ]
                    },
                    {
                      value: '04',
                      label: '休闲零食',
                      children: [
                        {value: '04-01',label: '04-01'},
                        {value: '04-02',label: '04-02'},
                        {value: '04-03',label: '04-03'},
                        {value: '04-04',label: '04-04'},
                        {value: '04-05',label: '04-05'},
                        {value: '04-06',label: '04-06'},
                        {value: '04-07',label: '04-07'},
                        {value: '04-08',label: '04-08'},
                        {value: '04-09',label: '04-09'},
                        {value: '04-10',label: '04-10'}
                      ]
                    },
                    {
                      value: '05',
                      label: '方便速食',
                      children: [
                        {value: '05-01',label: '05-01'},
                        {value: '05-02',label: '05-02'},
                        {value: '05-03',label: '05-03'},
                      ]
                    }
                  ]},
                search: {'bindValue': '确定', 'type': 'searchbutton'}
              }
            }
          ],
          formInline: {
            shopName: '',
            contact: '',
          }
        },
        pagination: {
          page: 1,
          page_size: 10,
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
                  { value: '库存设置', command: 'setting' }
              ]
            }
          }
        },
        // 级联选择器
        cascader:[
          {
            value: '01',
            label: '饮品饮料',
            children: [
              {value: '01-01',label: '01-01'},
              {value: '01-02',label: '01-02'},
              {value: '01-03',label: '01-03'},
              {value: '01-04',label: '01-04'},
              {value: '01-05',label: '01-05'},
              {value: '01-06',label: '01-06'}
            ]
          },
          {
            value: '02',
            label: '粮油副食',
            children: [
              {value: '02-02',label: '02-02'},
              {value: '02-03',label: '02-03'},
              {value: '02-04',label: '02-04'},
              {value: '02-05',label: '02-05'},
              {value: '02-06',label: '02-06'}
            ]
          },
          {
            value: '03',
            label: '美容洗护',
            children: [
              {value: '03-01',label: '03-01'},
              {value: '03-02',label: '03-02'},
              {value: '03-03',label: '03-03'},
              {value: '03-04',label: '03-04'}
            ]
          },
          {
            value: '04',
            label: '休闲零食',
            children: [
              {value: '04-01',label: '04-01'},
              {value: '04-02',label: '04-02'},
              {value: '04-03',label: '04-03'},
              {value: '04-04',label: '04-04'},
              {value: '04-05',label: '04-05'},
              {value: '04-06',label: '04-06'},
              {value: '04-07',label: '04-07'},
              {value: '04-08',label: '04-08'},
              {value: '04-09',label: '04-09'},
              {value: '04-10',label: '04-10'}
            ]
          },
          {
            value: '05',
            label: '方便速食',
            children: [
              {value: '05-01',label: '05-01'},
              {value: '05-02',label: '05-02'},
              {value: '05-03',label: '05-03'},
            ]
          }
        ],
        api: {
          method: 'wbm.tp.merchant.store.get_store_list_byCondition',
          bizparams: {
            orderBy: '',
            shop:{},
            lcCode: '330103',
            openCode: '331088'
          }
        },
      }
    },
    methods: {
      getParameter (val) {
        this.form.formInline = val
        this.api.bizparams.shop = JSON.stringify(val)
        console.log(this.api)
        this.search()
      },
      search () {
        let link = request.api(this.api.method, this.api.bizparams)
        link.then((data) => {
          console.log('success')
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试'})
        })
      },
      handleMenuItemClick (command, item) {
        // 库存设置
        console.log(item)
      },
      radio(value){
        switch (value){
          case 0:
            this.handle.type = '采购入库'
            break
          case 1:
            this.handle.type = '调拨入库'
            break
          case 2:
            this.handle.type = '调拨出库'
            break
          case 3:
            this.handle.type = '盘点库存'
        }
        console.log(this.handle)
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-form-item{
    margin-bottom: 10px;
    line-height: 20px;
    .el-input{
      max-width:60%;
      width:120px;
    }
    .el-input+.el-input{
      margin-left: 20px;
    }
    .el-radio+.el-radio {
      margin-left: 20px;
      .el-radio__label {
        padding-left: 2px;

      }
    }
  }
</style>
