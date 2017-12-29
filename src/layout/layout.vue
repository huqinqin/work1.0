<template>
    <el-container>
        <el-header height="60px">
            <h1>
                <a :href="homePage" class="router-link-active">
                    <img src="../../static/icon/logo.png" alt="ltst-logo" class="nav-logo" />
                </a>
            </h1>
            <el-menu class="nav" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">{{account}}</el-menu-item>
                <el-menu-item index="2">控制台</el-menu-item>
                <el-submenu index="3">
                    <template slot="title"><i class="iconfont icon-shezhi"></i>设置</template>
                    <el-menu-item index="2-1">我的账户</el-menu-item>
                    <el-menu-item index="2-2">账号安全</el-menu-item>
                    <el-menu-item index="2-3" @click="logout">退出</el-menu-item>
                </el-submenu>
                <el-menu-item index="4"><a href="#" target="_blank"><i class="iconfont icon-tongzhi"></i><i class="notice">{{unread}}</i></a></el-menu-item>
                <el-submenu index="5">
                    <template slot="title">简体中文</template>
                    <el-menu-item index="2-1"><a href="#/en">English</a></el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-container class="lts-main">
            <el-aside width="180px">
                <el-menu class="el-menu-vertical" :default-openeds="['1']" :unique-opened="isUniqueOpened"
                         active-text-color="#ce2127">
                    <el-submenu index="1">
                        <template slot="title"><i class="iconfont icon-dingdan"></i>订单管理</template>
                        <el-menu-item index="1-1"><a href="/pages/order.html">订单列表</a></el-menu-item>
                        <el-menu-item index="1-2">退货退款</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="iconfont icon-icon--"></i>商品管理</template>
                        <el-menu-item index="2-1">{{$t('name')}}</el-menu-item>
                        <el-menu-item index="2-2">{{$t('menu.order')}}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="iconfont icon-customer"></i>工程商管理</template>
                        <el-menu-item index="3-1"><a href="/pages/merchants.html#list">工程商列表</a></el-menu-item>
                        <el-menu-item index="3-2">{{$t('menu.order')}}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="iconfont icon-caigou"></i>采购管理</template>
                        <el-menu-item index="4-1"><a href="/pages/customerorder.html">代客下单</a></el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="iconfont icon-cangku1"></i>仓库管理</template>
                        <el-menu-item index="5-1">{{$t('name')}}</el-menu-item>
                        <el-menu-item index="5-2">{{$t('menu.order')}}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="iconfont icon-cangku1"></i>配送管理</template>
                        <el-menu-item index="5-1">{{$t('name')}}</el-menu-item>
                        <el-menu-item index="5-2">{{$t('menu.order')}}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title"><i class="iconfont icon-caiwu"></i>财务管理</template>
                        <el-menu-item index="6-1">{{$t('name')}}</el-menu-item>
                        <el-menu-item index="6-2">{{$t('menu.order')}}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="8">
                        <template slot="title"><i class="iconfont icon-yingxiao"></i>营销管理</template>
                        <el-menu-item index="7-1">{{$t('name')}}</el-menu-item>
                        <el-menu-item index="7-2">{{$t('menu.order')}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container class="content-container">
                <el-main>
                    <lts-content/>
                </el-main>
                <el-footer height="60px">
                    copyright 2000-2017
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    import '../../static/font_516449_wdlmisobbd2njyvi.css'
    import store from '@/utils/StoreUtils'
    import config from '@/config'
    import userService from '@/services/UserService'
    import session from '@/library/Session'

    export default {
        name: 'Layout',
        props: '',
        data() {
            return {
                homePage: config.homePage,
                account: '',
                test: "LTS底部标识",
                isUniqueOpened: true,
                unread: '99+'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                userService.logout().then((resp)=>{
                    session.logout();
                },(err)=>{
                    this.$ltsMessage.show({type: "error", message: err.errorMessage});
                })
            }
        },
        watch: {
            open: function () {
                consoel.log(this.open)
            }
        },
        mounted() {
            // session.checkLogin();
            // this.account = store.getItem('account');
        }
    }
</script>
<style lang="less">
    html, body {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .el-menu-vertical:not(.el-menu--collapse) {
        width: 179px;
    }

    .content-container {
        background-color: #eeeeee;
        padding: 20px 0 0 20px;
        .el-main {
            background-color: white;
        }
    }

    .el-header {
        line-height: 60px;
        height: 60px;
        background-color: white;
        h1 {
            float: left;
            margin: 0;
            width: 120px;
            height: 60px;
            vertical-align: middle;
            img {
                margin: 10px 0 0;
                width: 115px;
                height: 40px;
            }
        }
        .nav {
            float: right;
            height: 100%;
            .notice {
                background: red;
                color: #fff;
                border-radius: 50%;
                font-size: 10px;
                line-height: 16px;
                height: 16px;
                min-width: 16px;
                padding: 0 2px;
                text-align: center;
                position: absolute;
                top: 16px;
                left: 26px;
                display: block;
            }
        }
    }

    .lts-main {
        .el-aside {
            color: #666;
            background-color: white;
            .el-submenu {
                .el-submenu_title {
                    line-height: 70px;
                    height: 70px;
                }
                .el-menu-item {
                    min-width: 100px;
                }
            }
            .iconfont {
                font-size: 18px;
                margin-right: 10px;
            }
            .el-icon-arrow-down {
                font-size: 16px;
            }
        }
        .el-footer {
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            background-color: white;
            color: #999;
        }
    }
</style>
