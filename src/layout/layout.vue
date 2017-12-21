<template>
  <div class="container">
    <el-container class="container-box">
      <el-header height="60px">
        <el-row type="flex" justify="space-between" calss="row-bg">

          <el-col :span="4"><a href="#"><img src="../../static/icon/logo_2.png" alt="logo" class="logo"></a></el-col>
          <el-col :span="4">
            <el-row height="60px" class="icons" type="flex" justify="end" calss="row-bg">
              <el-col class="user"><span>user</span></el-col>
              <el-col class="avatar"><a href="#"><i class="iconfont icon-lianxiren"></i></a></el-col>
              <el-col class="contact"><a href="#"><i class="iconfont icon-fuwu2"></i></a></el-col>
              <el-col class="setting"><a href="#"><i class="iconfont icon-shezhi"></i></a></el-col>
              <el-col class="message"><a href="#"><i class="iconfont icon-tongzhi"></i>
                <div class="message-round">n+</div>
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
              <template slot="title"><i class="iconfont icon-dingdan"></i>订单</template>
              <el-menu-item index="1-1" width="140px">{{$t('name')}}</el-menu-item>
              <el-menu-item index="1-2">{{$t('menu.order')}}</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="iconfont icon-icon--"></i>商品</template>
              <el-menu-item index="2-1">{{$t('name')}}</el-menu-item>
              <el-menu-item index="2-2">{{$t('menu.order')}}</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="iconfont icon-customer"></i>客户</template>
              <el-menu-item index="3-1">{{$t('name')}}</el-menu-item>
              <el-menu-item index="3-2">{{$t('menu.order')}}</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="iconfont icon-caigou"></i>采购</template>
              <el-menu-item index="4-1">{{$t('name')}}</el-menu-item>
              <el-menu-item index="4-2">{{$t('menu.order')}}</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="iconfont icon-cangku1"></i>仓库</template>
              <el-menu-item index="5-1">{{$t('name')}}</el-menu-item>
              <el-menu-item index="5-2">{{$t('menu.order')}}</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="iconfont icon-caiwu"></i>财务</template>
              <el-menu-item index="6-1">{{$t('name')}}</el-menu-item>
              <el-menu-item index="6-2">{{$t('menu.order')}}</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"><i class="iconfont icon-yingxiao"></i>营销</template>
              <el-menu-item index="7-1">{{$t('name')}}</el-menu-item>
              <el-menu-item index="7-2">{{$t('menu.order')}}</el-menu-item>
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
  import '../../static/font_516449_wdlmisobbd2njyvi.css'
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
  a{
    text-decoration: none;
    color:inherit;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width:179px;
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
        box-shadow: 0 3px 15px #f2f2f2;
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
          .iconfont{
            font-size: 20px;
          }
          // 消息右上角的红点
          .message-round{
            position: relative;
            top:-50px;
            left:8px;
            width:22px;
            line-height: 22px;
            color:white;
            text-align: center;
            border-radius: 50%;
            background: #e8293f;
          }
        }
      }

      .el-aside{
        color:#666666;
        height:100%;
        }
        .el-submenu{
          .el-submenu__title{
            margin-left: 4px;
            line-height: 70px;
            height:70px;
            border-bottom:1px solid #e5e5e5;
          }
          .el-menu-item{
            min-width:100px;
            margin-left: 14px;
          }
        }
        .el-submenu.is-opened{
          color: red;
          .el-submenu__title{
            margin-left: 0px;
            border-left:4px solid #ce2127;
          }
        }
        .iconfont{
          font-size: 20px;
          margin-right: 10px;
        }
        .el-icon-arrow-down{
          font-size: 14px;
        }
      }
      .el-footer{
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        background-color: white;
        color:#999999;
      }
  }
</style>
