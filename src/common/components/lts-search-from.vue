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
    <el-form-item>
      <dropdown :options="dropdown" />
    </el-form-item>
    <el-button @click="bounce">dianwo</el-button>
  </el-form>
</template>
<script>
  import dropdown from './lts-dropdown'
  import _ from 'lodash'
  export default{
    name: 'lts-form',
    props: '',
    components: { dropdown },
    data () {
      return {
        formInline: {
          user: '123',
          region: ''
        },
        dropdown: {
          type: '',
          title: 'xiala',
          content: {
            'a': 'aaa',
            'b': 'bbb',
            'c': 'ccc'
          }
        }
      }
    },
    methods: {
      onSubmit () {
        this.$emit('get-from', this.formInline.user)
      },
      bounce: _.debounce(function () {
        console.log('点击了一次')
      }, 500)
    }
}
</script>
