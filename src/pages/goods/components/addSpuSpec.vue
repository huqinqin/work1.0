<!--suppress ALL -->
<template>
  <div class="addSpuSpec">
    <el-steps :active="stepActive" align-center style="padding-bottom:12px;margin-bottom:12px;">
      <el-step title="步骤1" description="选择并确定类目"></el-step>
      <el-step title="步骤2.1" description="完善产品基本信息"></el-step>
      <el-step title="步骤2.2" description="完善产品规格"></el-step>
      <el-step title="步骤3" description="完善商品信息"></el-step>
    </el-steps>
    <div class="addspu">
      <h1 style="margin-top:0">完善产品信息</h1>
      <el-form label-width="130px" class="spu-form">
        <el-form-item label="选择产品规格类型" prop="name">
          <el-radio-group v-model="settingSwitch" size="small">
            <el-radio-button label="info">标准规格</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <transition name="slide-fade" >
        <div class="spuSpecBox">
            <el-card class="box-card" v-show="settingSwitch == 'info'">
              <div slot="header" class="clearfix">
                <span>产品规格设置</span>
                <div style="float: right;padding: 0 5px;color: #409EFF;">
                  <el-popover
                    ref="popover4"
                    placement="left"
                    trigger="click"
                    >
                    <div class="shuffParentBox" v-if="postSelectedSpecList.length > 0" >
                      <transition name="slide-fade">
                        <div v-if="showPreview" class="preview">
                          <div v-for="(item,index) in postSelectedSpecList" :key="index" class="shuffBox">
                              <transition-group name="cell" tag="div">
                                <div :key="index"  class="container">
                                  <div v-for="value in item.propsList" :key="item.values"  class="cell">
                                    <div class="specValue">{{ value.propValue }} </div>
                                  </div>
                                  <div class="specInput">
                                    <el-input
                                      size="mini"
                                      placeholder="请输入条码"
                                      v-model="item.sinr">
                                    </el-input>
                                  </div>
                                </div>
                              </transition-group>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </el-popover>
                  <el-button type="text" id="popoverClick" v-popover:popover4>规格预览</el-button>
                </div>
              </div>
              <div class="specbox">
                <div class="specitem">
                  <el-form label-width="130px" v-for="(value,index) in spuSpecList" :label="value.name" :key="value.name">
                    <el-form-item :label="value.name">
                      <el-checkbox label="可搜索" v-model="value.isSearch"></el-checkbox>
                      <el-checkbox label="可展示" v-model="value.isShow"></el-checkbox>
                      <el-checkbox label="SKU参考"disabled checked></el-checkbox>
                      <label class="el-upload-list__item-status-label" v-if="value.isSelect"><i class="el-icon-upload-success el-icon-check"></i></label>
                      <label class="el-upload-list__item-status-label removeprop" @click="removeProp(spuSpecList,index)" v-if="value.isDelete"><i class="el-icon-close"  ></i></label>
                    </el-form-item>
                    <el-form-item>
                      <el-tag v-for="(val,key) in value.prop_values" :key="val.value" :closable="val.isCanEdit"  @close="deleteTag(value.prop_values,key)">
                        <el-checkbox name="type" @change="chcekedProp(value,val)" v-model="val.isSelected">{{val.value}}</el-checkbox>
                      </el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="value.inputVisible"
                        v-model="inputValue"
                        size="small"
                        @blur="handleInputConfirm(value,value.prop_values,'spec')"
                      >
                      </el-input>
                      <el-button  class="button-new-tag" v-else size="small" @click="showInput(value,'spec')">+ 添加</el-button>
                    </el-form-item>
                  </el-form>
                  <el-popover
                    ref="popover1"
                    placement="right"
                    title="自定义规格"
                    width="300"
                    trigger="click"
                    v-model="showSpecPopver"
                  >
                    <el-form :inline="true" class="demo-form-inline">
                      <el-form-item label="">
                        <el-input v-model="specName" placeholder="产品规格名称"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="addSpec">确定</el-button>
                      </el-form-item>
                    </el-form>
                  </el-popover>
                  <el-button type="primary" class="addSpec" v-popover:popover1>自定义规格</el-button>
                </div>
              </div>
            </el-card>
            <el-card class="box-card" v-show="settingSwitch == 'info'" style="margin-top: 20px">
                <div slot="header" class="clearfix">
                    <span>其他属性设置</span>
                </div>
                <div class="specbox">
                    <el-form  label-width="23%" :inline="true" class="propsBox">
                        <el-form-item  style="width:50%"  v-for="(value,index) in otherSpecList" :key="value.id" :label="value.name" >
                            <el-select
                                v-model="value.checkedProp"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择属性值">
                                <el-option
                                    v-for="item in value.prop_values"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
      </transition>
      <el-button type="primary" @click="addSpu()" class="addSpu">添加产品</el-button>
    </div>
  </div>
</template>
<!--suppress ES6ShorthandObjectProperty -->
<script>
  import spuService from '@/services/SpuService'
  import categoryService from '@/services/CategoryService'
  export default {
    name : 'addSpuSpec',
      data(){
          return {
              stepActive: 3,
              settingSwitch: 'info', // spec
              inputValue: '',
              specName: '',
              showSpecPopver: false,
              showAttrPopver: false,
              spuAttrList: [],
              saleSpec: '',
              spuSpecList: [],
              otherSpecList : [],
              selectedSpecList: [],
              postSelectedSpecList: [],
              showPreview: true,
          }
      },
      mounted() {
          categoryService.getCategoryProps(this.$route.params.spuInfo.categoryId,true).then((resp) => {
              if(resp.data.sku_props.length > 0){
                  resp.data.sku_props.forEach(function (value, index, array) {
                      value.inputVisible = false // 自己加的 是否显示添加input
                      value.isDelete = false //自己加的 单条是否可删除
                      value.isSelect = false //自己加的 单条是否被选中
                      value.isSearch = false //自己加的 可搜索
                      value.isShow = false //自己加的 可展示
                      value.prop_values.forEach(function (prop, key, array) {
                          let Obj = {
                              isCanEdit: false,
                              isSelected: false,
                              value: prop
                          }
                          array[key] = Obj
                      })
                  })
              }
              this.spuSpecList = resp.data.sku_props
              if(resp.data.other_props.length > 0){
                  resp.data.other_props.forEach(function (value, index, array) {
                      value.checkedProp = [];
                      value.prop_values.forEach(function (spec, key, array) {
                          let Obj = {
                              value:spec,
                              label: spec,
                          }
                          array[key] = Obj
                      })
                  })
              }
              this.otherSpecList = resp.data.other_props;

          })
      },
      methods:{
          switchHandChange (val) {
              this.settingSwitch = 'info'
          },
          handleClose: function (tag) {
              this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
          },

          showInput: function (item) {
              item.inputVisible = true
              const refObject = item.id
              // TOOD 动态refs 抱了一个错 缓过来在研究
//        console.log(this.$refs.saveTagInput);
//        this.$nextTick(_ => {
//          this.$refs.saveTagInput.$refs.input.focus();
//        });
          },

          chcekedProp(item, itemprop) {
              let count = 0
              let selectProps = []
              let subSelectProps = []
              item.prop_values.forEach(function (value, index) {
                  if (value.isSelected) {
                      count++
                      selectProps.push(value)
                  }
              })
              if (count > 0) {
                  item.isSelect = true
              } else {
                  item.isSelect = false
              }
              let selectedNum = 0
              this.spuSpecList.forEach(function (value, index) {
                  if (value.isSelect) {
                      selectedNum++
                  }
              })
              if (selectedNum > 2) {
                  this.$ltsMessage.show({type: 'error', message: '最多只能选择2条影响SKU的属性'})
                  itemprop.isSelected = false
                  item.isSelect = false
                  return false
              }
              let cloneItem = Object.assign({}, item)
              cloneItem.propValues = selectProps
              if (this.selectedSpecList.length === 0) {
                  this.selectedSpecList.push(cloneItem)
              } else {
                  let selectCount = 0
                  this.selectedSpecList.forEach(function (value, index, array) {
                      if (value.name === cloneItem.name) {
                          if (cloneItem.isSelect) {
                              array[index] = cloneItem
                          } else {
                              array.splice(index, 1)
                          }
                          selectCount++
                      }
                  })
                  if (selectCount === 0) {
                      this.selectedSpecList.push(cloneItem)
                  }
              }
              if (this.selectedSpecList.length > 0) {
                  document.querySelector('#popoverClick').click()
              }
              if (this.selectedSpecList.length > 0) {
                  this.getSkuPropsList()
              }
          },
          getSkuPropsList(){
              this.postSelectedSpecList = []
              let self = this
              var discards = []
              for (var i = 0; i < this.selectedSpecList.length; i++) {
                  this.postSelectedSpecList = []
                  if (discards.length === 0) {
                      for (let prop of this.selectedSpecList[i].propValues) {
                          discards.push(this.makeSpecList(this.selectedSpecList[i], prop))
                      }
                      this.postSelectedSpecList = discards
                  } else {
                      let cloneDiscards = JSON.parse(JSON.stringify(discards)) // 深度clone
                      for (var j = 0; j < this.selectedSpecList[i].propValues.length; j++) {
                          var prop = this.selectedSpecList[i].propValues[j]
                          var newcloneDiscards = JSON.parse(JSON.stringify(cloneDiscards)) // 深度clone
                          for (var r = 0; r < newcloneDiscards.length; r++) {
                              newcloneDiscards[r].propsList.push(this.makeProp(this.selectedSpecList[i], prop))
                              this.postSelectedSpecList.push(newcloneDiscards[r])
                          }
                      }
                      discards = this.postSelectedSpecList
                  }
              }
          },
          makeProp(spuSpec, prop) {
              return {
                  'show': spuSpec.isShow,
                  'search': spuSpec.isSearch,
                  'sku': true,
                  'name': spuSpec.name,
                  'type': 0,
                  'propValue': prop.value,
              }
          },
          makeSpecList(spuSpec, prop) {
              return {
                  propsList: [
                      this.makeProp(spuSpec, prop)
                  ],
                  sinr: '',
              }
          },
          handleInputConfirm(value, val, type) {
              let inputValue = this.inputValue
              if (inputValue) {
                  val.push(
                      {
                          value: inputValue,
                          isCanEdit: true,
                          isSelected: type === 'spec' ? false : true,
                      }
                  )
              }
              value.inputVisible = false
              this.inputValue = ''
          },
          deleteTag(proplist, key) {
              proplist.splice(key, 1)
          },
          removeProp(list, index) {
              list.splice(index, 1)
              this.getSkuPropsList()
          },
          addSpec() {
              this.spuSpecList.push(
                  {
                      'inputVisible': false, // 自己加的
                      'isDelete': true,// 自己加的
                      'isSelect': false,// 自己加的
                      'name': this.specName,
                      'propValue': '',
                      'prop_values': [],
                  }
              )
              console.log(this.spuSpecList);
              this.specName = ''
              this.showSpecPopver = false
              this.showAttrPopver = false
          },
          addAttr() {
              this.spuAttrList.push(
                  {
                      'inputVisible': false, // 自己加的
                      'isDelete': true,// 自己加的
                      'isSelect': false,// 自己加的
                      'name': this.specName,
                      'propValue': '',
                      'prop_values': [],
                  }
              )
              this.specName = ''
              this.showPopver = false
          },
          switchOperation () {
              this.showPreview = !this.showPreview
          },
          addSpu () {
              let props = [];
              this.otherSpecList.forEach(function(value,index,array){
                  let Obj = {};
                  if(value.checkedProp.length > 0){
                      Obj = Object.assign({},Object,value);
                      Obj.propValue =  value.checkedProp.join(",");
                      Obj.valueType =  value.value_type;
                      Obj.multiSelect =  value.multi_select;
                      props.push(Obj);
                  }
              })
              console.log(props);
              let params = {
                  spu_request: this.$route.params.spuInfo,
                  spec: this.$route.params.spuInfo.saleSpec,
                  child_spu_request_list: this.postSelectedSpecList,
                  props : props,
              }
              spuService.addSpu(params).then((data) => {
                  if (data.success) {
                      location.href = '/goods#/addGoods?id=' + data.data
                  }
              })
          },
    },
  }
</script>
<style lang="less">
    .shuffBox{
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .container{
            min-width: 200px;
            display: flex;
        }
        .specInput{
            width:150px;
            padding: 0 10px;
        }
        .cell {
            display: inline-block;
            margin-right: -1px;
            margin-bottom: -1px;
            font-size: 13px;
            .specValue{
                width:100px;
                height:35px;
                line-height: 35px;
            }

        }
        .cell-move {
            transition: transform 1s;
        }
    }
    .spuSpecBox{
        position: relative;
        z-index: 1111;
    }
    .shuffBox:last-child{
    }
    .addSpuSpec{

        .shuffParentBox {
            .preview{
                border:solid 1px #409EFF;
            }
        }
        .slide-fade-enter-active {
            transition: all .3s ease;
        }
        .slide-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-fade-enter, .slide-fade-leave-to
            /* .slide-fade-leave-active for below version 2.1.8 */ {
            transform: translateX(10px);
            opacity: 0;
        }
        .cart-box{
            position: relative;
        }
        .cartbottom{
            position: absolute;
            right:3px;
            bottom:0;
            color: #000;
            .el-tag{
                color: #333;
            }
            .num{
                color: #409EFF;
            }
        }
        .specbox .el-tag{
            margin-top: 4px;
        }

        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
        }
        .addSpec{
            margin-left: 80px;
        }
        .specitem .el-form{
            background-color: rgba(249,252,255,1);

            border-radius: 6px;
            margin-bottom: 10px;
            padding: 10px 0px;
            transition: all ease .2s;
            overflow: hidden;
        }
        .el-upload-list__item-status-label {
            position: absolute;
            left: -186px;
            top: -17px;
            width: 146px;
            height: 46px;
            background: #13ce66;
            text-align: center;
            transform: rotate(-45deg);
            box-shadow: 0 1px 1px #ccc;
            display: block;
        }
        .el-upload-list__item-status-label i{
            font-size: 24px;
            margin-top: 16px;
            transform: rotate(44deg);
            color: #fff;
            font-weight: bold;

        }
        .removeprop{
            background-color: #ff4040;
            display: none;
            .el-icon-close {
                display: inline-block;
                position: absolute;
                top: 0px;
                left: 60px;
                cursor: pointer;
                opacity: 0.75;
                color: white
            }
        }
        .el-form:hover{
            .removeprop{
                display: block !important;
            }
            .el-upload-list__item-status-label{
                display: none;
            }
        }
        .propsBox{
            .el-form-item{
                margin-right: 0px;
            }
            .el-form-item__content{
                width: 77%;
                .el-select{
                    width:100%;
                }
            }
        }
        .addSpu{
            margin-top: 20px;
            text-align: center;
        }
    }

</style>
