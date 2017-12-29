<template>
    <div>
        <el-form  ref="form" :model="form" label-position="left">
            <el-form-item label="市场名称" label-width="110px" prop="bizName">
                <el-input v-model="form.bizName" ></el-input>
            </el-form-item>
            <el-form-item label="市场英文名称" label-width="110px" prop="bizEname">
                <el-input v-model="form.bizEname" ></el-input>
            </el-form-item>
            <el-form-item label="开放码" label-width="110px" prop="openCode">
                <span v-model="form.openCode">LTS AAAA</span>
            </el-form-item>
            <el-form-item label="市场码" label-width="110px" prop="code">
                <span v-model="form.code">LTS BBBB</span>
            </el-form-item>
            <el-form-item label="运营商" label-width="110px" prop="operator">
                <span v-model="form.operator">美国LTS公司</span>
            </el-form-item>
            <el-form-item label="特性" label-width="110px" prop="attribute" >
                <el-checkbox-group v-model="form.attribute">
                    <el-checkbox label="批发" ></el-checkbox>
                    <el-checkbox label="零售"></el-checkbox>
                    <el-checkbox label="派收"></el-checkbox>
                    <el-checkbox label="第三方市场"></el-checkbox>
                    <el-checkbox label="允许建子市场"></el-checkbox>
                    <el-checkbox label="不限制地理区域"></el-checkbox>
                    <el-checkbox label="可直接浏览（不需要登录即可浏览）"></el-checkbox>
                    <el-checkbox label="可直接进店购买"></el-checkbox>
                    <el-checkbox label="自定义类目"></el-checkbox>
                    <el-checkbox label="使用父市场零售类目"></el-checkbox>
                    <el-checkbox label="使用父市场批发类目"></el-checkbox>
                    <el-checkbox label="共享父市场零售"></el-checkbox>
                    <el-checkbox label="共享父市场批发商品"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="覆盖区域" label-width="110px" prop="erea" v-if="form.limit">
                <el-input v-model="form.erea"></el-input>
            </el-form-item>
            <el-form-item props="state" label="市场状态">
                <el-select v-model="form.state" placeholder="请选择">
                    <el-option label="内测" value="内测"></el-option>
                    <el-option label="已上线" value="已上线"></el-option>
                    <el-option label="冻结" value="冻结"></el-option>
                    <el-option label="初始化" value="初始化"></el-option>
                    <el-option label="待审核" value="待审核"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" label-width="110px">
                <el-button type="primary" @click="submit">登记</el-button>
                <el-button type="error" @click="resetForm('form')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: "editSegments",
      data(){
        return {
            form: {
                bizName: '',
                bizEname: '',
                openCode: '',
                code: '',
                operator: '',
                attribute: [],
                erea: '',
                limit: true,
                state: ''
            }
        }
      },
      methods: {
          resetForm (formName) {
              this.$refs[formName].resetFields()
              this.form.state = ''
          },
          submit(){
              console.log('submit')
          }
      }
  }
</script>

<style scoped lang="less">
    .el-form-item {
        margin-bottom: 10px;
        .el-checkbox-group {
            line-height: 20px;
            margin-top: 10px;
        }
        .el-checkbox {
            line-height: 20px;
            margin-left: 10px;
        }
        .el-input {
            width: 200px;
            .el-input__inner {
                height: 30px;
            }
        }
        .el-select{
            margin-left: 42px;
        }
    }

</style>
