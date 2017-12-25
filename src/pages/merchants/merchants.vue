<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item label="登陆账号" label-width="80px" prop="name" >
        <el-input v-model="form.name"></el-input>
        <span>登陆账号是长度在8到30位的数字、汉子、字母、下划线的组合</span>
      </el-form-item>
      <el-form-item label="手机" label-width="80px" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
        <span>注：此手机号码主要用于小店接受订单短信</span>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="pass">
        <el-input v-model="form.pass"></el-input>
      </el-form-item>
      <el-form-item label="密码确认" label-width="80px" prop="checkPass">
        <el-input v-model="form.checkPass"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" label-width="80px" prop="shopName">
        <el-input v-model="form.shopName"></el-input>
      </el-form-item>
      <el-form-item label="所在地区" label-width="80px" prop="location">
        <el-select  placeholder="请选择省份" v-model="form.location.province">
          <el-option label="区域一" value="shanghai" ></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select placeholder="请选择城市" v-model="form.location.city">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select placeholder="请选择区县" v-model="form.location.town">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" label-width="80px" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="经纬度" label-width="80px" prop="latAndLong">
        <span>经度：</span><el-input v-model="form.latAndLong.lat"></el-input>
        <span>纬度：</span><el-input v-model="form.latAndLong.long"></el-input>
      </el-form-item>
      <el-form-item label="类型" label-width="80px" prop="group">
        <el-radio-group v-model="form.group">
          <el-radio :label="1">直营</el-radio>
          <el-radio :label="2">加盟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="特性" label-width="80px" prop="character" >
        <el-checkbox-group v-model="form.character">
          <el-checkbox label="云超市店" disabled></el-checkbox>
          <el-checkbox label="微便利店"></el-checkbox>
          <el-checkbox label="直销"></el-checkbox>
          <el-checkbox label="分销"></el-checkbox>
        </el-checkbox-group>

      </el-form-item>


      <el-form-item label="" label-width="80px">
        <el-button type="primary">登记</el-button>
        <el-button type="error" @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        form: {
          name: '',
          mobile: '',
          pass: '',
          checkPass: '',
          shopName: '',
          location: {
            province: '',
            city: '',
            town: ''
          },
          address: '',
          latAndLong: {
            lat: '',
            long:''
          },
          group: 1,
          character: ['云超市店'],
          service: ['门店管理', '采购进货', '微信店', '库存管理'],
          person: '',
          phone: '',
          remark: '',
          responsib: '[]'
        }
      }
    },
    methods: {
      resetForm (formName) {
        this.$refs[formName].resetFields()
        console.log(123)
      }
    }
  }
</script>
<style lang="less">
  .el-input{
    width:200px;
  }
  .el-textarea{
    width:300px;
  }
</style>
