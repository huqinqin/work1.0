<template>
  <div id="app">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/add' }">退款管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/edit' }">收款管理</el-breadcrumb-item>
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
