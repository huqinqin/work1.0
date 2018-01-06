<template>
    <div>
        <el-form  ref="form" :model="form" label-position="left">
            <el-form-item label="市场名称" label-width="110px" prop="bizName">
                <el-input v-model="form.bizName" ></el-input>
            </el-form-item>
            <el-form-item label="市场英文名称" label-width="110px" prop="bizEname">
                <el-input v-model="form.bizEname" ></el-input>
            </el-form-item>
            <el-form-item label="开放码" label-width="110px">
                <span>{{openCode}}</span>
            </el-form-item>
            <el-form-item label="特性" label-width="110px" prop="aaattribute" >
                <el-checkbox-group v-model="form.aaattribute" @change="checkHandle">
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
                <el-select v-model="form.state" placeholder="请选择" @change="selectHandle">
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
    import {request} from 'ltsutil'
    import segmentsService from '@/services/SegmentsService.js'
  export default {
    name: "editSegments",
      data(){
        return {
            openCode: 'LTS AAA',
            form: {
                bizName: '',
                bizEname: '',
                aaattribute: [],
                attribute: '',
                erea: '',
                limit: true,
                state: '内测',
                bizStatus: '0',
                id:3076
            },
            checkbox:[
                "批发","零售","派收","第三方市场","允许建子市场","不限制地理区域",
                "可直接浏览（不需要登录即可浏览）","可直接进店购买","自定义类目","使用父市场零售类目",
                "使用父市场批发类目","共享父市场零售","共享父市场批发商品"
            ],
            api: {
                method: '/market/update',
                bizparams: {
                }
            },
        }
      },
      methods: {
          resetForm (formName) {
              this.$refs[formName].resetFields()
              this.form.state = '内测'
              this.bizStatus = '0'
          },
          submit(){
              let formData = Object.assign({},this.form)
              delete formData.aaattribute
              delete formData.state
              delete formData.limit
            console.log(formData)
            let editSegmentsItem = segmentsService.editSegmentsItem(formData)

            editSegmentsItem.then((data) => {
                  console.log('success')
              }, (msg) => {
                  this.$ltsMessage.show({type: 'error', message: msg.error_message})
              })
          },
          // 属性转为二进制
          checkHandle(value){
              let obj = {}
              let init = 4
              let count = 0

              for(let i = 0; i < this.checkbox.length; i++){
                  let val = this.checkbox[i]
                  obj[val] = (init << i)
              }
              for(let j = 0; j < value.length; j++){
                  if(value[j] in obj){
                      count += obj[value[j]]
                  }
              }
              this.form.attribute = count
              console.log(this.form.attribute)
          },
          selectHandle(value) {
              switch (value) {
                  case '内测':
                      this.form.bizStatus = 0
                      break
                  case '已上线':
                      this.form.bizStatus = 1
                      break
                  case '冻结':
                      this.form.bizStatus = 2
                      break
                  case '初始化':
                      this.form.bizStatus = 3
                      break
                  case '待审核':
                      this.form.bizStatus = 9
                      break
                  case '已删除':
                      this.form.bizStatus = -1
                      break
              }
              console.log(this.form.bizStatus)
          }
      },
    created(){
      this.form.id = this.$route.params.id
      console.log(this.form.id)
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
