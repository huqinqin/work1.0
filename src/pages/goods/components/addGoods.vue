<template>
  <div class="addGoods">
      <el-steps :active="stepActive" align-center style="padding-bottom:12px;margin-bottom:12px;">
          <el-step title="步骤1" description="选择并确定类目"></el-step>
          <el-step title="步骤2" description="选择或添加商品模板"></el-step>
          <el-step title="步骤3" description="完善商品信息"></el-step>
      </el-steps>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="ruleForm.goodsName"></el-input>
      </el-form-item>
      <el-form-item >
        <el-table
          :data="spuDO.childSpuDTOList"
          style="width: 100%">
          <el-table-column
            prop="spuName"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sinr"
            label="条码"
            width="180">
          </el-table-column>
          <el-table-column
            label="属性"
            width="180">
            <template slot-scope="scope">
                <span class="spec" v-for="(value,index) in scope.row.spuPropDOList" :key="value.id">{{value.propValue}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="库存">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入库存数量"
                v-model="scope.row.storage"
                clearable>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="销售价">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入价格"
                v-model="scope.row.price"
                clearable>
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item >
        <el-form  label-width="12%" :inline="true" class="propsBox">
            <el-form-item style="width:31%"  v-for="(value,index) in spuDO.spuPropDOList" :key="value.id" :label="value.name" >
                <el-select
                    v-model="value.checkedProp"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择属性值">
                    <el-option
                        v-for="item in value.propValues"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import spuService from '@/services/SpuService.js'
  import goodsService from '@/services/GoodsService.js'
  import ElForm from '../../../../node_modules/element-ui/packages/form/src/form.vue'
  export default {
      components: {ElForm},
      name : 'addGoods',
    data(){
      return{
        stepActive : 3,
        ruleForm: {
          goodsName: '',
        },
        rules: {
          goodsName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        spuDO : {},
        inputValue : "",
      }
    },
    methods:{
      getSpudtoist(){
        spuService.getSpudtoist( this.$route.query.id).then((data) => {
            data.data.spuPropDOList.forEach(function(value,index,array){
              value.inputVisible = false; // 自己加的 是否显示添加input
              value.propValues = value.propValue.split(",");
              value.checkedProp = [];
              value.propValues.forEach(function(prop,key,array){
                let Obj = {
                  isCanEdit : false,
                  isSelected : false,
                  value : prop
                };
                array[key] = Obj;
              });
            });
            data.data.childSpuDTOList.forEach(function (value,index,array) {
              value.storage = "";
              value.price = "";
            })
            this.spuDO = data.data;
        },(msg) => {
            console.log(msg);
        });
      },
      showInput(item) {
        item.inputVisible = true;
      },

      handleInputConfirm(item) {
        let inputValue = this.inputValue;
        if (inputValue) {
          item.propValues.push({
            value : inputValue,
            isCanEdit : true,
            isSelected : false,
          });
        }
        item.inputVisible = false;
        this.inputValue = '';
      },
      deleteTag(proplist,key){
        proplist.splice(key,1);
      },
      submitForm(){debugger;
          let props = [];
          this.spuDO.childSpuDTOList.forEach(function (value,index,array) {
            value.spuPropDOList.forEach(function(val,key,array){
              let objKey = val.name;
              let propValue = {};
              propValue[objKey] = val.propValue
              props.push(
                {
                  "price":value.price * 100,
                  "storage" : value.storage,
                  "priceAction":0,
                  "required":false,
                  "valueType":0,
                  "spuId":val.spuId,
                  "sku" : true,
                  "propValue":JSON.stringify(propValue)
                }
              )
            })
          });
          this.spuDO.spuPropDOList.forEach(function (value,index,array) {
            let propValue = {};
            let objKey = value.name;
            let porpslist = [];
            value.checkedProp.forEach(function(val,key,array){
                propValue[objKey] = val.value
                props.push(
                  {
                    "attribute":0,
                    "multiSelect":false,
                    "required":false,
                    "search":false,
                    "selectable":false,
                    "show":false,
                    "sku":false,
                    "spec":false,
                    "system":false,
                    "valueType":0,
                    "propValue":JSON.stringify(propValue)
                  }
                )
            })
          });
          let wholesale_item = {
              "itemName" : this.ruleForm.goodsName,
              "spuId":this.spuDO.id,
              "sin" : this.spuDO.sin,
              "sinr":this.spuDO.sinr,
              "price":100,
              "storage" : 0,
              "unit":this.spuDO.unit,
              "spec":"无描述",
              "status" : 1,
              "categoryId": this.spuDO.categoryId,
          };
          let params = {
            item_props : JSON.stringify(props),
            wholesale_item : JSON.stringify(wholesale_item),
          };
//          goodsService.addWithProps(params).then((data) => {
//              console.log(data)
//          });
      },
    },
    mounted(){
       this.getSpudtoist();
    },
  }
</script>
<style lang="less" scoped>
  .el-table__header th{
    padding-top: 0px;
  }
  .spec{
    margin-right: 10px;
  }
  .el-tag{
    margin-right: 10px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .propsBox{
      .el-form-item__content{
          width: calc(100% - 12%);
          margin-bottom: 20px;
      }
      .el-select{
          width: 100%;
      }
  }


</style>
