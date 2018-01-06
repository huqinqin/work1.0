<template>
    <div class="reperList">
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
            <el-form-item :label="handle.type">
              <el-input ></el-input><span>箱</span>
              <el-input ></el-input><span>罐</span>
            </el-form-item>
            <el-form-item v-if="handle.radio !== 3"  :label="handle.type + '后数量'">
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
    export default {
        name: "repertoryManage",
        components: {ltsTable, ltsSearchFrom},
        data(){
            return{
                dialogFormVisible: false,
                handle:{
                  radio:0,
                  type:'1',
                  g:'',
                  k:'',
                  remark:'',
                  operator: ''
                },
                form: {
                    formFileds: [
                        {
                            'search': {
                                shopNmae: {'label': '', 'type': 'input', 'bindValue': 'shopName', 'bindPlaceholder': '搜索产品名称/条码'},
                                date: {'label': '选择时间','type': 'date'},
                                handle: {
                                    'label': '',
                                    'type': 'select',
                                    'bindPlaceholder': '操作类型',
                                    'children':[
                                        {'label': '进货入库', 'bindValue': '0'},
                                        {'label': '调货入库', 'bindValue': '1'},
                                        {'label': '退货入库', 'bindValue': '2'},
                                        {'label': '出库', 'bindValue': '3'},
                                        {'label': '调货出库', 'bindValue': '4'},
                                        {'label': '交易出库', 'bindValue': '5'},
                                        {'label': '预售预出库', 'bindValue': '6'},
                                        {'label': '盘点', 'bindValue': '7'}
                                    ]},
                                search: {'bindValue': '确定', 'type': 'searchbutton'}
                            }
                        }
                    ],
                    formInline: {

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
                        '序号': {'value': 'id', 'type': 'text'},
                        '类目': {'value': 'cate_name', 'type': 'text'},
                        '产品名称': {'value': 'spu_name', 'type': 'text'},
                        '条码': {'value': 'sinr', 'type': 'text'},
                        '规格': {'value': 'unit', 'type': 'text'},
                        '成本价': {'value': 'storage_avg_cost', 'type': 'text'},
                        '功能': {
                          'value': '',
                          'type': 'menu',
                          'width': '500',
                          'menulist': [
                            { value: '采购入库', command: '1' },
                            { value: '调拨入库', command: '2' },
                            { value: '调拨出库', command: '3' },
                            { value: '盘点库存', command: '4' }
                          ]
                        }
                    }
                },
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
            },
            handleClick(tab){

            },
            radio(value){
              switch (value){
                case 1:
                  this.handle.type = '采购入库'
                  break
                case 2:
                  this.handle.type = '调拨入库'
                  break
                case 3:
                  this.handle.type = '调拨出库'
                  break
                case 4:
                  this.handle.type = '盘点库存'
              }
              console.log(this.handle)
            },
            handleMenuItemClick (command, item) {
                this.dialogFormVisible = true;
                this.handle.type = command
            },
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

