<template>
  <div class="container">
    <el-container class="container-box">
      <el-header height="60px">
        <el-row type="flex" justify="space-between" calss="row-bg">
          <el-col :span="4"><a href="#"><img src="../../static/icon/logo_2.png" alt="logo" class="logo"></a></el-col>
          <el-col :span="4">
            <el-row height="60px" class="icons" type="flex" justify="end" calss="row-bg">
              <el-col class="user"><span>user</span></el-col>
              <el-col class="avatar"><a href="#"><img src="../../static/icon/wode.png" alt=""></a></el-col>
              <el-col class="contact"><a href="#"><img src="../../static/icon/kefu.png" alt=""></a></el-col>
              <el-col class="setting"><a href="#"><img src="../../static/icon/shezhi.png" alt=""></a></el-col>
              <el-col class="message">
                <a href="#"><img src="../../static/icon/xiaoxi.png" alt="">
                  <div class="message-round">12</div>
                </a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu class="el-menu-vertical" :default-openeds="['1']" :unique-opened="isUniqueOpened" active-text-color="#ce2127">
            <el-submenu index="1">
              <template slot="title" color="red"><img src="../../static/icon/dingdan2.png" alt="">订单</template>
              <el-menu-item index="1-1" width="140px">{{$t('name')}}</el-menu-item>
              <el-menu-item index="1-2">{{$t('menu.order')}}</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title" color="red"><img src="../../static/icon/dingdan2.png" alt="">订单</template>
              <el-menu-item index="1-1">{{$t('name')}}</el-menu-item>
              <el-menu-item index="1-2">{{$t('menu.order')}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container class="content-container">
          <el-main>
            <lts-content/>
          </el-main>
          <el-footer height="30px">Copyright @ 2017 LTS Security Inc. All Rights Reserved</el-footer>
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
          isUniqueOpened : true,
        }
      },
      methods:{
      },
      watch:{
        open:function(){
          consoel.log(this.open)
        }
      }
   }
</script>
<style lang="less">
  html,body{
    margin: 0;
    padding:0;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
  }
  .content-container{
    background-color: #eeeeee;
    padding: 20px;
    .el-main{
      background-color: white;
    }
  }
  .container{
    .container-box{
      height:100%;
      width:100%;
      .el-header{
        position: relative;
        z-index: 10;
        line-height: 60px;
        height: 60px;
        box-shadow: 0 3px 10px #f2f2f2;
        .el-row{
          height:100%;
        }
        .logo{
          width:115px;
          height: 40px;
          vertical-align: middle;
        }
        .icons{
          font-size: 16px;
          color: #777;
          margin-right: -20px;
          img{
            vertical-align: middle;
            width: 24px;
            height: 26px;
          }
          // 消息右上角的红点
          .message-round{
            position: relative;
            top:-50px;
            left:13px;
            width:24px;
            line-height: 24px;
            height: 24px;
            color:white;
            border:1px solid red;
            border-radius: 50%;
            background: #e8293f;
          }
        }
      }
      .el-aside{
        height:100%;
        margin-top: 10px;
        .el-submenu .el-menu-item{
          min-width: 100px;
        }
        img{
          width:21px;
          height:21px;
          margin-right: 20px;
          position: relative;
        }
      }
      .el-footer{
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        background-color: white;
      }
    }
  }
</style>
