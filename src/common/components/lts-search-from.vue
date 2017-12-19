<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="审批人">
      <el-input v-model="formInline.user" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="formInline.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import Loading from './lts-loading';
  export default{
    name:'lts-form',
    props: "",
    data() {
      return {
        formInline: {
          user: '123',
          region: '',
        },
        options: {
          text: 'jiazaizhong',
          spinner: null,
          background: 'rgba(0,0,0,0,7)',
          fullscreen: true,
          visible: false,
          customClass: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$emit('get-from',this.formInline.user);

        console.log(Loading);
        Loading.service(this.options);
      }
    }
  }
</script>
