<template>
  <div class="container">
    <el-container class="container-box">
      <el-header height="60px">
        <el-row type="flex" justify="space-between" calss="row-bg">
          <el-col :span="4"><a href="#"><img src="../../static/icon/logo_2.png" alt="logo" class="logo"></a></el-col>
          <el-col :span="4">
            <el-row class="icons" type="flex" justify="end" calss="row-bg">
              <el-col class="user"><span>user</span></el-col>
              <el-col class="avatar"><a href="#"><img src="../../static/icon/wode.png" alt=""></a></el-col>
              <el-col class="contact"><a href="#"><img src="../../static/icon/kefu.png" alt=""></a></el-col>
              <el-col class="setting"><a href="#"><img src="../../static/icon/shezhi.png" alt=""></a></el-col>
              <el-col class="message"><a href="#"><img src="../../static/icon/xiaoxi.png" alt=""></a></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><img src="../../static/icon/dingdan2.png" alt="">订单</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="1-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><img src="../../static/icon/shangpin.png" alt="">商品</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="2-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><img src="../../static/icon/kehu.png" alt="">客户</template>
              <el-menu-item-group>
                <el-menu-item index="3-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="3-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><img src="../../static/icon/caigou.png" alt="">采购</template>
              <el-menu-item-group>
                <el-menu-item index="4-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="4-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><img src="../../static/icon/cangku.png" alt="">仓库</template>
              <el-menu-item-group>
                <el-menu-item index="5-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="5-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><img src="../../static/icon/caiwu.png" alt="">财务</template>
              <el-menu-item-group>
                <el-menu-item index="6-1">{{$t('name')}}</el-menu-item>
                <el-menu-item index="6-2">{{$t('menu.order')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"><img src="../../static/icon/yinxiao.png" alt="">营销</template>
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
  *{margin:0;padding:0;box-sizing: border-box;}
  ul,ol{list-style: none;}
  a{color:inherit;text-decoration: none;}
  .container{
    width: 1500px;
    margin: 0 auto;
    .container-box{
      /*position: absolute;*/
      /*top:0;*/
      /*bottom:0;*/
      /*left:0;*/
      /*right:0;*/
      height:100%;
      width:100%;
      .el-header{
        position: relative;
        z-index: 10;
        line-height: 60px;
        box-shadow: 0 3px 15px #f2f2f2;
        .logo{
          width:115px;
          height: 40px;
          vertical-align: middle;
        }
        .el-col .icons{
          font-size: 16px;
          color: #777;
          margin-right: -20px;
          img{
            vertical-align: middle;
            width: 24px;
            height: 26px;
          }
        }
      }
      .el-aside{
        font-size: 22px;
        height:100%;
        .el-submenu{
          font-size: 22px;
          overflow: hidden;
          border-bottom:1px solid #e5e5e5;
          line-height: 70px;
          height:70px;
        }
        img{
          width:21px;
          height:21px;
          margin-right: 20px;
        }
        .el-menu-item{
          font-size: 18px;
        }
      }
      .el-footer{
        text-align: center;
      }
      .content-container{
        background: #ddd;
      }
    }
  }
</style>
