<template>
    <div>
        <router-view>
        </router-view>
    </div>

</template>

<script>
    export default {
        name: "repertory",
        data(){
            return{
              activeName : 'manage'
            }
        },
        methods:{
          handleClick(tab){
            this.$route.push({name : tab.name})
          },
        }
  }
</script>

<style scoped>

</style>
