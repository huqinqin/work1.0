<template>
    <div class="list">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" align="right" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60%" align="right" @change="checkItem"></el-table-column>
            <el-table-column label="商品信息" width="450" class="column-1"  align="center">
                <template slot-scope="scope">
                    <div class="item-img" :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+scope.row.url+')'}"></div>
                    <div class="content">
                        <p>{{scope.row.item_name}}</p>
                    </div>
                    <div class="other">
                        <p v-for="(value,key) in scope.row.item_props">{{value.prop_value}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" align="center">
            </el-table-column>
            <el-table-column label="数量" prop="num" align="center">
                <template slot-scope="scope">
                    <div class="inputNumber">
                        <el-input-number :min='0' size="small" v-model="scope.row.num" @change="inputNumeberChange(scope.row)" label="描述文字"></el-input-number>
                    </div>
                    </template>
            </el-table-column>
            <el-table-column label="小计"align="center">
                <template slot-scope="scope">
                    <div class="count">{{scope.row.num*scope.row.price}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作"align="center">
                <template slot-scope="scope">
                    <div class="cart-delete" @click="deleteHandle(scope.$index, scope.row)">
                        <i class="iconfont icon-shanchu"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-footer">
            <div class="choose">
                <p>
                    <el-checkbox v-model="tableData.chooseAll" @change="chooseAllSelect">全选</el-checkbox>
                    <span>删除选中商品</span>
                </p>
            </div>
            <div class="check">
                <p><span>应付金额：<strong>$500.00</strong></span></p>
                <el-button @click="check">去结算</el-button>
            </div>
        </div>
        <div class="history">
            <h5>购买记录</h5>
            <ul class="items">
                <li v-for="item in historyData">
                    <img :src="item.img" :alt=item.disc>
                    <p>{{item.name}}</p>
                    <p><span>{{item.info}}</span></p>
                    <p><span>{{item.model}}</span></p>
                    <div class="price">${{item.price}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import  cartService from '@/services/CartService.js'
    export default {
        name: "list",
        data() {
            return {
                chooseAll: false,
                historyData: [],
                isIndeterminate: true,
                tableData: [],
                cart: {
                    cartTotal: 0,
                    cartPriceTotal: 0,
                },
                checkedItem: [{
                    img: require('@/assets/img/shangping_html.png'),
                    info: '海康威视DS-CD0DDDDDDDDDD',
                    more: {
                        '像素': '1200W',
                        '焦距': '4mm',
                    },
                    price: '$500.00',
                    num: 1,
                    count: '$500.00',
                    handle: 'iconfont  icon-shanchu',
                },{
                    img: require('@/assets/img/shangping_html.png'),
                    info: '海康威视DS-CD0DDDDDDDDDD',
                    more: {
                        '像素': '1200W',
                        '焦距': '4mm',
                    },
                    price: '$500.00',
                    num: 1,
                    count: '$500.00',
                    handle: 'iconfont  icon-shanchu',
                }],

            }
        },
        mounted(){
            cartService.queryCartList();
        },
        methods:{
            queryCartList(){
                cartService.queryCartList(158716).then((data)=>{
                    this.tableData = data.data;
                    console.log(this.tableData);
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
            },
            // 单选框
            handleSelectionChange(value){
                this.multipleSelection = value
                console.log(this.multipleSelection)
            },
            // 全选框 -- 选不上啊
            chooseAllSelect(){
                this.chooseAll = this.chooseAll ? false : true
                this.multipleSelection = this.chooseAll ? [] : this.tableData
                console.log(this.multipleSelection)
            },
            // 购物车结算
            check() {
                this.$emit('submit', 1)
                this.$router.push({name: 'settle', params: { items: this.checkedItem }})

            },
            // 修改购物车数量
            inputNumeberChange(row){
                console.log(row)
                console.log('数量置为x，加入购物车')
                console.log(row)
                cartService.putCartPlus(params)
            },
            // 删除购物车条目
            deleteHandle(index, row){
                this.tableData.splice(index,1)
                console.log('数量置为0，加入购物车')
                console.log(row)
                cartService.putCartPlus(params)
            },
            // 购物车里选择条目
            checkItem(value){
                this.checkedItem = value
                console.log(this.checkedItem)
            }
        },
        watch: {
            tableData: {
                deep: true,
                handler(newval, oldval) {
                    this.cart.cartTotal = 0;
                    this.cart.cartPriceTotal = 0;
                    newval.forEach((value, index, array) => {
                        if (value.num === 0) {
                            array.splice(index, 1);
                        }
                        this.cart.cartTotal = parseInt(value.num) + parseInt(this.cart.cartTotal);
                        this.cart.cartPriceTotal += parseInt(value.num) * parseInt(value.price);
                    })
                }

            },
        }
  }
</script>

<style lang="less">
    .list{
        .el-table__header-wrapper{
            height: 60px;
        }
        .has-gutter{
            tr{
                th{
                    background-color: rgba(0,0,0,0.05);
                    .el-checkbox{
                        visibility: hidden;
                    }
                }
                th.el-table_1_column_2{
                    .cell{
                        margin-left: 24px;
                    }
                }
            }
        }
        .el-table{
            font-size: 14px;
            tbody tr:nth-child(2){
                .el-table_1_column_1{
                    .el-checkbox{
                        width: 40px;
                        height: 20px;
                        span{
                            display:none;
                        }
                        position: relative;
                        background: rgba(0,0,0,0.1);
                        margin-left: 5px;
                    }
                    .el-checkbox::after{
                        content:'失效';
                        width:40px;
                        height: 20px;
                        position: absolute;
                        z-index: 10;
                        left:-7px;
                        top:-1px;
                        font-size: 12px;
                        color:#fff;
                    }
                }

            }
            .el-table_1_column_2{
                .cell{
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                }
                .item-img{
                    width:116px;
                    height: 116px;
                    border: 1px solid #dadada;
                    background-position: center;
                    background-size: cover;
                }
                div{
                    width:120px;
                    p{
                        line-height: 30px;
                        font-size: 12px;
                        text-align: left;
                    }
                    p:first-child{
                        margin-top: 12px;
                    }
                }
            }



            .cart-delete{
                line-height: 40px;
                font-size: 22px;
                color: #cecece;
                i{font-size: 22px;}
            }
            .count{
                color:red;
                font-size: 16px;
            }
            .el-input-number--small{
                width:128px;
            }
        }

        .table-footer{
            margin:40px 24px;
            display: flex;
            justify-content: space-between;
            p{
                line-height: 49px;
                span{
                    font-size: 14px;
                }
                strong{
                    color:#f81f22;
                    font-size: 26px;
                }
            }
            .choose{
                margin-left: 12px;
                .el-checkbox{
                    color: #777;
                    span.el-checkbox__label{
                        margin-left: 12px;
                        font-size: 14px;

                    }
                }
                span{
                    color: #b1b1b1;
                    font-size: 12px;
                }
            }
            .check{
                text-align: right;
                .el-button{
                    background-color: #f81f22;
                    border-radius: 4px;
                    width: 160px;
                    height: 50px;
                    line-height: 0px;
                    font-size: 24px;
                    font-family: MicrosoftYaHei-Bold;
                    span{
                        color: #fff;
                    }
                }
                span{
                    color: #999;
                }
            }
        }
        .history{
            h5{
                line-height: 49px;
                color: #777;
                margin-left: 24px;
            }
            .items{
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                padding-left: 4px;
                li{
                    width: 290px;
                    background-color: #ffffff;
                    border:1px solid #eee;
                    border-top:2px solid #3d98ff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 12px;
                    margin-right: 8px;
                    img{
                        margin: 150px 0 96px;
                    }
                    p{
                        line-height: 18px;
                        font-family: MicrosoftYaHei-Bold;
                        font-weight: bold;
                        font-size: 18px;
                        margin-top: 12px;
                        color: rgba(0,0,0,0.7);
                        text-align: center;
                        span{
                            font-size: 14px;
                            color: rgba(0,0,0,0.5);
                            font-weight: normal;
                        }
                    }
                    .price{
                        color: #ce2127;
                        font-size: 26px;
                        width: 266px;
                        line-height: 75px;
                        height: 75px;
                        border-top: 1px solid rgba(0, 0, 0, 0.05);
                        text-align: center;
                        margin-top: 24px;
                        margin-left: 12px;
                    }
                }
                li:hover{
                    animation: floats 0.3s ease forwards;
                }
            }
            padding-bottom: 96px;
            border-bottom:1px solid rgba(0, 0, 0, 0.05);
        }
    }
    @keyframes floats {
        from {
            border:1px solid #eee;
            border-top:2px solid #3d98ff;
        }
        to {
            border:1px solid #fff;
            border-top:2px solid #3d98ff;
            box-shadow: 0px 6px 18px 6px rgba(0, 0, 0, 0.05);
        }
    }

</style>
