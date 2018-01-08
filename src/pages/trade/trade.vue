<template>
  <div id="app">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
      <el-breadcrumb-item :to="{ path: '/add' }">退款管理</el-breadcrumb-item>
      <!--<el-breadcrumb-item :to="{ path: '/edit' }">收款管理</el-breadcrumb-item>-->
    </el-breadcrumb>
    <router-view />
  </div>
</template>

<script>

  export default {
    name: 'trade',
    components: {},
    data(){
      return{
          a:'b'
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  }
</style>
