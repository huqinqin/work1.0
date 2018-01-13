<template>
    <div>
        <div class="iconfont switch-collapse" :class="[isCollapse ? 'icon-shouqi':'icon-zhankai']" index="switch" @click="switchCollapse">
        </div>
        <el-menu class="el-menu-vertical"
                 :unique-opened="isUniqueOpened"
                 :default-active="activeMenu"
                 @select="handleSelect"
                 :collapse="isCollapse"
                 active-text-color="#ce2127">
                <el-submenu v-for="(value,index) in menuList" :key="value.id" :index="value.name" v-if="value.resourcesList.length > 0" >
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
    import {store} from 'ltsutil'
    const menuItemList =[
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.lts.com",
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
                    "domain":"http://work.lts.com",
                    "edate":1493375344000,
                    "id":86,
                    "name":"订单列表",
                    "resourcesList":[
                    ],
                    "sort":0,
                    "status":1,
                    "type":2,
                    "url":"/store/order"
                },
                {
                    "apptype":1,
                    "cdate":1342499512000,
                    "code":"10048",
                    "description":"运营商批发交易管理",
                    "display":4,
                    "domain":"http://work.lts.com",
                    "edate":1493375344000,
                    "id":87,
                    "name":"退货退款",
                    "resourcesList":[

                    ],
                    "sort":0,
                    "status":1,
                    "type":2,
                    "url":"/store/reverse"
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
        "domain":"http://work.lts.com",
        "edate":1493375344000,
        "id":1,
        "name":"配送管理",
        "pic":"order",
        "resourcesList":[
          {
            "apptype":1,
            "cdate":1342499512000,
            "code":"10048",
            "description":"",
            "display":4,
            "domain":"http://work.lts.com",
            "edate":1493375344000,
            "id":2,
            "name":"备货管理",
            "resourcesList":[

            ],
            "sort":0,
            "status":1,
            "type":2,
            "url":"/store/delivery/stock"
          },
          {
            "apptype":1,
            "cdate":1342499512000,
            "code":"10048",
            "description":"",
            "display":4,
            "domain":"http://work.lts.com",
            "edate":1493375344000,
            "id":3,
            "name":"入库管理",
            "resourcesList":[

            ],
            "sort":0,
            "status":1,
            "type":2,
            "url":"/store/delivery/warehousing"
          },
          {
            "apptype":1,
            "cdate":1342499512000,
            "code":"10048",
            "description":"",
            "display":4,
            "domain":"http://work.lts.com",
            "edate":1493375344000,
            "id":4,
            "name":"发货管理",
            "resourcesList":[

            ],
            "sort":0,
            "status":1,
            "type":2,
            "url":"/store/delivery/incar"
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
          "domain":"http://work.lts.com",
          "edate":1493375344000,
          "id":23111,
          "name":"商品管理",
          "pic":"order",
          "resourcesList":[],
          "sort":1010,
          "status":1,
          "type":1,
          "url": '/goods'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.lts.com",
            "edate":1493375344000,
            "id":226,
            "name":"工程商管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/merchants#list'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.lts.com",
            "edate":1493375344000,
            "id":227,
            "name":"代客下单",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/customerorder'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.lts.com",
            "edate":1493375344000,
            "id":228,
            "name":"类目管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/category'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.lts.com",
            "edate":1493375344000,
            "id":229,
            "name":"子市场管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/segments'
        },
        {
            "apptype":1,
            "cdate":1447217704000,
            "code":"10167",
            "description":"运营商批发交易管理",
            "display":5,
            "domain":"http://work.lts.com",
            "edate":1493375344000,
            "id":230,
            "name":"库存管理",
            "pic":"order",
            "resourcesList":[],
            "sort":1010,
            "status":1,
            "type":1,
            "url": '/repertory'
        },
    ];
    export default {
        name : "left-menu",
        data(){
          return{
              menuList : menuItemList,
              isUniqueOpened: true,
              isCollapse: false,
              activeMenu: "订单管理",
          }
        },
        methods:{
            getLeftMenuList(){
              // TOOD 获取左侧菜单 LIST
            },

            handleSelect(activeMenu){
                store.setItem("activeMenu",activeMenu);
            },
            switchCollapse(){
              this.isCollapse = !this.isCollapse;
              store.setItem("isCollapse",this.isCollapse);
            },
        },
        created(){
            this.getLeftMenuList();
            this.isCollapse = store.getItem("isCollapse");
            this.activeMenu = store.getItem("activeMenu");
        },
    }
</script>
<style scoped>
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 179px;
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
        background-color: #ecf5ff;
    }
</style>
