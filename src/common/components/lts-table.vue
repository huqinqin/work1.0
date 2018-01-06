<template>
    <div style="position: relative;padding-bottom: 60px">
        <el-table
            :data="table.tableData"
            v-loading="loading"
            style="width: 100%">
            <el-table-column v-for="(field, index) in table.tableField"
                             v-if="field.type === 'text' || field.type === 'selection'"
                             :key="field.value"
                             :type="field.type"
                             :prop="field.value"
                             :width="field.width"
                             :label="index">
            </el-table-column>
            <el-table-column v-for="(field, index) in table.tableField"
                             v-if="field.type === 'menu' || field.type === 'inputNumber'"
                             :key="field.value"
                             :label="index"
                             :width="field.width">
                <template slot-scope="scope">
                    <div v-if="field.type === 'menu'">
                        <div v-for="(menu,key) in field.menulist" style="display: inline-block;margin-right: 10px">
                            <el-dropdown @command="handleCommand" :key="menu.value" v-if="menu.children">
                                <el-button :type="menu.type" size="medium">
                                    {{menu.value}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown" v-if="menu.children">
                                    <el-dropdown-item v-for="(submenu,index) in menu.children" :key="submenu.command"
                                       :command="submenu.command" :data="scope.row">
                                        <router-link v-if="submenu.command === 'link'" :to="submenu.link + scope.row[submenu.linkDataKey]">{{submenu.value}}</router-link>
                                        <span v-else>{{submenu.value}}</span>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button v-else type="primary" size="medium" :background-color="menu.backgroundColor"
                                       @click="menuClick(menu.command, scope.row)">
                                {{menu.value}}
                            </el-button>
                        </div>
                    </div>
                    <div v-else-if="field.type === 'inputNumber'">
                        <el-input-number v-model="scope.row[field.value]" :data="scope.row" size="small"
                                         @change="inputNumberhandleChange(scope.row)"  :min="0"></el-input-number>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="text-align: right;margin-top:20px"
            :current-page="pagination.page.default"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize.default"
            :layout="pagination.layout"
            :total="pagination.total.default">
        </el-pagination>
    </div>
</template>
<style>
    .el-pagination {
        position: absolute;
        bottom: 10px;
        right: 20px;
        z-index: 111;
    }
</style>
<script>
    import {request} from 'ltsutil'

    export default {
        name: 'lts-table',
        props: [
            'tApi', 'tForm', 'tTable', 'TPagination', 'tTabledata'
        ],
        data() {
            return {
                api: this.tApi,
                // FORM搜索参数
                formInline: this.tForm,
                num: 1,
                table: {
                    // 渲染TABLE列表LIST
                    tableData: [],
                    // TABLE显示定义的字段
                    tableField: this.tTable.tableField,
                    // TABLE显示需要的业务参数
                    datalist: this.tTable.datalist
                },
                pagination: {
                    page: {
                        type: Number,
                        default: this.TPagination.page
                    },
                    pageSize: {
                        type: Number,
                        default: this.TPagination.pagesize,
                    },
                    total: {
                        type: Number,
                        default: this.TPagination.total,
                    },
                    pageSizes: this.TPagination.sizes,// table切换页数的分组
                    layout: this.TPagination.layout,
                },
                loading: false
            }
        },

        mounted() {
            if (this.tTable.tableDataForm && this.tTable.tableDataForm === 'json') {
                this.table.tableData = this.tTabledata;
            } else {
                this.getTableList();
            }
        },
        methods: {
            /**
             * 获取数据接口
             * 参数定义 {}
             * 直接渲染列表
             */
            getTableList() {
                this.loading = true
                let link = request.api(this.tApi.method, this.getParameter())
                link.then((resp) => {
                    this.loading = false
                    this.table.tableData = resp.data || resp.datalist
                    this.pagination.total.default = resp.total
                }, (msg) => {
                    this.loading = false
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },

            /**
             * 封装table接口需要的参数
             * @return JSON.stringify(Object)
             */
            getParameter() {
                /**
                 * 加入公共的参数
                 * @type {number|*}
                 */
                this.tApi.bizparams.page = this.pagination.page.default
                this.tApi.bizparams.page_size = this.pagination.pageSize.default
                /**
                 * 加入搜索的参数
                 * Object.assign 后一个参数会覆盖前面的
                 * @type {number|*}
                 */
                let parameter = Object.assign({}, this.tApi.bizparams, this.formInline)
                for (let i in parameter) {
                    let param = parameter[i];
                    if (typeof param === "object") {
                        parameter[i] = JSON.stringify(param);
                    }
                }
                return parameter
            },

            /**
             * 分页组件的方法 可往父组件传 但是建议在内部处理
             * pageSize 改变时会触发
             * http://element.eleme.io/#/zh-CN/component/pagination
             */
            handleSizeChange(val) {
                this.pagination.pageSize.default = val
                this.getTableList()
            },

            /**
             * 分页组件的方法 可往父组件传 但是建议在内部处理
             * currentPage 改变时会触发
             * http://element.eleme.io/#/zh-CN/component/pagination
             */
            handleCurrentChange(val) {
                this.pagination.page.default = val
                this.getTableList()
            },

            /**
             * 有单选或者是全选
             * 选中前面inputbox 改变时会触发
             * http://element.eleme.io/#/zh-CN/component/table
             */
            handleSelectionChange(val) {
                console.log(val)
            },
            /**
             * inpueNumber
             * inpueNumber num 改变时会触发
             * http://element.eleme.io/#/zh-CN/component/input-number
             */
            inputNumberhandleChange(item) {
              this.$nextTick( ()=> {
                this.$emit('inputNumberChange', item)
              })
            },
            /**
             * 自定义封装 TABLE 下拉菜单点击传递数据给父类做处理
             */
            handleCommand(command, data) {
                const item = data.$vnode.data.attrs.data
                this.$emit('menuClick', command, item)
            },
            emitInputChange(){
              console.log(this);
            },
            /**
            * 自定义封装 TABLE 下拉菜单点击传递数据给父类做处理
            */
            tableRowChange(command, data) {
                const item = data.$vnode.data.attrs.data
                this.$emit('menuClick', command, item)
            },
            /**
             * 自定义封装 TABLE 单个菜单点击传递数据给父类做处理
             */
            menuClick(command, data) {
                this.$emit('menuClick', command, data)
            },
            /**
            * 自定义封装 TABLE refresh 父组件通过ref调用
            */
            refresh(command, data) {
              this.getTableList();
            }
        },
        /**
         * 监听FORM变化
         * 若变化则直接调取接口
         */
        watch: {
            formInline: {
                handler: function () {
                    this.getTableList()
                },
                deep: true
            }
        }
    }
</script>
<style>

</style>
