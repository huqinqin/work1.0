<template>
    <el-container>
        <el-header height="60px">
            <h1>
                <a :href="homePage" class="router-link-active">
                    <img src="../../assets/icon/shorticon.png" alt="ltst-logo" class="nav-logo" />
                </a>
            </h1>
            <el-menu class="nav" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">{{account}}</el-menu-item>
                <el-menu-item index="2">控制台</el-menu-item>
                <el-submenu index="3">
                    <template slot="title"><i class="iconfont icon-shezhi"></i>设置</template>
                    <el-menu-item index="2-1">我的账户</el-menu-item>
                    <el-menu-item index="2-2">账号安全</el-menu-item>
                    <el-menu-item index="2-3"><a href="/logout">退出</a></el-menu-item>
                </el-submenu>
                <el-menu-item index="4" class="notice">
                    <a href="#">
                        <el-badge :value="unread" :max="99" class="item">
                            <i class="iconfont icon-tongzhi"></i>
                        </el-badge>
                    </a>
                </el-menu-item>
                <el-submenu index="5">
                    <template slot="title">简体中文</template>
                    <el-menu-item index="2-1"><a href="#/en">English</a></el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-container class="lts-main">
            <el-aside width="inherit">
                <left-menu></left-menu>
            </el-aside>
            <el-container class="content-container">
                <el-main>
                    <lts-content/>
                </el-main>
                <el-footer height="30px">
                    copyright 2000-2017
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    import {store} from 'ltsutil'
    import config from 'config'
    import session from '@/library/Session'
    import {ltsTable,ltsSearchForm} from 'ui'
    export default {
        name: 'Layout',
        props: {},
        data() {
            return {
                homePage: config.homePage,
                account: '',
                test: "LTS底部标识",
                isUniqueOpened: true,
                unread: 100
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        watch: {
            open: function () {
                console.log(this.open)
            }
        },
        mounted() {
            session.checkLogin();
            this.account = store.getItem('account');
        }
    }
</script>
<style lang="less">
    html, body {
        margin: 0;
        padding: 0;
        height:100%;
    }

    a {
        text-decoration: none;
        color: inherit;
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
            .notice .el-badge__content.is-fixed {
                top: 15px;
            }
        }
    }
    .is-vertical{
        height:100%;
    }
    .lts-main {
        .el-aside {
            color: #666;
            background-color: white;
            overflow: inherit;
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
    .text-main {
        color: #409EFF;
    }
    .text-success {
        color: #67C23A;
    }
    .text-warning {
        color: #E6A23C;
    }
    .text-danger {
        color: #F56C6C;
    }
    .text-info {
        color: #909399;
    }
    .text-primary {
        color: #303133;
    }
    .text-regular {
        color: #606266;
    }
    .text-secondary {
        color: #909399;
    }
    .text-placeholder {
        color: #C0C4CC;
    }
    .help-info {
        color: #909399;
        font-size: 12px;
    }
</style>
