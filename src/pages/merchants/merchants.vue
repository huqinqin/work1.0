<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-position="left">
      <el-form-item label="登陆账号" label-width="100px" prop="name" class="form-button" position="relative">
        <el-input v-model="form.name"></el-input>
        <el-button @click="checkName" class="form-button">检测</el-button>
        <span>注：登陆账号不可填手机号码，如需手机登陆，后续可以自主绑定手机登陆</span>
        <span class="checkResult">{{this.checkResult}}</span>
      </el-form-item>
      <el-form-item label="手机" label-width="100px" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
        <span>注：此手机号码主要用于小店接受订单短信</span>
      </el-form-item>
      <el-form-item label="密码" label-width="100px" prop="pass">
        <el-input v-model="form.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="密码确认" label-width="100px" prop="checkPass">
        <el-input v-model="form.checkPass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" label-width="100px" prop="shopName">
        <el-input v-model="form.shopName"></el-input>
      </el-form-item>
      <el-form-item class="inline" label="所在地区" label-width="100px" prop="province">
        <el-select  placeholder="请选择省份" v-model="form.province">
          <el-option label="区域一" value="shanghai" ></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="inline" label="" prop="city" >
        <el-select  placeholder="请选择城市" v-model="form.city">
          <el-option label="区域一" value="shanghai" ></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="inline" label="" prop="town">
        <el-select  placeholder="请选择区县" v-model="form.town">
          <el-option label="区域一" value="shanghai" ></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" label-width="100px" prop="address" class="address">
        <el-input v-model="form.address"></el-input>
        <el-button @click="getLocation" class="location form-button">定位</el-button>
      </el-form-item>
      <el-form-item class="inline" label="经纬度" label-width="100px" prop="lat">
        <span>经度：</span><el-input v-model="form.lat"></el-input>
      </el-form-item>
      <el-form-item class="inline" prop="long">
        <span>纬度：</span><el-input v-model="form.long"></el-input>
      </el-form-item>
      <el-form-item label="类型" label-width="100px" prop="group">
        <el-radio-group v-model="form.group">
          <el-radio :label="1">直营</el-radio>
          <el-radio :label="2">加盟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="特性" label-width="100px" prop="character" >
        <el-checkbox-group v-model="form.character">
          <el-checkbox label="云超市店" disabled></el-checkbox>
          <el-checkbox label="微便利店"></el-checkbox>
          <el-checkbox label="直销"></el-checkbox>
          <el-checkbox label="分销"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="服务" label-width="100px" prop="service">
        <el-checkbox-group v-model="form.service">
          <el-checkbox label="门店管理" disabled></el-checkbox>
          <el-checkbox label="采购进货" disabled></el-checkbox>
          <el-checkbox label="微信店" disabled></el-checkbox>
          <el-checkbox label="库存管理" disabled></el-checkbox>
          <el-checkbox label="APP店"></el-checkbox>
          <el-checkbox label="使用积分付款"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="联系人" label-width="100px" prop="person">
        <el-input v-model="form.person"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" label-width="100px" prop="phone">
        <el-input v-model="form.phone"></el-input>
        <span>注：此联系电话主要用于小店管理消费者，可为小店座机号码</span>
      </el-form-item>
      <el-form-item label="备注" label-width="100px" prop="remark" class="remark">
        <el-input type="textarea" v-model="form.remark"
        :autosize="{minRows:4}"></el-input>
      </el-form-item>
      <el-form-item label="负责人" label-width="100px" prop="responsib">
        <el-select  placeholder="请选择负责人" v-model="form.responsib">
          <el-option label="LTS美国市场" value="LTS"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" label-width="100px">
        <el-button type="primary" @click="submit">登记</el-button>
        <el-button type="error" @click="resetForm('form')">清空</el-button>
        <el-checkbox v-model="form.inin">全市场进货<span>(市场下所有供货商都可为该网点供货)</span></el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Request from 'request'
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.pass) {
          console.log(value)
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        isRequired: true,
        checkResult: '',
        form: {
          name: '',
          mobile: '',
          pass: '',
          checkPass: '',
          shopName: '',
          province: '',
          city: '',
          town: '',
          address: '',
          lat: '',
          long: '',
          group: 1,
          character: ['云超市店'],
          service: ['门店管理', '采购进货', '微信店', '库存管理'],
          person: '',
          phone: '',
          remark: '',
          responsib: '',
          inin: false
        },
        rules: {
          name: [
            { required: true, message: '请输入账号名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            { min: 11, max: 11, message: '手机号为11位数字', trigger: 'blur' }
          ],
          pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          checkPass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            {validator: validatePass, trigger: 'blur'}
          ],
          shopName: [{required: true, message: '请输入店铺名称', trigger: 'blur'}],
          person: [{required: true, message: '请输入联系人', trigger: 'blur'}],
          phone: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
          address: [{required: true, message: '请输入详细地址', trigger: 'blur'}]
        },
        api: {
          api: '',
          method: ''
        }
      }
    },
    methods: {
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      getLocation () {
        alert('调用地图')
      },
      checkName () {
        alert('检测用户名是否可用')
      },
      submit () {
        this.loading = true
        let link = ''
        switch (this.api.api) {
          case 'wbmApi':
            link = Request.wbmApi(this.api.method, this.form)
            break
          case 'tp':
            link = Request.tp(this.api.method, this.form)
            break
        }
        link.then((data) => {
          this.loading = false
          const resp = JSON.parse(data)
          console.log(resp)
        }, (msg) => {
          this.loading = false
          this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
        })
      }
    }
  }
</script>
<style lang="less">
  .el-form-item{
    margin-bottom: 10px;
    label{
      padding-left: 10px;
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
    span.checkResult{
      display: block;
      position: absolute;
      line-height: 14px;
      color:red;
      top:calc(100% - 16px);
    }
    .el-button.form-button{
      margin-left: 12px;
      height: 30px;
      padding-top: 7px;
    }
  }
  .el-form-item.is-required{
    label{
      padding-left: 0px;
    }
  }
  .el-form-item.name{
    .el-form-item__content{
      line-height: 20px;
      margin-top: -10px;
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

</style>
