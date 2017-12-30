<template>
    <div id="app">
        <router-link to="/add"><el-button>新增子市场</el-button></router-link>
        <router-link to="/edit"><el-button>编辑子市场</el-button></router-link>
        <router-link to="/list"><el-button>子市场列表</el-button></router-link>
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
