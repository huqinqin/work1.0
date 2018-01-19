<template>
    <div class="manage">
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline" />
        <lts-table :t-api="api" :t-form="form.formInline" :t-table="table" :t-pagination="pagination" :datalist="datalist" @menuClick="handleMenuItemClick" />
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
                    <el-input v-model="handle.input" @input="inputChange"></el-input>
                    <span>{{handle.unit}}</span>
                </el-form-item>
                <el-form-item v-if="handle.radio !== 30002 && handle.input !== ''" :label="handle.type + '后数量'">
                    {{handle.count + handle.unit}}
                </el-form-item>
                <el-form-item v-if="handle.radio === 30002 && handle.input !== '' && handle.count >= 0" label="盘盈">
                    <span class="text-success">{{handle.count + handle.unit}}</span>
                </el-form-item>
                <el-form-item v-if="handle.radio === 30002 && handle.input !== '' && handle.count < 0" label="盘亏"
                              class="text-danger">
                    {{handle.count + handle.unit}}
                </el-form-item>
                <el-form-item label="变更说明" prop="remark" :rules="[{ required: true}]">
                    <el-input type="textarea" v-model="handle.remark" placeholder="库存变更说明"></el-input>
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
    import repertoryService from '@/services/RepertoryService'
    import categoryService from '@/services/CategoryService'
    import {ltsTable, ltsSearchForm} from 'ui'
    import {dataConvertorUtils} from 'ltsutil'

    export default {
        components: {ltsTable, ltsSearchForm},
        data() {
            return {
                datalist: [],
                dialogFormVisible: false,
                handle: {
                    radio: '',
                    type: '采购入库',
                    unit: '台',
                    total: 20,
                    input: '',
                    count: '',
                    remark: '',
                    operator: '',
                    sku_id: ''
                },
                api: {
                    method: '/sku/query_list',
                    bizparams: {
                        wholesale_sku_query: {}
                    }
                },
                form: {
                    formFileds: [
                        {
                            search: {
                                keywords: {
                                    'label': '',
                                    type: 'input',
                                    'bindValue': 'keywords',
                                    'bindPlaceholder': '搜索产品名称/条码'
                                },
                                cids: {
                                    'label': '',
                                    type: 'cascader',
                                    'bindValue': 'cids',
                                    'bindPlaceholder': '选择类目',
                                    options: []
                                },
                                search: {'bindValue': '搜索', type: 'searchbutton'}
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
                    tableDataForm: 'api',
                    tableField: {
                        '类目': {value: 'cate_name', type: 'text', width: 100},
                        '产品名称': {value: 'spu_name', type: 'text'},
                        '条码': {value: 'sinr', type: 'text', width: 140},
                        '规格': {value: 'unit', type: 'text', width: 100},
                        '成本价': {value: 'storage_avg_cost', type: 'text', width: 100},
                        '操作': {
                            value: '',
                            type: 'menu',
                            width: '400',
                            menulist: [
                                {value: '采购入库', command: '10001'},
                                {value: '调拨入库', command: '10002'},
                                {value: '调拨出库', command: '20002'},
                                {value: '盘点库存', command: '30002'}
                            ]
                        }
                    },
                },
            }
        },
        methods: {
            getParameter(val) {
                this.form.formInline = val
                this.search()
            },
            search() {
                repertoryService.repertoryManage(this.form.formInline, this.pagination).then((resp) => {
                    this.datalist = resp.datalist;
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            handleMenuItemClick(command, item) {
                // 库存设置
                this.dialogFormVisible = true
                this.handle.radio = command
                this.handle.unit = item.storage_units[0].unit
                this.handle.total = item.storage_units[0].storage
                this.handle.sku_id = item.id
            },
            radio(value) {
                switch (value) {
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
            inputChange() {
                switch (this.handle.radio) {
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
            submit() {
                console.log(this.handle)
                repertoryService.repertoryHandle(this.handle).then(data => {
                    console.log(data)
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
                this.dialogFormVisible = false
            },
            getCateTree(){
                categoryService.getAllCategoryListForTree().then((resp)=>{
                    this.form.formFileds[0].search.cids.options = resp.datalist;
                },(error)=>{

                });
            }
        },
        mounted(){
            this.getCateTree();
        }
    }
</script>

<style lang="less" scoped>
    .el-form-item {
        margin-bottom: 10px;
        line-height: 20px;
        .el-input {
            max-width: 60%;
            width: 120px;
        }
        .el-input + .el-input {
            margin-left: 20px;
        }
        .el-radio + .el-radio {
            margin-left: 20px;
            .el-radio__label {
                padding-left: 2px;

            }
        }
    }
</style>
