<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/add' }">新增工程商</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/edit' }">编辑工程商</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list' }">工程商列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>
<script>
  import merchantsList from './components/merchantsList'
  import addMerchants from './components/addMerchants'
  import editMerchants from './components/editMerchants'
  export default {
    props: {},
    name: 'merchants',
    components: {merchantsList, addMerchants, editMerchants},
    data () {
      return {
      }
    },
    methods: {
    }

  }
</script>

<style scoped>

</style>

