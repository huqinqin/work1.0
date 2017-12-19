<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column  v-for="(val, index) in tableField"
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
    :current-page="currentPage.default"
    :page-sizes="pagination.pageSizes"
    :page-size="pageSize.default"
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
      "table"
    ],
    data(){
      return{
        tableData: [],//渲染table的列表
        // table的总条数
        tableTotal: {
          type: Number,
          default: 0
        },
        // table的当前页
        currentPage: {
          type: Number,
          default: this.table.comparams.page
        },
        pageSize: {
          type: Number,
          default: this.table.comparams.pagesize,
        },
        pagination:{
          total:{
            type: Number,
            default: this.table.pagination.total,
          },
          layout:this.table.pagination.layout,
          pageSizes : this.table.pagination.sizes,// table切换页数的分组
        },
        //table 定义的字段
        tableField : this.table.tableField,
        // 业务参数
        bizparams : this.table.bizparams,
        // 搜索参数
        searchparams:this.table.searchparams,
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
        switch (this.table.api){
          case 'wbmApi':
             link = Request.wbmApi(this.table.method,this.getParameter())
             break;
          case 'tp':
             link = Request.tp(this.table.method,this.getParameter())
             break;
        }
        link.then((data)=>{
            const resp = JSON.parse(data);
            this.tableData = resp.item_list;
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
          this.bizparams.pgae = this.currentPage.default;
          this.bizparams.pgaesize = this.pageSize.default;
          /**
           * 加入搜索的参数
           * Object.assign 后一个参数会覆盖前面的
           * @type {number|*}
           */
          let parameter = Object.assign({}, this.bizparams, this.searchparams);
          return parameter;
      },

      /**
       * 分页组件的方法 可往父组件传 但是建议在内部处理
       * pageSize 改变时会触发
       * http://element.eleme.io/#/zh-CN/component/pagination
       */
      handleSizeChange(val) {
        this.pageSize.default = val;
        this.getUserItemList();
      },

      /**
       * 分页组件的方法 可往父组件传 但是建议在内部处理
       * currentPage 改变时会触发
       * http://element.eleme.io/#/zh-CN/component/pagination
       */
      handleCurrentChange(val) {
        this.currentPage.default = val;
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
       *
       *
       */

      /**
       * 监听table的值的变化
       *
       *
       */
    },
    watch: {
      searchparams:{
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
