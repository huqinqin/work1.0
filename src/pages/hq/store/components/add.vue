<template>
    <div class="segments">
        <el-form ref="form" :model="form" :rules="rules" label-position="left">
            <h3>市场信息</h3>
            <el-form-item label="市场名称" label-width="110px" prop="bizName">
                <el-input v-model="form.bizName" ></el-input>
            </el-form-item>
            <el-form-item label="市场英文名称" label-width="110px" prop="bizEname">
                <el-input v-model="form.bizEname" ></el-input>
            </el-form-item>
            <el-form-item label="业务开放码" label-width="110px" prop="open_code">
                <el-input v-model="form.open_code" @blur="checkCode"></el-input>
                <span v-if="checkCodeResult" style="color:red;">开放码已存在，请换一个</span>
            </el-form-item>
            <el-form-item label="特性" label-width="110px" prop="aaattribute" >
                <el-checkbox-group v-model="form.aaattribute" @change="checkHandle">
                    <el-checkbox label="批发" ></el-checkbox>
                    <el-checkbox label="零售"></el-checkbox>
                    <el-checkbox label="派收"></el-checkbox>
                    <el-checkbox label="第三方市场"></el-checkbox>
                    <el-checkbox label="允许建子市场"></el-checkbox>
                    <el-checkbox label="不限制地理区域"></el-checkbox>
                    <el-checkbox label="可直接浏览（不需要登录即可浏览）"></el-checkbox>
                    <el-checkbox label="可直接进店购买"></el-checkbox>
                    <el-checkbox label="自定义类目"></el-checkbox>
                    <el-checkbox label="使用父市场零售类目"></el-checkbox>
                    <el-checkbox label="使用父市场批发类目"></el-checkbox>
                    <el-checkbox label="共享父市场零售"></el-checkbox>
                    <el-checkbox label="共享父市场批发商品"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="覆盖区域" label-width="110px" prop="erea" v-if="form.limit">
                <el-input v-model="form.erea"></el-input>
            </el-form-item>
            <el-form-item props="select" label="市场状态">
                <el-select v-model="form.select" placeholder="必选" @change="selectHandle">
                    <el-option label="内测" value="内测"></el-option>
                    <el-option label="已上线" value="已上线"></el-option>
                    <el-option label="冻结" value="冻结"></el-option>
                    <el-option label="初始化" value="初始化"></el-option>
                    <el-option label="待审核" value="待审核"></el-option>
                    <el-option label="已删除" value="已删除"></el-option>
                </el-select>
            </el-form-item>

            <h3>账号信息</h3>
            <el-form-item label="登陆账号" label-width="110px" prop="account" class="form-button" position="relative">
                <el-input v-model="form.account"></el-input>
                <span>注：登陆账号不可填手机号码，如需手机登陆，后续可以自主绑定手机登陆</span>
            </el-form-item>
            <el-form-item label="密码" label-width="110px" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="密码确认" label-width="110px" prop="checkPass">
                <el-input v-model="form.checkPass" type="password"></el-input>
            </el-form-item>

            <h3>详细信息</h3>
            <el-form-item label="公司名称" label-width="110px" prop="companyName">
                <el-input v-model="form.companyName"></el-input>
            </el-form-item>
            <el-form-item label="所在地区"  label-width="110px" props="location">
                <el-cascader :options="locationOptions" v-model="location" @change="changeLocation"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" label-width="110px" class="address">
                <el-input v-model="moreAddress"></el-input>
                <el-button @click="getLocation" class="location form-button">定位</el-button>
            </el-form-item>
            <el-form-item class="inline" label="经纬度" label-width="110px" prop="lng">
                <span>经度：</span><el-input v-model="form.lng"></el-input>
            </el-form-item>
            <el-form-item class="inline" prop="lat">
                <span>纬度：</span><el-input v-model="form.lat"></el-input>
            </el-form-item>
            <el-form-item label="联系人" label-width="110px" prop="contact">
                <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系手机" label-width="110px" prop="contactMobile">
                <el-input v-model="form.contactMobile"></el-input>
                <span>注：此手机号码主要用于接受短信提醒</span>
            </el-form-item>
            <el-form-item label="联系电话" label-width="110px" prop="contactPhone">
                <el-input v-model="form.contactPhone"></el-input>
                <span>注：可为小店座机号码</span>
            </el-form-item>
            <el-form-item label="法人" label-width="110px" prop="partnerName">
                <el-input v-model="form.partnerName"></el-input>
            </el-form-item>
            <el-form-item label="营业执照" label-width="110px" prop="license">
                <el-input v-model="form.license"></el-input>
            </el-form-item>
            <el-form-item label="税号" label-width="110px" prop="number">
                <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="备注" label-width="110px" prop="remark" class="remark">
                <el-input type="textarea" v-model="form.remark"
                          :autosize="{minRows:4}"></el-input>
            </el-form-item>
            <el-form-item label="" label-width="110px">
                <el-button type="primary" @click="submit">登记</el-button>
                <el-button type="error" @click="resetForm('form')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
    import {request} from 'ltsutil'
    import segmentsService from '@/services/SegmentsService'
    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.form.password) {
                    console.log(value)
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                location: ['北京市', '辖区', '东城区'],
                moreAddress: '',
                checkCodeResult:false,
                form:{
                    bizName: 'qw21e1',
                    bizEname: 'qw12e1',
                    aaattribute: [],
                    attribute: '',// 市场特性
                    limit: true,
                    select:'内测',
                    erea: '',
                    bizStatus: '0',
                    account: 'qw453e1',
                    password: 'qwertyuiop',
                    checkPass: 'qwertyuiop',
                    address: '北京市辖区东城区',
                    lat: '',        // 纬度
                    lng:'',         // 经度
                    companyName: '',// 公司名称
                    contact:'qwe',
                    contactMobile: '13534267890',
                    contactPhone: '13533567890',
                    partnerName: 'qw',          // 法人
                    license: '',        // 营业执照
                    number: '',         // 税号
                    remark: '',
                    lcCode: '110101000000',
                    owner_uid:158748,
                    parentBizId: '',
                    open_code:''
                },
                rules:{
                    checkPass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    open_code: [
                        {required:true,message:'数字与字母组合的八位编码',trigger: 'blur'}
                    ]
                },
                locationOptions: [{
                    value: '浙江省',
                    label: '浙江省',
                    children: [{
                        value: '杭州市',
                        label: '杭州市',
                        children: [{
                            value: '西湖区',
                            label: '西湖区'
                        }, {
                            value: '下城区',
                            label: '下城区'}
                        ]}, {
                        value: '温州市',
                        label: '温州市',
                        children: [{
                            value: '乐清市',
                            label: '乐清市'}
                        ]}
                    ]
                }, {
                    value: '云南省',
                    label: '云南省',
                    children: [{
                        value: '丽江市',
                        label: '丽江市',
                        children: [{
                            value: '古城区',
                            label: '古城区'
                        }, {
                            value: '永胜县',
                            label: '永胜县'}
                        ]}
                    ]
                }],
                api: {
                    method: '/market/addChildMarket',
                    bizparams: {
                    }
                },
                checkbox:[
                    "批发","零售","派收","第三方市场","允许建子市场","不限制地理区域",
                    "可直接浏览（不需要登录即可浏览）","可直接进店购买","自定义类目","使用父市场零售类目",
                    "使用父市场批发类目","共享父市场零售","共享父市场批发商品"
                ]
            }
        },
        methods: {
            // 市场状态转为数字编号
            selectHandle(value){
                switch (value) {
                    case '内测':
                        this.form.bizStatus = 0
                        break
                    case '已上线':
                        this.form.bizStatus = 1
                        break
                    case '冻结':
                        this.form.bizStatus = 2
                        break
                    case '初始化':
                        this.form.bizStatus = 3
                        break
                    case '待审核':
                        this.form.bizStatus = 9
                        break
                    case '已删除':
                        this.form.bizStatus = -1
                        break
                }
                console.log(this.form.bizStatus)
            },
            // 属性数组转为二进制
            checkHandle(value){
                let obj = {}
                let init = 4
                let count = 0

                for(let i = 0; i < this.checkbox.length; i++){
                    let val = this.checkbox[i]
                    obj[val] = (init << i)
                }
                for(let j = 0; j < value.length; j++){
                    if(value[j] in obj){
                        count += obj[value[j]]
                    }
                }
                this.form.attribute = count
                console.log(this.form.attribute)
            },
            checkName(){
                console.log('checkName')
            },
            resetForm (formName) {
                this.$refs[formName].resetFields()
                this.location = []
                this.moreAddress = ''
            },
            changeLocation(value){
                this.form.address = this.location[0] + this.location[1] + this.location[2]

                console.log(this.form.address)
            },
            getLocation(value){
                console.log('自动填入经纬度')
            },
            // check openCode
            checkCode(value){
                console.log(value.target.value)
                let checkCode = segmentsService.checkCode(value.target.value)
                checkCode.then((data) => {
                    console.log(data)
                    this.checkCodeResult = false
                },(msg) => {
                    console.log(msg)
                    this.checkCodeResult = true
                })
            },
            submit(){
                let formData = Object.assign({},this.form)
                delete formData.aaattribute
                delete formData.select
                let addSegments = segmentsService.addSegmentsItem(formData)
                addSegments.then((data) => {
                    console.log('success')
                }, (msg) => {
                    console.log(msg)
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            }
        },
        mounted(){
          let getItemId = segmentsService.getItemId()
          getItemId.then((data) => {
            console.log(data)
            this.form.parentBizId = data.data.id
          }, (msg) => {
            console.log(msg)
            this.$ltsMessage.show({type: 'error', message: msg.error_message})
          })
        }
    }
</script>
<style lang="less" scoped>
    .el-form{
        h3{
            font-weight: normal;
            text-align: left;
        }
        .el-form-item{
            margin-bottom: 10px;
            .el-checkbox-group{
                line-height: 20px;
                margin-top: 10px;
            }
            .el-checkbox{
                line-height: 20px;
                margin-left: 10px;
            }
            .el-input{
                width:200px;
                .el-input__inner{
                    height: 30px;
                }
            }
            .el-form-item__error{
                padding-top: 0px;
            }
            .el-textarea{
                width:300px;
            }
            span{
                font-size: 12px;
            }
            .el-select{
                margin-left: 44px;
            }
        }
        .el-form-item.inline{
            display:inline-block;
            margin-right: 10px;
            .el-input{
                width:120px;
            }
        }
        .el-form-item.address{
            .el-input{
                width:390px;
            }
        }
        .el-form-item.remark{
            margin-top: 18px;
        }

    }
</style>
