<template>
  <div>
    <div  v-for="bar in formFileds">
      <div v-for="(menubar,menukey) in bar">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" if="formInline" v-if="menukey == 'search'">
          <el-form-item  v-for="(val,key) in menubar" :label="val.label" :key="val.label"  >
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
                <el-option v-for="(opt,index) in val.children" :label="opt.label" :key="opt.bindValue" :value="opt.bindValue"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">{{$t('productButton.search')}}</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" if="formInline" v-else-if="menukey == 'toolbar'">
          <el-form-item  v-for="(val,key) in menubar" :label="val.label" :key="val.label"  >
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
                <el-option v-for="(opt,index) in val.children" :label="opt.label" :key="opt.bindValue" :value="opt.bindValue"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
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

