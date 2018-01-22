<template>
  <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="商品列表" name="goodsList"></el-tab-pane>
          <el-tab-pane label="添加商品" name="selectCategory"></el-tab-pane>
      </el-tabs>
      <transition name="slide-fade">
          <router-view></router-view>
      </transition>
  </div>
</template>
<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
<script>
    export default {
        name: "goods",
        data(){
            return{
                activeName : 'goodsList'
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
