<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="库存列表" name="list">
          </el-tab-pane>
          <el-tab-pane label="库存明细" name="manage"></el-tab-pane>
        </el-tabs>
        <router-view>
        </router-view>
    </div>
</template>
<script>
    export default {
        name: "repertory",
        data(){
            return{
              activeName : 'list'
            }
        },
        methods:{
          handleClick(tab){
            this.$router.push({
              name : tab.name,params:{}
            })
          },
        }
  }
</script>

<style scoped>

</style>
