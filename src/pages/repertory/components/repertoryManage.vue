<template>
  <div class="manage">
    <lts-search-from @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-from>
    <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination" @menuClick="handleMenuItemClick"></lts-table>
    <el-dialog title="库存设置" :visible.sync="dialogFormVisible">
      <el-form :model="handle" label-width="80px" label-position="right">
        <el-form-item label="操作类型" prop="radio" :rules="[{ required: true}]">
          <el-radio-group v-model="handle.radio" @change="radio">
            <el-radio :label=10001>采购入库</el-radio>
            <el-radio :label=10002>调拨入库</el-radio>
            <el-radio :label=20002>调拨出库</el-radio>
            <el-radio :label=30002>盘点库存</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格">{{handle.unit}}</el-form-item>
        <el-form-item label="现在库存">{{handle.total + handle.unit}}</el-form-item>
        <el-form-item :label="handle.type" prop="input">
          <el-input v-model="handle.input" @input="inputChange"></el-input><span>{{handle.unit}}</span>
        </el-form-item>
        <el-form-item v-if="handle.radio !== 30002 && handle.input !== ''"  :label="handle.type + '后数量'">
          {{handle.count + handle.unit}}
        </el-form-item>
        <el-form-item v-if="handle.radio === 30002 && handle.input !== '' && handle.count >= 0" label="盘盈" style="color:green;">
          {{handle.count + handle.unit}}
        </el-form-item>
        <el-form-item v-if="handle.radio === 30002 && handle.input !== '' && handle.count < 0" label="盘亏" style="color:red;">
          {{handle.count + handle.unit}}
        </el-form-item>
        <el-form-item label="变更说明" prop="remark" :rules="[{ required: true}]">
          <el-input type="textarea"  v-model="handle.remark" placeholder="库存变更说明"></el-input>
        </el-form-item>
        <el-form-item label="经办人" prop="operator" :rules="[{ required: true}]">
          <el-input v-model="handle.operator"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import repertoryService from '@/services/RepertoryService.js'
  import ltsTable from '@/common/components/lts-table.vue'
  import ltsSearchFrom from '@/common/components/lts-search-from.vue'
  export default {
    name: "repertoryManage",
    components: {ltsTable, ltsSearchFrom},
    data(){
      return{
        dialogFormVisible: false,
        handle:{
          radio:'',
          type:'采购入库',
          unit:'台',
          total:20,
          input:'',
          count: '',
          remark:'',
          operator: '',
          sku_id:''
        },
        form: {
          formFileds: [
            {
              'search': {
                keywords: {'label': '', 'type': 'input', 'bindValue': 'keywords', 'bindPlaceholder': '搜索产品名称/条码'},
                cids: {
                  'label':'',
                  'type': 'cascader',
                  'bindValue': 'cids',
                  'bindPlaceholder': '选择类目',
                  'options':[{
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
                  },{
                    value: '02',
                    label: '粮油副食',
                    children: [
                      {value: '02-02',label: '02-02'},
                      {value: '02-03',label: '02-03'},
                      {value: '02-04',label: '02-04'},
                      {value: '02-05',label: '02-05'},
                      {value: '02-06',label: '02-06'}
                    ]
                  },{
                    value: '03',
                    label: '美容洗护',
                    children: [
                      {value: '03-01',label: '03-01'},
                      {value: '03-02',label: '03-02'},
                      {value: '03-03',label: '03-03'},
                      {value: '03-04',label: '03-04'}
                    ]
                  },{
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
                  },{
                    value: '05',
                    label: '方便速食',
                    children: [
                      {value: '05-01',label: '05-01'},
                      {value: '05-02',label: '05-02'},
                      {value: '05-03',label: '05-03'},
                    ]}
                  ]},
                search: {'bindValue': '确定', 'type': 'searchbutton'}
              }
            }
          ],
          formInline: {
            keywords: '',
            cids: [],
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
          tableDataForm: 'api', // json
          tableField: {
            '序号': {'value': 'id', 'type': 'text'},
            '类目': {'value': 'cate_name', 'type': 'text'},
            '产品名称': {'value': 'spu_name', 'type': 'text'},
            '条码': {'value': 'sinr', 'type': 'text'},
            '规格': {'value': 'unit', 'type': 'text','width':'80'},
            '成本价': {'value': 'storage_avg_cost', 'type': 'text','width':'80'},
            '功能': {
              'value': '',
              'type': 'menu',
              'width': '500',
              'menulist': [
                { value: '采购入库', command: '10001' },
                { value: '调拨入库', command: '10002' },
                { value: '调拨出库', command: '20002' },
                { value: '盘点库存', command: '30002' }
              ]
            }
          },
          // tableField: {
          //   '名字': {'value': 'shop_name', 'type': 'text'},
          //   '地址': {'value': 'address', 'type': 'text'},
          //   '联系人': {'value': 'contact', 'type': 'text'},
          //   '联系电话': {'value': 'contact_phone', 'type': 'text'},
          //   '功能': {
          //     'value': '',
          //     'type': 'menu',
          //     'width': '500',
          //     'menulist': [
          //         { value: '库存设置', command: 'setting' }
          //     ]
          //   }
          // }
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
          method: '/sku/query_list',
          bizparams: {
            wholesale_sku_query : {}
          }
        },
        activeName : 'manage',
      }
    },
    methods: {
      getParameter (val) {
        this.form.formInline = val
        console.log(this.api)
        this.search()
      },
      search () {
        let getManageList = repertoryService.repertoryManage(this.form.formInline,this.pagination)
        getManageList.then((data) => {
          console.log('success')
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
        })
      },
      handleMenuItemClick (command, item) {
          // 库存设置
          this.dialogFormVisible = true
          this.handle.radio = command
          this.handle.unit = item.storage_units[0].unit
          this.handle.total = item.storage_units[0].storage
          this.handle.sku_id = item.id
          console.log(item)
      },
      radio(value){
        switch (value){
          case 10001:
            this.handle.type = '采购入库'
            break
          case 10002:
            this.handle.type = '调拨入库'
            break
          case 20002:
            this.handle.type = '调拨出库'
            break
          case 30002:
            this.handle.type = '盘点库存'
        }
        this.inputChange()
      },
      inputChange(){
        switch(this.handle.radio){
          case 10001:
          case 10002:
            this.handle.count = this.handle.total + (+this.handle.input)
            break
          case 20002:
            this.handle.count = this.handle.total - (+this.handle.input)
            break
          case 30002:
            this.handle.count = (+this.handle.input) - this.handle.total
        }
      },
      submit(){
        console.log(this.handle)
        let handle = repertoryService.repertoryHandle(this.handle)
        handle.then(data => {
            console.log(data)
        },(msg) => {
            this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
        })
        this.dialogFormVisible = false
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
