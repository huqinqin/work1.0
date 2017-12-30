<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:12px;margin-bottom:12px;border-bottom:solid 1px #eeeeee">
      <el-breadcrumb-item ><a href="http://www.baidu.com">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item ><a href="http://www.baidu.com">商品</a></el-breadcrumb-item>
      <el-breadcrumb-item>添加商品模板基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="stepActive" align-center style="padding-bottom:12px;margin-bottom:12px;">
      <el-step title="步骤1" description="选择并确定类目"></el-step>
      <el-step title="步骤2.1" description="完善产品基本信息"></el-step>
      <el-step title="步骤2.2" description="完善产品规格"></el-step>
      <el-step title="步骤3" description="完善商品信息"></el-step>
    </el-steps>
    <div class="addspu" style="float: left;">
       <h1 style="margin-top:0">添加产品基本信息</h1>
       <el-form ref="form" :model="ruleForm" label-width="80px" class="spu-form">
         <el-form-item label="产品名称" prop="name">
           <el-input v-model="ruleForm.name"></el-input>
         </el-form-item>
         <el-form-item label="产品品牌" prop="name">
           <el-input v-model="ruleForm.name"></el-input>
         </el-form-item>
         <el-form-item label="产品产地" prop="name">
           <el-input v-model="ruleForm.name"></el-input>
         </el-form-item>
         <el-form-item label="产品类目" prop="name">
           <el-input v-model="ruleForm.name"></el-input>
         </el-form-item>
         <el-form-item label="产品主图" prop="name">
           <el-upload
             class="upload-demo"
             drag
             action="https://jsonplaceholder.typicode.com/posts/"
             multiple>
             <i class="el-icon-upload"></i>
             <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
             <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
           </el-upload>
         </el-form-item>
         <el-form-item>
           <router-link to="/addSpuSpec"><el-button type="primary">下一步</el-button></router-link>
           <el-button>重置</el-button>
         </el-form-item>
       </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'addSpu',
    data(){
      return {
        stepActive : 2,

        ruleForm:{
          name : '',
        },
        rules:{
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    mounted(){

    },
    methods:{
      onSubmit(){

      },
    },
  }
</script>
<style lang="less" scoped>
  .spu-form{
    width: 500px;
  }
  .el-switch{
    margin-top: 10px;
  }
</style>
