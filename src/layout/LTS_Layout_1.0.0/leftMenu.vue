<template>
    <div>
        <div class="iconfont switch-collapse" v-bind:class="[isCollapse ? 'icon-shouqi':'icon-zhankai']" index="switch" @click="switchCollapse">
        </div>
        <el-menu class="el-menu-vertical" :unique-opened="isUniqueOpened"
                 @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse"
                 active-text-color="#ce2127">
                <el-submenu v-for="(value,index) in menuList" :key="value.id"   :index="value.name" v-if="value.resourcesList.length > 0" >
                    <template slot="title">
                        <i class="iconfont icon-dingdan"></i>
                        <span slot="title">{{value.name}}</span>
                    </template>
                    <el-menu-item  v-for="resource in value.resourcesList" :index="resource.name" :key="resource.id">
                        <a :href="resource.url">{{resource.name}}</a>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-for="(value,index) in menuList" :key="value.id" v-if="value.resourcesList.length == 0" :index="value.name">
                   <i class="el-icon-setting"></i><a :href="value.url" slot="title">{{value.name}}</a>
                </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    const menuItemList =[
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.500mi.com",
            "edate":1493375344000,
            "id":224,
            "name":"订单管理",
            "pic":"order",
            "resourcesList":[
                {
                    "apptype":1,
                    "cdate":1342499512000,
                    "code":"10048",
                    "description":"运营商批发交易管理",
                    "display":4,
                    "domain":"http://work.500mi.com",
                    "edate":1493375344000,
                    "id":86,
                    "name":"订单列表",
                    "resourcesList":[

                    ],
                    "sort":0,
                    "status":1,
                    "type":2,
                    "url":"/pages/order.html"
                },
                {
                    "apptype":1,
                    "cdate":1342499512000,
                    "code":"10048",
                    "description":"运营商批发交易管理",
                    "display":4,
                    "domain":"http://work.500mi.com",
                    "edate":1493375344000,
                    "id":87,
                    "name":"退货退款",
                    "resourcesList":[

                    ],
                    "sort":0,
                    "status":1,
                    "type":2,
                    "url":"javascript:void(0)"
                }
            ],
            "sort":1010,
            "status":1,
            "type":1
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.500mi.com",
            "edate":1493375344000,
            "id":225,
            "name":"商品管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/pages/product.html'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.500mi.com",
            "edate":1493375344000,
            "id":226,
            "name":"工程商管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/pages/merchants.html#list'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.500mi.com",
            "edate":1493375344000,
            "id":227,
            "name":"代客下单",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/pages/customerorder.html'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.500mi.com",
            "edate":1493375344000,
            "id":228,
            "name":"类目管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/pages/category.html'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.500mi.com",
            "edate":1493375344000,
            "id":229,
            "name":"子市场管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/pages/segments.html'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.500mi.com",
            "edate":1493375344000,
            "id":230,
            "name":"库存管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/pages/repertory.html'
        },
    ];
    export default {
        name : "left-menu",
        data(){
          return{
              menuList : menuItemList,
              isUniqueOpened: true,
              isCollapse: true
          }
        },
        methods:{
            getLeftMenuList(){
              // TOOD 获取左侧菜单 LIST
            },

            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            switchCollapse(){
              this.isCollapse = !this.isCollapse;
            },
        },
        mounted(){
            this.getLeftMenuList();
        },
    }
</script>
<style scoped>
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 179px;
    }
    .el-aside{
        overflow: inherit;
    }
    .switch-collapse{
        text-align: center;
        font-size: 14px;
        color: #2d2f33;
        -webkit-transition: border-color .3s,background-color .3s,color .3s;
        transition: border-color .3s,background-color .3s,color .3s;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 56px;
        line-height: 56px;
        padding: 0 20px;
        position: relative;
        -webkit-box-sizing: border-box;
        cursor: pointer;
        white-space: nowrap;
    }
</style>
