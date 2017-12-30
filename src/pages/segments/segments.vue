<template>
    <div id="app">
      <router-link to="/add">新增子市场</router-link>
      <router-view />
    </div>
</template>

<script>
    import AddSegments from './components/addSegments'

    export default {
      name: 'segments',
      components: {AddSegments},
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
