<template>
  <div>
    <router-link to="manage"><el-button>库存管理</el-button></router-link>
    <router-link to="list"><el-button>库存明细</el-button></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "repertory",
    data(){
      return{
      }
    },
    methods:{}
  }
</script>

<style scoped>

</style>
