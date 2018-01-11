<template>
  <div class="addGoods">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="this.spuDO.item_name"></el-input>
      </el-form-item>
      <el-form-item label="库存" >
        <el-table
          :data="itemPropDTO.skuItemPropList"
          style="width: 100%">
          <el-table-column
            prop="sin"
            label="条码"
            width="180">
          </el-table-column>
          <el-table-column
            label="属性"
            width="180">
            <template slot-scope="scope">
              <span class="spec" v-for="(value,key) in scope.row.propValue" :key="value.id">{{value}}</span>
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
      <el-form-item label="属性" >
        <el-table
          :data="itemPropDTO.itemPropMapList"
          style="width: 100%">
          <el-table-column
            prop="propName"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            label="属性">
            <template slot-scope="scope">
              <el-tag  v-for="(value,index) in scope.row.propValues" :key="value.value" :closable="value.isCanEdit" v-if="value.value != ''"  @close="deleteTag(scope.row.propValues,index)">
                <el-checkbox name="type"  v-model="value.isSelect">{{value.value}}</el-checkbox>
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="inputValue"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ 添加</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  export default {
    name : 'editGoods',
    data(){
      return{
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
        itemPropDTO : {},
        inputValue : "",
      }
    },
    methods:{
      getWithProps(){
        let itemId = this.$route.params.id;
        goodsService.getWithProps(itemId).then((data)=>{
          data.data.itemPropDTO.skuItemPropList.forEach(function(value,index,array){
            value.price = value.price / 100;
            value.propValue = JSON.parse(value.propValue);
          })
          data.data.itemPropDTO.itemPropMapList.forEach(function(value,index,array){
            value.propValues = [];
            value.inputVisible = "";
            value.propList.forEach(function(val,key,array){
              val.propValue = JSON.parse(val.propValue);
              for(let prop in val.propValue){
                value.propValues.push({
                   value : val.propValue[prop],
                   isCanEdit : true,
                   isSelect : true,
                   spuId : val.spuId,
                   id : val.id,
                   itemId : '',
                })
              }
            })
          });
          this.spuDO = data.data;
          this.itemPropDTO = data.data.itemPropDTO;
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
            isSelect : true,
            itemId : this.spuDO.id,
            skuId : '',
            id : '',
          });
        }
        console.log(item);
        item.inputVisible = false;
        this.inputValue = '';
      },
      deleteTag(proplist,key){
        proplist.splice(key,1);
      },
      submitForm(){
        let props = [];
        this.itemPropDTO.skuItemPropList.forEach(function (value,index,array) {
            props.push(
              {
                "price":value.price * 100,
                "storage" : value.storage,
                "id" : value.id,
                "sku" : true,
              }
            )
        });
        this.itemPropDTO.itemPropMapList.forEach(function (value,index,array) {
          let propValue = {};
          let objKey = value.propName;
          let porpslist = [];
          value.propValues.forEach(function(val,key,array){
            if(val.isSelect){
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
                  "spuId" : val.spuId,
                  "itemId" : val.itemId,
                  "id" : val.id,
                  "propValue":JSON.stringify(propValue)
                }
              )
            }
          })
        });
        let wholesale_item = {
          "itemName" : this.spuDO.item_name,
          "id": this.spuDO.id,
          "spuId":this.spuDO.spuId,
          "sin" : this.spuDO.sin,
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
        goodsService.modifyWithProps(params).then((data)=>[

        ]);
      },
    },
    mounted(){
      this.getWithProps();
    },
    computed: {
      filteredPropValue(){
        console.log(this.propValue);
      },
    },
  }
</script>
<style lang="less">
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
</style>
