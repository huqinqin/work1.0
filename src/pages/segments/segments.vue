<template>
  <div id="app">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/segments' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/segments/add' }">新增子市场</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/segments/edit' }">编辑子市场</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/segments/list' }">子市场列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'segments',
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
