<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item label="登陆账号" label-width="80px">
        <el-input prop="account" max="120"></el-input>
        <span>登陆账号是长度在8到30位的数字、汉子、字母、下划线的组合</span>
      </el-form-item>
      <el-form-item label="手机" label-width="80px">
        <el-input prop="mobile"  ></el-input>
        <span>注：此手机号码主要用于小店接受订单短信</span>
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input prop="pass"  ></el-input>
      </el-form-item>
      <el-form-item label="密码确认" label-width="80px">
        <el-input prop="checkPass"  ></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" label-width="80px">
        <el-input prop="shopName"  ></el-input>
      </el-form-item>
      <el-form-item label="所在地区" label-width="80px">
        <el-select prop="location1" placeholder="请选择省份">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select prop="location2" placeholder="请选择城市">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select prop="location3" placeholder="请选择区县">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" label-width="80px">
        <el-input prop="address"  ></el-input>
      </el-form-item>
      <el-form-item label="经纬度" label-width="80px">
        <span>经度：</span><el-input prop="lat"  ></el-input>
        <span>纬度：</span><el-input prop="long"  ></el-input>
      </el-form-item>
      <el-form-item label="类型" label-width="80px">
        <el-radio-group prop="group">
          <el-radio :label="1">直营</el-radio>
          <el-radio :label="2">加盟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="特性" label-width="80px">
        <el-checkbox-group prop="character" v-model="form.character">
          <el-checkbox label="云超市店" disabled></el-checkbox>
          <el-checkbox label="微便利店"></el-checkbox>
          <el-checkbox label="直销"></el-checkbox>
          <el-checkbox label="分销"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="服务" label-width="80px">
        <el-checkbox-group prop="service">
          <el-checkbox label="门店管理" disabled></el-checkbox>
          <el-checkbox label="采购进货" disabled></el-checkbox>
          <el-checkbox label="微信店" disabled></el-checkbox>
          <el-checkbox label="库存管理" disabled></el-checkbox>
          <el-checkbox label="APP店"></el-checkbox>
          <el-checkbox label="使用积分付款"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="联系人" label-width="80px">
        <el-input prop="person"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" label-width="80px">
        <el-input prop="phone"  ></el-input>
      </el-form-item>
      <el-form-item label="备注" label-width="80px">
        <el-input class="remark" prop="remark" type="textarea" :row="8"></el-input>
      </el-form-item>
      <el-form-item label="负责人" label-width="80px">
        <el-select prop="responsib" placeholder="选择负责人">
          <el-option label="LTS美国市场" value="LTS_USA"></el-option>
        </el-select>
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
          count: '',
          mobile: '',
          pass: '',
          checkPass: '',
          shopName: '',
          location1: '',
          location2: '',
          location3: '',
          address: '',
          lat: '',
          long: '',
          group: 1,
          character: ['云超市店'],
          service: ['门店管理','采购进货','微信店','库存管理'],
          person: '',
          phone: '',
          remark: '',
          responsib: '[]'
        }
      }
    },
    methods: {
      resetForm(formName) {
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
