<template>
  <div class="spuInfo">
    <el-steps :active="stepActive" align-center style="padding-bottom:12px;margin-bottom:12px;">
      <el-step title="步骤1" description="选择并确定类目"></el-step>
      <el-step title="步骤2.1" description="完善产品基本信息"></el-step>
      <el-step title="步骤2.2" description="完善产品规格"></el-step>
      <el-step title="步骤3" description="完善商品信息"></el-step>
    </el-steps>
    <div class="addspu" style="float: left;">
       <h1 style="margin-top:0">添加产品基本信息</h1>
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="spu-form">
         <el-form-item label="产品名称" prop="spuName">
           <el-input v-model="ruleForm.spuName"></el-input>
         </el-form-item>
         <el-form-item label="产品品牌" prop="spuBrand">
           <el-input v-model="ruleForm.spuBrand"></el-input>
         </el-form-item>
         <el-form-item label="产品产地" prop="spuArea">
           <el-input v-model="ruleForm.spuArea"></el-input>
         </el-form-item>
         <el-form-item label="产品类目" prop="spuCategory">
             <el-cascader
                 v-model="ruleForm.spuCategory"
                 placeholder="选择类目"
                 expand-trigger="hover"
                 @change="cascAderHandleChange"
                 :options="categoryList">
             </el-cascader>
         </el-form-item>
         <el-form-item label="销售单位" prop="saleSpec">
             <el-input v-model="ruleForm.saleSpec"></el-input>
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
           <el-button type="primary" @click="addSpuSpec('ruleForm')">下一步</el-button>
           <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        categoryList : [],
        ruleForm:{
          spuName : '',
          spuBrand : '',
          spuArea : '',
          spuCategory : [],
          categoryId : "",
          spuImg : '',
          saleSpec : '',
        },
        rules:{
          spuName: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          spuBrand: [
            { required: true, message: '请输入产品品牌', trigger: 'blur' }
          ],
          spuArea: [
            { required: true, message: '请输入产品产地', trigger: 'blur' }
          ],
          spuCategory: [
            { required: true, message: '请选择产品类目', trigger: 'blur' }
          ],
          spuImg: [
            { required: true, message: '请选择产品主图', trigger: 'blur' }
          ],
          saleSpec: [
            { required: true, message: '请填写产品销售单位', trigger: 'blur' }
          ],
        }
      }
    },
    mounted(){
        console.log(this.$route.params)
        this.categoryList = this.$route.params.category;
        this.ruleForm.spuCategory = this.$route.params.selectCategory;
    },
    methods:{
      onSubmit(){

      },
      resetForm(formName) {
         this.$refs[formName].resetFields();
      },
      cascAderHandleChange(){

      },
      addSpuSpec(formName){debugger;
        this.$refs[formName].validate((valid) => {
            if(valid){debugger;
                let index = this.ruleForm.spuCategory.length - 1;
                let category_id = this.ruleForm.spuCategory[index];
                this.ruleForm.categoryId = category_id;
                this.$router.push({name:"addSpuSpec",params : {
                    spuInfo : this.ruleForm,
                }})
            }else{
                return false;
            }
        });
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
  .el-cascader{
      width: 100%;
  }
</style>
