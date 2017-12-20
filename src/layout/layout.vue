<template>
  <div class="container">
    <el-container class="container-box">
      <el-header height="50px">LTS</el-header>
      <el-container>
        <el-aside width="150px">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>{{$t('menu.product')}}</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="1-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <lts-content/>
          </el-main>
          <el-footer>底部菜单</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
   export default{
      name : 'Layout',
      props : '',
      data(){
        return {
          test : "LTS底部标识",
        }
      },
      methods:{

      },
   }
</script>
<style lang="less">
  html,body{
    margin: 0;
    padding:0;
  }
  .container{
    .container-box{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      height:100%;
      width:100%;
    }
    .el-header{
      border-bottom: 1px solid #ccc;
      background-color: #2b3541;
      color: white;
      line-height: 50px;
    }
    .el-aside{
      height:100%;
      background-color: #2b3541;
    }
    .el-footer{
      text-align: center;
    }
    .el-main{
      min-height:500px;
    }
  }
</style>
