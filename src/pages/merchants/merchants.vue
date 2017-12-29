<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  import merchantsList from './components/merchantsList'
  import addMerchants from './components/addMerchants'
  import editMerchants from './components/editMerchants'
  export default {
    props: '',
    name: 'merchants',
    components: {merchantsList, addMerchants, editMerchants},
    data () {
      return {
      }
    },
    methods: {
    }

  }
</script>

<style scoped>

</style>



<!--<template>-->
  <!--<div>-->
    <!--<el-form ref="form" :model="form" :rules="rules" label-position="left">-->
      <!--<el-form-item label="登陆账号" label-width="100px" prop="account" class="form-button" position="relative">-->
        <!--<el-input v-model="form.account"></el-input>-->
        <!--<el-button @click="checkName" class="form-button">检测</el-button>-->
        <!--<span>注：登陆账号不可填手机号码，如需手机登陆，后续可以自主绑定手机登陆</span>-->
        <!--<span class="checkResult">{{this.checkResult}}</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="手机" label-width="100px" prop="contactMobile">-->
        <!--<el-input v-model="form.contactMobile"></el-input>-->
        <!--<span>注：此手机号码主要用于小店接受订单短信</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="密码" label-width="100px" prop="password">-->
        <!--<el-input v-model="form.password" type="password"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="密码确认" label-width="100px" prop="checkPass">-->
        <!--<el-input v-model="form.checkPass" type="password"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="店铺名称" label-width="100px" prop="shopName">-->
        <!--<el-input v-model="form.shopName"></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="所在地区" :rules="[{required: true}]" label-width="100px" props="location">-->
        <!--<el-cascader :options="locationOptions" v-model="location" @change="changeLocation"></el-cascader>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="详细地址" label-width="100px" class="address"-->
        <!--:rules="[{required: true, message: '请输入详细地址', trigger: 'blur'}]">-->
        <!--<el-input v-model="moreAddress"></el-input>-->
        <!--<el-button @click="getLocation" class="location form-button">定位</el-button>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="inline" label="经纬度" :rules="[{required: true, message: '经度', trigger: 'blur'}]" label-width="100px" prop="lat">-->
        <!--<span>经度：</span><el-input v-model="form.lat"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="inline" prop="lng" :rules="[{required: true, message: '纬度', trigger: 'blur'}]" >-->
        <!--<span>纬度：</span><el-input v-model="form.lng"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="类型" label-width="100px" prop="type">-->
        <!--<el-radio-group v-model="form.type">-->
          <!--<el-radio :label="0">直营</el-radio>-->
          <!--<el-radio :label="1">加盟</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="特性" label-width="100px" prop="character" >-->
        <!--<el-checkbox-group v-model="form.character">-->
          <!--<el-checkbox label="云超市店" disabled></el-checkbox>-->
          <!--<el-checkbox label="微便利店"></el-checkbox>-->
          <!--<el-checkbox label="直销"></el-checkbox>-->
          <!--<el-checkbox label="分销"></el-checkbox>-->
        <!--</el-checkbox-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="服务" label-width="100px" prop="service">-->
        <!--<el-checkbox-group v-model="form.service">-->
          <!--<el-checkbox label="门店管理" disabled></el-checkbox>-->
          <!--<el-checkbox label="采购进货" disabled></el-checkbox>-->
          <!--<el-checkbox label="微信店" disabled></el-checkbox>-->
          <!--<el-checkbox label="库存管理" disabled></el-checkbox>-->
          <!--<el-checkbox label="APP店"></el-checkbox>-->
          <!--<el-checkbox label="使用积分付款"></el-checkbox>-->
        <!--</el-checkbox-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="联系人" label-width="100px" prop="contact">-->
        <!--<el-input v-model="form.contact"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="联系电话" label-width="100px" prop="contactPhone">-->
        <!--<el-input v-model="form.contactPhone"></el-input>-->
        <!--<span>注：此联系电话主要用于小店管理消费者，可为小店座机号码</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="备注" label-width="100px" prop="remark" class="remark">-->
        <!--<el-input type="textarea" v-model="form.remark"-->
        <!--:autosize="{minRows:4}"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="负责人" label-width="100px" prop="owner">-->
        <!--<el-select  placeholder="请选择负责人" v-model="form.owner">-->
          <!--<el-option label="LTS美国市场" value="LTS美国市场"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="" label-width="100px">-->
        <!--<el-button type="primary" @click="submit">登记</el-button>-->
        <!--<el-button type="error" @click="resetForm('form')">清空</el-button>-->
        <!--<el-checkbox v-model="form.inin">全市场进货<span>(市场下所有供货商都可为该网点供货)</span></el-checkbox>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import Request from 'request'-->
  <!--import UserService from '@/services/UserService.js'-->
  <!--const userService = new UserService()-->
  <!--export default {-->
    <!--data () {-->
      <!--var validatePass = (rule, value, callback) => {-->
        <!--if (value === '') {-->
          <!--callback(new Error('请再次输入密码'))-->
        <!--} else if (value !== this.form.password) {-->
          <!--console.log(value)-->
          <!--callback(new Error('两次输入密码不一致!'))-->
        <!--} else {-->
          <!--callback()-->
        <!--}-->
      <!--}-->
      <!--return {-->
        <!--isRequired: true,-->
        <!--checkResult: '',-->
        <!--locationOptions: [{-->
          <!--value: '浙江省',-->
          <!--label: '浙江省',-->
          <!--children: [{-->
            <!--value: '杭州市',-->
            <!--label: '杭州市',-->
            <!--children: [{-->
              <!--value: '西湖区',-->
              <!--label: '西湖区'-->
            <!--}, {-->
              <!--value: '下城区',-->
              <!--label: '下城区'}-->
            <!--]}, {-->
              <!--value: '温州市',-->
              <!--label: '温州市',-->
              <!--children: [{-->
                <!--value: '乐清市',-->
                <!--label: '乐清市'}-->
              <!--]}-->
          <!--]-->
        <!--}, {-->
          <!--value: '云南省',-->
          <!--label: '云南省',-->
          <!--children: [{-->
            <!--value: '丽江市',-->
            <!--label: '丽江市',-->
            <!--children: [{-->
              <!--value: '古城区',-->
              <!--label: '古城区'-->
            <!--}, {-->
              <!--value: '永胜县',-->
              <!--label: '永胜县'}-->
            <!--]}-->
          <!--]-->
        <!--}],-->
        <!--location: ['北京市', '辖区', '东城区'],-->
        <!--moreAddress: '',-->
        <!--address: '北京市辖区东城区',-->
        <!--form: {-->
          <!--account: '新账户322',-->
          <!--contactMobile: '15022294864',-->
          <!--password: '11111111',-->
          <!--checkPass: '11111111',-->
          <!--shopName: '',-->
          <!--lat: '31.617510',-->
          <!--lng: '121.399780',-->
          <!--type: 0,-->
          <!--character: ['云超市店'],-->
          <!--service: ['门店管理', '采购进货', '微信店', '库存管理'],-->
          <!--contact: '王五',-->
          <!--contactPhone: '1512222190',-->
          <!--remark: '',-->
          <!--owner: '',-->
          <!--inin: false,-->
          <!--partnerName: '测试用户',-->
          <!--openCode: '331102',-->
          <!--lcCode: '110101000000',-->
          <!--carrierUid: '45412',-->
          <!--ip: '58.83.225.0'-->
        <!--},-->
        <!--rules: {-->
          <!--account: [-->
            <!--{ required: true, message: '请输入账号名称', trigger: 'blur' },-->
            <!--{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }-->
          <!--],-->
          <!--contactMobile: [-->
            <!--{required: true, message: '请输入手机号', trigger: 'blur'},-->
            <!--{ min: 11, max: 11, message: '手机号为11位数字', trigger: 'blur' }-->
          <!--],-->
          <!--password: [{ required: true, message: '请输入密码', trigger: 'blur' }],-->
          <!--checkPass: [-->
            <!--{ required: true, message: '请再次输入密码', trigger: 'blur' },-->
            <!--{validator: validatePass, trigger: 'blur'}-->
          <!--],-->
          <!--shopName: [{required: true, message: '请输入店铺名称', trigger: 'blur'}],-->
          <!--contact: [{required: true, message: '请输入联系人', trigger: 'blur'}],-->
          <!--contactPhone: [{required: true, message: '请输入联系电话', trigger: 'blur'}],-->
          <!--address: [{required: true, message: '请输入详细地址', trigger: 'blur'}-->
          <!--]-->
        <!--},-->
        <!--app_key: '00000-500mi',-->
        <!--method: 'wbm.tp.merchant.store.add',-->
        <!--session: '1111',-->
        <!--api: {-->
          <!--api: 'tp',-->
          <!--method: '/gateway/api'-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--getAddress () {-->
        <!--return {-->
          <!--address: this.address-->
          <!--// this.location[0] + this.location[1] + this.location[2] + this.moreAddress-->
        <!--}-->
      <!--},-->
      <!--resetForm (formName) {-->
        <!--this.$refs[formName].resetFields()-->
        <!--this.location = []-->
        <!--this.moreAddress = ''-->
      <!--},-->
      <!--getLocation () {-->
        <!--console.log(this.location[0] + this.location[1] + this.location[2])-->
        <!--alert('自动填入经纬度')-->
      <!--},-->
      <!--checkName () {-->
        <!--var account = this.form.account.trim()-->
      <!--},-->
      <!--changeLocation (value) {-->
        <!--console.log(value)-->
      <!--},-->
      <!--submit () {-->
        <!--let formData = Object.assign({}, this.getAddress(), this.form)-->
        <!--delete formData.checkPass-->
        <!--formData.type = this.form.type ? '加盟' : '直营'-->

        <!--let para = {}-->
        <!--para.app_key = this.app_key-->
        <!--para.method = this.method-->
        <!--para.session = this.session-->
        <!--para.store_request = JSON.stringify(formData)-->

        <!--console.log(para)-->
        <!--let link = Request.wbmApi(this.api.method, para)-->

        <!--link.then((data) => {-->
          <!--console.log(data)-->
        <!--}, (msg) => {-->
          <!--this.$ltsMessage.show({type: 'error', message: '新建工程商出错，请稍后重试'})-->
        <!--})-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style lang="less">-->
  <!--.el-form-item{-->
    <!--margin-bottom: 10px;-->
    <!--label{-->
      <!--padding-left: 10px;-->
    <!--}-->
    <!--.el-input{-->
      <!--width:200px;-->
      <!--.el-input__inner{-->
        <!--height: 30px;-->
      <!--}-->
    <!--}-->
    <!--.el-form-item__error{-->
      <!--padding-top: 0px;-->
    <!--}-->
    <!--.el-textarea{-->
      <!--width:300px;-->
    <!--}-->
    <!--span{-->
      <!--font-size: 12px;-->
    <!--}-->
    <!--span.checkResult{-->
      <!--display: block;-->
      <!--position: absolute;-->
      <!--line-height: 14px;-->
      <!--color:red;-->
      <!--top:calc(100% - 16px);-->
    <!--}-->
    <!--.el-button.form-button{-->
      <!--margin-left: 12px;-->
      <!--height: 30px;-->
      <!--padding-top: 7px;-->
    <!--}-->
  <!--}-->
  <!--.el-form-item.is-required{-->
    <!--label{-->
      <!--padding-left: 0px;-->
    <!--}-->
  <!--}-->
  <!--.el-form-item.account{-->
    <!--.el-form-item__content{-->
      <!--line-height: 20px;-->
      <!--margin-top: -10px;-->
    <!--}-->
  <!--}-->
  <!--.el-form-item.inline{-->
    <!--display:inline-block;-->
    <!--margin-right: 10px;-->
    <!--.el-input{-->
      <!--width:120px;-->
    <!--}-->
  <!--}-->
  <!--.el-form-item.address{-->
    <!--.el-input{-->
      <!--width:390px;-->
    <!--}-->
  <!--}-->
  <!--.el-form-item.remark{-->
    <!--margin-top: 18px;-->
  <!--}-->

<!--</style>-->
