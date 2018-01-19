<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"/>
        <el-button type="primary">
            <router-link to="/add">新增工程商</router-link>
        </el-button>

        <el-table :data="datalist" v-loading="loading" style="width: 100%">
            <el-table-column prop="shop_name" label="工程商名称" show-overflow-tooltip />
            <el-table-column prop="address" label="地址" show-overflow-tooltip />
            <el-table-column prop="contact" label="联系人" width="150" />
            <el-table-column prop="contact_phone" label="联系电话" width="120" />
            <el-table-column prop="status_title" label="状态" width="80" />
            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button round type="primary" size="mini"><router-link :to="'/detail/' + scope.row.uid">编辑</router-link></el-button>
                    <el-popover
                        ref="popoverDelete"
                        placement="top"
                        width="200"
                        v-model="visibleDeleltePopover">
                        <p>确定删除<span class="text-main">{{scope.row.shop_name}}</span>吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="visibleDeleltePopover = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="deleteInstaller(scope.row)">确定</el-button>
                        </div>
                    </el-popover>
                    <el-button round size="mini" v-popover:popoverDelete>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="text-align: right;margin-top:20px"
            :current-page="pagination.page"
            :page-sizes="pagination.sizes"
            :page-size="pagination.pageSize"
            :layout="pagination.layout"
            :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
    import {request} from 'ltsutil'
    import {ltsTable, ltsSearchForm} from 'ui'
    import installerService from '@/services/InstallerService'

    export default {
        components: {
            ltsTable, ltsSearchForm
        },
        data() {
            return {
                datalist: [],
                loading: true,
                visibleDeleltePopover: false,
                form: {
                    formFileds: [
                        {
                            'search': {
                                shopNmae: {
                                    'label': '',
                                    type: 'input',
                                    'bindValue': 'installer_name',
                                    'bindPlaceholder': '搜索店铺名称'
                                },
                                submit: {'bindValue': '搜索', type: 'submitbutton'}
                            },
                        }
                    ],
                    formInline: {
                        installer_name: '',
                    }
                },
                pagination: {
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    sizes: [10, 20, 30],
                    layout: 'total, sizes, prev, pager, next, jumper' // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                },
            }
        },
        methods: {
            deleteInstaller(item){
                this.visibleDeleltePopover = false;
                installerService.delete(item.uid).then((resp)=>{
                    this.$ltsMessage.show({type:'success', message: '删除工程商 ' + item.shop_name + ' 成功'});
                    this.getList();
                },(error)=>{
                    this.$ltsMessage.show({type:'error', message: '删除 ' + item.shop_name + ' 失败：' + error.error_message});
                });
            },
            getParameter(bizParams) {
                this.getList()
            },
            getList() {
                installerService.getList(this.form.formInline, this.pagination).then((resp) => {
                    this.loading = false;
                    this.datalist = resp.datalist;
                    this.pagination.total = resp.total;
                }, (error) => {
                    this.loading = false;
                    this.datalist = [];
                    this.pagination.total = 0;
                    this.$ltsMessage.show({type: 'error', message: error.error_message})
                })
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.pagination.page = val;
                this.getList()
            }
        },
        mounted(){
            this.getList();
        }
    }
</script>

<style scoped>

</style>
