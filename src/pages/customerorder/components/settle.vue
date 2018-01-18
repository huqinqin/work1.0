<template>
    <div class="settle">
        <div class="address">
            <h5>收货地址：</h5>
            <ul>
                <li class="default">
                    <header>
                        <div><p>{{defaultAddressData.name}} （{{defaultAddressData.city}}）</p></div>
                        <div><span>默认地址</span></div>
                    </header>
                    <main>
                        <p>{{defaultAddressData.address}}</p>
                        <p>电话：{{defaultAddressData.mobile}}</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editAddress">修改</button>
                    </footer>
                </li>
                <li v-for="item in addressData">
                    <header>
                        <div><p>{{item.name}} （{{item.city}}）</p></div>
                    </header>
                    <main>
                        <p>{{item.address}}</p>
                        <p>电话：{{item.mobile}}</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editAddress">修改</button>
                    </footer>
                </li>
                <li class="addAddress" @click="addAddress">
                    <i class="iconfont icon-add"></i>
                    <div>添加地址</div>
                </li>
            </ul>
        </div>
        <div class="delivery">
            <h5>配送方式： </h5>
            <el-radio-group v-model="deliveryType">
                <el-radio-button label="SHSM" value="">快递</el-radio-button>
                <el-radio-button label="ZITI" value="">自提</el-radio-button>

            </el-radio-group>
            <!--<el-button :class="[deliveryType == '快递' ? 'is-active' : '']">快递</el-button>-->
            <!--<el-button :class="[deliveryType == '自提' ? 'is-active' : '']">自提</el-button>-->
        </div>
        <div class="order">
            <h5>订单信息： </h5>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column label="商品信息" width="450" class="column-1"  align="center">
                    <template slot-scope="scope">
                        <div class="cart-item-info">
                            <img :src="'http://res.500mi.com/item/' +  scope.row.url" alt="商品">
                            <div class="content">
                                <p>{{scope.row.item_name}}</p>
                            </div>
                            <div class="other">
                                <p v-for="(value,index) in scope.row.item_props" :key="value.id">
                                    <span v-for="(val,key) in value.prop_value">
                                        {{key}}: {{val}}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="单价" align="center">
                </el-table-column>
                <el-table-column label="数量" prop="num" align="center">
                </el-table-column>
                <el-table-column label="小计" align="center">
                    <template slot-scope="scope">
                        <div class="count">{{scope.row.num*scope.row.price}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="remark"><span>留言：</span><el-input v-model="remark"></el-input></div>
        </div>
        <div class="coupon" @click="useCoupon"><p><i class="iconfont icon-icon-test1"></i>使用优惠券 <span>（没有优惠券可以使用）</span></p></div>
        <div class="submitOrder">
            <div>商品价格：{{sum.amount}} + 运费：{{sum.express}} + 税额：{{sum.tax}} - 红包：{{sum.benefit}} = 总计：${{sum.result}}</div>
            <div>应付金额：<span>$500.00</span></div>
            <el-button @click="submitOrder">提交订单</el-button>
        </div>
    </div>
</template>

<script>
    import orderService from '@/services/OrderService.js'
    export default {
        name: "settle",
        props: ['items'],
        data(){
            return{
                chooseAll: true,
                defaultAddressData: {
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                },
                addressData:[{
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                }],
                tableData: [],
                deliveryType : "SHSM", // 自提 ZITI
                sum: {
                    amount: 500.00,
                    express: 0.00,
                    tax: 0.00,
                    benefit: 0.00,
                    result: 0
                },
                remark : '',
                user_id : "",
            }
        },
        methods: {
            setDefault(){
                alert('set default')
            },
            editAddress(){
                alert('edit address')
            },
            addAddress(){
                alert('add address')
            },
            editBill(){
                alert('edit bill')
            },
            addBill(){
                alert('add bill')
            },
            handleSelectionChange(){
                alert('handleSelectionChange')
            },
            inputNumberChange(){
                alert('input numeber change')
            },
            settle(){
                this.$emit('submit',2)
                this.$router.push({path: '/beforePay'})
            },
            deleteHandle(){
                alert('asf')
            },
            useCoupon(){
                alert('使用优惠券')
            },
            submitOrder(){
                let items = [];
                this.tableData.forEach(function(value,index,array){
                    let item_prop_ids = [];
                    value.item_props.forEach(function (val,key,array) {
                        item_prop_ids.push(val.id)
                    })

                    let Obj = {
                        "id":value.id,
                        "num":value.num,
                        "puser_id":value.puser_id,
                        "spu_id":value.spu_id,
                        "item_prop_ids": item_prop_ids
                    }
                    items.push(Obj);
                })
                let params = {
                    user_id : this.user_id,
                    items : JSON.stringify(items),
                    hdMethod : this.deliveryType,
                    remarkList : this.remark,
                    payMethod: "online", //
                    source: "work.500mi.com.shop.pifa.market"
                };
                orderService.createTrade(params).then((data)=>{
                    this.$ltsMessage.show({type:'success',message:"下单成功"})
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
            // 模拟下单
            simulateCreateTrade(){
                let items = [];
                this.tableData.forEach(function(value,index,array){
                    let item_prop_ids = [];
                    value.item_props.forEach(function (val,key,array) {
                        item_prop_ids.push(val.id)
                    })

                    let Obj = {
                        "id":value.id,
                        "num":value.num,
                        "puser_id":value.puser_id,
                        "spu_id":value.spu_id,
                        "item_prop_ids": item_prop_ids
                    }
                    items.push(Obj);
                })
                let params = {
                    user_id : this.user_id,
                    items : JSON.stringify(items),
                    payMethod: "online", //
                    source: "work.500mi.com.shop.pifa.market"
                };
                orderService.simulateCreateTrade(params).then((data)=>{
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
        },
        mounted(){
            this.formData = this.$route.params.items;
            this.tableData = this.$route.params.cartItems;
            this.sum.result = this.$route.params.cartTotal.cartPriceTotal;
            this.user_id = this.$route.params.userId;
            this.tableData.forEach(function (value,index,array) {
                value.item_props.forEach(function (val,key,array) {
                    val.prop_value =  JSON.parse(val.prop_value);
                })
            })
            this.simulateCreateTrade();
        }
  }
</script>

<style lang="less">
    .settle{
        li{
            list-style: none;
        }
        p{
            padding: 0;
            margin: 0;
        }
        .el-table__header-wrapper{
            height: 60px;
        }
        .has-gutter{
            tr{
                th{
                    background-color: rgba(0,0,0,0.05);
                }
                th.el-table_1_column_1{
                    .cell{
                        margin-left: 24px;
                    }
                }
            }
        }
        .el-table{
            font-size: 14px;
            .cell{
                .cart-item-info{
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                    img{
                        width:116px;
                        height: 116px;
                        border: 1px solid #dadada;
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
            }
            /*img{*/
                /*width: 116px;*/
                /*height: 116px;*/
                /*background-color: #ffffff;*/
                /*border: solid 1px #dadada;*/
                /*float: left;*/
            /*}*/
            /*.content{*/
                /*margin-left: 125px;*/
                /*padding: 15px 0;*/
                /*width:174px;*/
                /*p{*/
                    /*line-height: 30px;*/
                    /*font-size: 14px;*/
                    /*white-space: nowrap;*/
                    /*text-overflow: ellipsis;*/
                    /*overflow:hidden;*/
                /*}*/
            /*}*/
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
        h5{
            color: rgba(0,0,0,0.7);
            font-family: MicrosoftYaHei-Bold;
            font-size: 16px;
            margin-bottom: 23px;
            width:100%;
        }
        .address,.bill{
            margin: 0 24px;
            display: flex;
            flex-wrap: wrap;
            ul{
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 48px;
                li{
                    width: 280px;
                    height: 122px;
                    box-shadow: 0px 3px 15px 0px #f1f1f1;
                    border-radius: 4px;
                    header{
                        border-top:2px solid rgba(0,0,0,0.2);
                        border-bottom: 1px solid rgba(0,0,0,0.05);
                        color: rgba(0,0,0,0.7);
                        padding: 0 12px;
                        p{
                            line-height: 40px;
                            font-size: 14px;
                        }
                        span{
                            font-size: 12px;
                            line-height: 40px;
                        }
                    }
                    main{
                        color: rgba(0,0,0,0.5);
                        font-size: 14px;
                        line-height: 24px;
                        padding: 0 12px;
                        margin-top: 6px;
                    }
                    footer{
                        display: flex;
                        justify-content: flex-end;
                        button{
                            font-size: 12px;
                            color: #3d98ff;
                            width:50px;
                            height: 12px;
                            margin:0;
                            padding:0;
                            background: #fff;
                            border: none;
                            visibility : hidden;
                            outline: none;
                        }
                    }
                }
                li+li{
                    margin-left: 12px;
                }
                li.default{
                    header{
                        border-top:2px solid #f81f22;
                        display: flex;
                        justify-content: space-between;
                    }
                }
                li.default:hover{
                    header{
                        border-top:2px solid #f81f22;
                    }
                    footer{
                        button+button{
                            visibility: visible;
                        }
                    }
                }
                li:hover{
                    cursor: pointer;
                    header{
                        border-top:2px solid #1f85f8;
                    }
                    footer{
                        button{
                            visibility: visible;
                        }
                    }
                }
                li.addAddress,li.addBill{
                    border: 1px solid rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-family: MicrosoftYaHei-Bold;
                    color: rgba(0,0,0,0.5);
                    i{
                        font-size: 32px;
                        color: #aaa;
                    }
                    div{
                        margin-top: 10px;
                        font-size: 14px;
                    }
                }
            }
        }
        .delivery{
            margin: 0 24px;
            .el-button{
                width: 120px;
                height: 35px;
                margin-left: 12px;
                background-color: #f6f6f6;
                margin-bottom: 48px;
                line-height: 0px;
                border: 1px solid #f6f6f6;
                span{
                    line-height: 0px;
                    font-size: 16px;
                }
            }
            .el-button:focus{
                background-color: #1fa4f8;
                border:1px solid #1fa4f8;
                color:white;
            }
        }
        .order{
            h5{
                margin-left: 24px;
            }
            padding-bottom:24px;
            border-bottom:1px solid rgba(0,0,0,0.05);
            .remark{
                margin-top: 24px;
                margin-left: 24px;
                span{
                    font-size: 14px;
                    color:rgba(0,0,0,0.5);
                    line-height: 30px;
                }
                .el-input{
                    width:350px;
                    height: 30px;
                    input{
                        height: 30px;
                    }

                }
            }
        }
        .coupon{
            margin: 24px 0;
            width: 100%;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.05);
            color: rgba(0,0,0,0.7);
            line-height: 40px;
            font-size: 12px;
            p{
                margin-left: 24px;
                i{
                    margin-right: 12px;
                    color:#f13a40;
                    font-size: 12px;
                }
                span{
                    color: rgba(0,0,0,0.5);
                }
            }
        }
        .coupon:hover{
            cursor: pointer;
        }
        .submitOrder{
            margin-right: 24px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            line-height: 40px;
            margin-bottom: 100px;
            div{
                font-size: 12px;
                color:rgba(0,0,0,0.7);
                span{
                    color:#f81f22;
                    font-size: 26px;
                    font-weight: bold;
                }
            }
            .el-button{
                width: 160px;
                height: 50px;
                background-color: #f13a40;
                border-radius: 4px;
                color: #fff;
                font-size: 22px;
                line-height: 0;
            }
        }
    }
</style>
