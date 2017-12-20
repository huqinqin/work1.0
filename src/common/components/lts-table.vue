<template>
  <div>
    <el-table
      :data="table.tableData"
      style="width: 100%">
      <el-table-column  v-for="(val, index) in table.tableField"
        :key="val.value"
        :type="val.type"
        :prop="val.value"
        :label="index">
      </el-table-column>
    </el-table>
    <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagination.page.default"
    :page-sizes="pagination.pageSizes"
    :page-size="pagination.pageSize.default"
    :layout="pagination.layout"
    :total="pagination.total.default">
  </el-pagination>
  </div>
</template>
<script>
  import Request from 'request'
  export  default {
    name: 'lts-table',
    props: [
      "tApi","tFormInline","tTable","TPagination"
    ],
    data(){
      return{
        api : this.tApi,
        // FORM搜索参数
        formInline:this.tFormInline,

        table : {
          //渲染TABLE列表LIST
          tableData: [],
          //TABLE显示定义的字段
          tableField : this.tTable.tableField,
          // TABLE显示需要的业务参数

        },


        pagination:{
          page: {
            type: Number,
            default: this.TPagination.page
          },
          pageSize: {
            type: Number,
            default: this.TPagination.pagesize,
          },
          total:{
            type: Number,
            default: this.TPagination.total,
          },
          pageSizes : this.TPagination.sizes,// table切换页数的分组
          layout:this.TPagination.layout,
        },
      }
    },

    mounted(){
      this.getUserItemList()
    },
    methods:{
      /**
       * 获取数据接口
       * 参数定义 {}
       * 直接渲染列表
       */
      getUserItemList() {
        let link = "";
        switch (this.tApi.api){
          case 'wbmApi':
             link = Request.wbmApi(this.tApi.method,this.getParameter())
             break;
          case 'tp':
             link = Request.tp(this.tApi.method,this.getParameter())
             break;
        }
        link.then((data)=>{
            const resp = JSON.parse(data);
            this.table.tableData = resp.item_list;
            this.pagination.total.default = resp.total;
        },(msg)=>{
          this.$message(msg);
        });
      },

      /**
       * 封装table接口需要的参数
       * @return JSON.stringify(Object)
       */
      getParameter(){
        /**
         * 加入公共的参数
         * @type {number|*}
         */
          this.tApi.bizparams.page = this.pagination.page.default;
          this.tApi.bizparams.pgaesize = this.pagination.pageSize.default;
          /**
           * 加入搜索的参数
           * Object.assign 后一个参数会覆盖前面的
           * @type {number|*}
           */
          let parameter = Object.assign({}, this.tApi.bizparams, this.formInline);
          return parameter;
      },

      /**
       * 分页组件的方法 可往父组件传 但是建议在内部处理
       * pageSize 改变时会触发
       * http://element.eleme.io/#/zh-CN/component/pagination
       */
      handleSizeChange(val) {
        this.pagination.pageSize.default = val;
        this.getUserItemList();
      },

      /**
       * 分页组件的方法 可往父组件传 但是建议在内部处理
       * currentPage 改变时会触发
       * http://element.eleme.io/#/zh-CN/component/pagination
       */
      handleCurrentChange(val) {
        this.pagination.page.default = val;
        this.getUserItemList();
      },

      /**
       * 有单选或者是全选
       * 选中前面inputbox 改变时会触发
       * http://element.eleme.io/#/zh-CN/component/table
       */
      handleSelectionChange(val){
          console.log(val);
      },

      /**
       * 自定义封装的事件
       */
    },
    /**
     * 监听FORM变化
     * 若变化则直接调取接口
     */
    watch: {
      formInline:{
        handler:function(){
          this.getUserItemList()
        },
        deep:true,

      },
    },
  }
</script>
<style>

</style>
