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
              <el-col class="contact"><a href="#"><i class="iconfont icon-shezhi"></i></a></el-col>
              <el-col class="setting"><a href="#"><i class="iconfont icon-tongzhi"></i></a></el-col>
              <el-col class="message"><a href="#"><i class="iconfont icon-fuwu2"></i>
                <!--<div class="message-round">12</div>-->
                </a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="180px" >
          <el-menu :default-openeds="['1']" unique-opened="true" active-text-color="#ce2127">
            <el-submenu index="1">
              <template slot="title"><i class="icon-dingdan"></i><span>订单</span></template>
              <el-menu-item-group>
                <el-menu-item index="1-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="1-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="iconfont icon-icon--"></i><span>商品</span></template>
              <el-menu-item-group>
                <el-menu-item index="2-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="2-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="iconfont icon-customer"></i><span>客户</span></template>
              <el-menu-item-group>
                <el-menu-item index="3-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="3-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="iconfont icon-caigou"></i><span>采购</span></template>
              <el-menu-item-group>
                <el-menu-item index="4-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="4-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="iconfont icon-cangku1"></i><span>仓库</span></template>
              <el-menu-item-group>
                <el-menu-item index="5-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="5-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="iconfont icon-caiwu"></i><span>财务</span></template>
              <el-menu-item-group>
                <el-menu-item index="6-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="6-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"><i class="iconfont icon-yingxiao"></i><span>营销</span></template>
              <el-menu-item-group>
                <el-menu-item index="7-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="7-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container class="content-container">
          <el-main>
            <lts-content/>
          </el-main>
          <el-footer height="30px">copyright @ 2017 LTS Security Inc. All Rights Reserved</el-footer>
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
  @import '//at.alicdn.com/t/font_516449_wdlmisobbd2njyvi.css';
  *{margin:0;padding:0;box-sizing: border-box;}
  ul,ol{list-style: none;}
  a{color:inherit;text-decoration: none;}
  .container{
    margin: 0 auto;
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
          i::before{
            position: relative;
            width:20px;
            height: 20px;
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
            border-radius: 50%;
            background: #e8293f;
          }
        }
      }

      .el-aside{
        color:#666666;
        height:100%;
        margin-top: 10px;
        .el-submenu{
          .el-submenu__title{
            border-left: 4px solid rgba(0,0,0,0);
            overflow: hidden;
            margin:5px 0;
            line-height: 60px;
            height:60px;
            span{
              font-size: 18px;
              margin-left: 30px;
            }
            i{
              width:22px;
              height: 22px;
              border:1px solid green;
            }
            i::before{
              border:1px solid red;
            }
          }
          border-bottom:1px solid #e5e5e5;
        }
        .el-submenu.is-opened{
          .el-submenu__title{
            border-left: 4px solid #ce2127;
            color:#ce2127;
          }
         }
        .el-menu-item{
          margin-left: 20px;
        }
        img{
          width:21px;
          height:21px;
          margin-right: 20px;
          position: relative;
        }
        .el-menu-item{
          font-size: 16px;
        }
      }
      .el-footer{
        font-size: 14px;
        text-align: center;
        color:#999999;
      }
    }
  }
</style>
