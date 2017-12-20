<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" if="formInline">
    <el-form-item v-for="(val,key) in formFileds" :label="val.label" >
      <div v-if="key == 'date'">
        <el-date-picker
          v-model="datelist"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </div>
      <div v-else-if="key == 'input'">
        <el-input v-model="formInline[val.bindValue]" :placeholder="val.bindPlaceholder"></el-input>
      </div>
      <div v-else-if="key == 'select'">
        <el-select v-model="formInline[val.bindValue]" placeholder="活动区域">
          <el-option v-for="(opt,index) in val.children" :label="opt.label" :value="opt.bindValue"></el-option>
        </el-select>
      </div>
    </el-form-item>
    <el-form-item align="right">
      <el-button type="primary" @click="onSubmit" icon="el-icon-search">{{$t('productButton.search')}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>

export default{
  name:'lts-form',
  props: ['formInlines','formFileds'],
  data() {
    return {
      datelist : '',
      formInline: this.formInlines,
      formFiled : this.formFileds,
    }
  },
  mounted(){
    console.log(this.formFiled);
  },
  methods: {
    onSubmit() {
      if(this.datelist){
        this.formInline.start_date = Date.parse(this.datelist[0]);
        this.formInline.end_date = Date.parse(this.datelist[1]);
      }
      this.$emit('get-from',this.formInline);
    }
  }
}
</script>

