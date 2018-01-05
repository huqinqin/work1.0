<template>
  <div id="app">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/add' }">新增子市场</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/edit' }">编辑子市场</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list' }">子市场列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
  </div>
</template>

<script>
  import AddSegments from './components/addSegments'
  import EditSegments from './components/editSegments'
  import SegmentsList from './components/segmentsList'

  export default {
    name: 'segments',
    components: {AddSegments, EditSegments, SegmentsList},
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
