<template>
  <div class="addGoods">
      <el-steps :active="stepActive" align-center style="padding-bottom:12px;margin-bottom:12px;">
          <el-step title="步骤1" description="选择并确定类目"></el-step>
          <el-step title="步骤2" description="选择或添加商品模板"></el-step>
          <el-step title="步骤3" description="完善商品信息"></el-step>
      </el-steps>
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
          <el-collapse-item title="商品信息（不可更改）" name="1">
              <el-form :inline="true"  label-width="100px" class="demo-ruleForm">
                  <el-form-item label="商品类目">
                      <el-input v-model="spuDO.category_name" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="品牌">
                      <el-input v-model="spuDO.brand" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="产地">
                      <el-input v-model="spuDO.orign" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="销售单位">
                      <el-input v-model="spuDO.unit" disabled></el-input>
                  </el-form-item>
              </el-form>
          </el-collapse-item>
          <el-collapse-item title="商品信息（自定义）" name="2">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <div>
                      <el-form-item label="名称" prop="itemName" style="display:inline-block;">
                          <el-input v-model="ruleForm.itemName"></el-input>
                      </el-form-item>
                      <el-form-item label="标签" prop="tag" style="display:inline-block;">
                          <el-input v-model="ruleForm.tag"></el-input>
                      </el-form-item>
                  </div>
                  <div>
                      <el-form-item label="排序" prop="rank" style="display:inline-block;">
                          <el-input v-model="ruleForm.rank"></el-input>
                      </el-form-item>
                      <el-form-item label="状态" prop="status" style="display:inline-block;">
                          <el-select v-model="ruleForm.status" placeholder="请选择商品状态">
                              <el-option label="草稿" value="0"></el-option>
                              <el-option label="上架" value="1"></el-option>
                          </el-select>
                      </el-form-item>
                  </div>
                  <div>
                      <el-form-item label="成本价" prop="costPrice" style="display:inline-block;">
                          <el-input-number v-model="ruleForm.costPrice" placeholder="请输入成本价" :min="0"></el-input-number>
                      </el-form-item>
                      <el-form-item label="销售价" prop="price" style="display:inline-block;">
                          <el-input-number v-model="ruleForm.price" placeholder="请输入销售价" :min="0"></el-input-number>
                      </el-form-item>
                  </div>
                  <div>
                      <el-form-item label="销售标题" prop="promotionTitle">
                          <el-input v-model="ruleForm.promotionTitle" style="width: 904px;"></el-input>
                      </el-form-item>
                  </div>
              </el-form>
              <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="商品主图" prop="goodsName">
                      <el-upload
                          action="/cgi/upload/file/item/image"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-change="handleUrlChange"
                          :on-remove="handleRemove">
                          <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible" size="tiny">
                          <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                  </el-form-item>
              </el-form>
          </el-collapse-item>
          <el-collapse-item title="商品SKU设置" name="3">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item >
                      <el-table
                          :data="spuDO.child_spu_d_t_o_list"
                          style="width: 100%">
                          <el-table-column
                              prop="spu_name"
                              label="SKU名称"
                              width="180">
                          </el-table-column>
                          <el-table-column
                              prop="sinr"
                              label="SKU编码"
                              width="180">
                          </el-table-column>
                          <el-table-column
                              label="SKU属性"
                              width="380">
                              <template slot-scope="scope">
                                <span class="spec" v-for="(value,index) in scope.row.spu_prop_d_o_list" :key="value.id">
                                    <el-tag type="success">{{value.name}}:</el-tag>{{value.prop_value}}
                                </span>
                              </template>
                          </el-table-column>
                          <!--<el-table-column-->
                              <!--label="SKU成本价">-->
                              <!--<template slot-scope="scope">-->
                                  <!--<el-input-->
                                      <!--placeholder="请输入库存数量"-->
                                      <!--v-model="scope.row.storage"-->
                                      <!--clearable>-->
                                  <!--</el-input>-->
                              <!--</template>-->
                          <!--</el-table-column>-->
                          <el-table-column
                              label="SKU销售价">
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
              </el-form>
          </el-collapse-item>
          <el-collapse-item title="商品详情设置" name="4">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <lts-editor ref="Editor"></lts-editor>
              </el-form>
          </el-collapse-item>
      </el-collapse>
      <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
  </div>
</template>
<script>
  import spuService from '@/services/SpuService.js'
  import goodsService from '@/services/GoodsService.js'
  import {ltsEditor} from 'ui'
  import ElForm from '../../../../node_modules/element-ui/packages/form/src/form.vue'
  export default {
      components: {
          ElForm,ltsEditor
      },
      name : 'addGoods',
      data () {
          return {
              dialogImageUrl: '',
              dialogVisible: false,
              activeNames: ['1'],
              stepActive: 3,
              spuDO: {},
              ruleForm: {
                  itemName: '',
                  promotionTitle : "",
                  tag : "",
                  rank : 0,
                  status : "草稿", // 0,删除 -1 失效 1 上架 9 冻结,
                  costPrice: 0,
                  price: 0
              },
              rules: {
                  itemName: [
                      {required: true, message: '请输入商品名称', trigger: 'blur'}
                  ],
                  promotionTitle: [
                      {required: true, message: '请输入销售标题', trigger: 'blur'}
                  ],
                  tag: [
                      {required: true, message: '请输入商品标签', trigger: 'blur'}
                  ],
                  status: [
                      {required: true, message: '请选择商品状态', trigger: 'blur'}
                  ]
              },
              inputValue: '',
              // 上传商品图片列表
              fileList : []
          }
      },
      methods:{
          handleChange(){

          },
          getSpudtoist () {
              spuService.getSpudtoist(this.$route.query.id).then((resp) => {
                  if (resp.data.spu_prop_d_o_list && resp.data.spu_prop_d_o_list.length > 0) {
                      resp.data.spu_prop_d_o_list.forEach(function (value, index, array) {
                          value.inputVisible = false // 自己加的 是否显示添加input
                          value.propValues = value.prop_value.split(',');
                          value.checkedProp = [];
                          value.propValues.forEach(function (prop, key, array) {
                              let Obj = {
                                  isCanEdit: false,
                                  isSelected: false,
                                  value: prop
                              };
                              array[key] = Obj
                          })
                      })
                  }
                  resp.data.child_spu_d_t_o_list.forEach(function (value, index, array) {
                      value.storage = '';
                      value.price = '';
                  });
                  this.spuDO = resp.data
              }, (msg) => {
                  console.log(msg)
              })
          },
          showInput (item) {
              item.inputVisible = true
          },
          handleInputConfirm (item) {
              let inputValue = this.inputValue;
              if (inputValue) {
                  item.propValues.push({
                      value: inputValue,
                      isCanEdit: true,
                      isSelected: false,
                  })
              }
              item.inputVisible = false;
              this.inputValue = '';
          },
          deleteTag (proplist, key) {
              proplist.splice(key, 1)
          },
          submitForm() {
              let descriptionContent = this.$refs.Editor._data.content;
              let imagesUrl = '';
              this.fileList.forEach(function (value, index, array) {
                  imagesUrl = (imagesUrl == "") ? value.response.data.value : imagesUrl + "," + value.response.data.value;
              });
              let wholesale_item = {
                  'itemName': this.ruleForm.itemName,
                  'promotionTitle': this.ruleForm.promotionTitle,
                  'rank': this.ruleForm.rank,
                  'tag': this.ruleForm.tag,
                  'status': this.ruleForm.status,
                  'costPrice': this.ruleForm.costPrice,
                  'price': this.ruleForm.price,
                  'spuId': this.spuDO.id,
                  'sin': this.spuDO.sin,
                  'sinr': this.spuDO.sinr,
                  'price': 100,
                  'storage': 0,
                  'unit': this.spuDO.unit,
                  'spec': '无描述',
                  'categoryId': this.spuDO.category_id,
                  'urls': imagesUrl,
                  'description': descriptionContent,
                  'orign': this.spuDO.orign,
                  'brand': this.spuDO.brand,
                  'categoryName': this.spuDO.category_name
              };
              let props = [];
              this.spuDO.child_spu_d_t_o_list.forEach(function (value, index, array) {
                  let propValue = {};
                  let spu_id = 0;
                  value.spu_prop_d_o_list.forEach(function (val, key, array) {
                      let objKey = val.name;
                      propValue[objKey] = val.prop_value;
                      spu_id = val.spu_id;
                      props.push(
                          {
                              'price': value.price * 100,
                              'storage': value.storage,
                              'priceAction': 1,
                              'required': false,
                              'valueType': 0,
                              'spuId': val.spuId,
                              'sku': true,
                              'spu_id': val.spu_id,
                              'propValue': JSON.stringify(propValue)
                          }
                      )
                  })

              });
              this.spuDO.spu_prop_d_o_list.forEach(function (value, index, array) {
                  let propValue = {};
                  let objKey = value.name;
                  let porpslist = [];
                  value.checkedProp.forEach(function (val, key, array) {
                      propValue[objKey] = val.value;
                      props.push(
                          {
                              'attribute': 0,
                              'multiSelect': false,
                              'required': false,
                              'search': false,
                              'selectable': false,
                              'show': false,
                              'sku': false,
                              'spec': false,
                              'system': false,
                              'valueType': 0,
                              'propValue': JSON.stringify(propValue)
                          }
                      )
                  })
              });
              let params = {
                  item_props: JSON.stringify(props),
                  wholesale_item: JSON.stringify(wholesale_item),
              };
              goodsService.addWithProps(params).then((data) => {
                  this.$ltsMessage.show({type: 'success', message: '新增成功'})
              }, (msg) => {
                  this.$ltsMessage.show({type: 'error', message: msg.error_message})
              });
          },
          handleRemove(file, fileList) {
              console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
              this.dialogImageUrl = file.url;
              this.dialogVisible = true;
          },
          handleUrlChange(file, fileList){
              this.fileList = fileList;
          }
      },
      mounted () {
          this.getSpudtoist()
      }
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
  .demo-ruleForm .el-input,.demo-ruleForm .el-select{
      width: 400px;
  }
</style>
