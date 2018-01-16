<template>
  <div class="tree">
      <el-row>
          <el-col :span="20">
              <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="addCategory" @click="appendCategory">添加一级类目</el-button>
          </el-col>
      </el-row>
      <div class="tree-box">
          <el-tree
              :data="category"
              :props="defaultProps"
              accordion
              node-key="id"
              default-expand-all
              :render-content="renderContent"
              :filter-node-method="filterNode"
              @node-click="treeNodeClick"
              ref="categroyTree"
              >
          </el-tree>
          <div v-if="checkedCategory.name" class="card-box">
              <el-card class="box-card" style="margin-top:20px" v-if="checkedCategory.node.isLeaf">
                  <div slot="header" class="clearfix">
                      <span><el-tag type="success" style="margin-right: 10px">{{checkedCategory.name}}</el-tag>属性设置</span>
                      <div style="float: right">
                          <el-popover
                              ref="popover2"
                              placement="left"
                              title="添加属性"
                              width="300"
                              trigger="click"
                              v-model="showAttrPopver"
                          >
                              <el-form :inline="true" class="demo-form-inline">
                                  <el-form-item label="">
                                      <el-input v-model="specName" placeholder="产品规格名称"></el-input>
                                  </el-form-item>
                                  <el-form-item>
                                      <el-button type="primary" @click="addAttr">确定</el-button>
                                  </el-form-item>
                              </el-form>
                          </el-popover>
                          <el-button type="primary" style="margin-top: -12px;" class="addSpec" v-popover:popover2>添加属性</el-button>
                      </div>
                  </div>
                  <div class="specbox">
                      <div class="specitem">
                          <el-form label-width="130px" v-for="(value,index) in spuAttrList" :label="value.name" :key="value.name">
                              <el-form-item :label="value.name">
                                  <el-checkbox label="可搜索" v-model="value.search"></el-checkbox>
                                  <el-checkbox label="可展示" v-model="value.show"></el-checkbox>
                                  <el-checkbox label="SKU参考" v-model="value.sku"></el-checkbox>
                                  <label class="el-upload-list__item-status-label" v-if="value.isSelect"><i class="el-icon-upload-success el-icon-check"></i></label>
                                  <label class="el-upload-list__item-status-label removeprop" @click="removeProp(spuAttrList,index)" v-if="value.isDelete"><i class="el-icon-close"  ></i></label>
                              </el-form-item>
                              <el-form-item>
                                  <el-tag v-for="(val,key) in value.propValues" :key="val.value" :closable="val.isCanEdit"  @close="deleteTag(value.propValues,key)">
                                      <el-checkbox name="type" @change="chcekedProp(value,val)" v-model="val.isSelected">{{val.value}}</el-checkbox>
                                  </el-tag>
                                  <el-input
                                      class="input-new-tag"
                                      v-if="value.inputVisible"
                                      v-model="inputValue"
                                      size="small"
                                      @blur="handleInputConfirm(value,value.propValues)"
                                  >
                                  </el-input>
                                  <el-button  class="button-new-tag" v-else size="small" @click="showInput(value,'attr')">+ 添加</el-button>
                              </el-form-item>
                          </el-form>

                      </div>
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addCategorySpec">确 定</el-button>
                      </span>
                  </div>
              </el-card>
              <div v-else>
                  <el-alert
                      title="叶子节点才可以添加类目"
                      type="error">
                  </el-alert>
              </div>
          </div>
        </div>
        <el-dialog title="修改类目名称" :visible.sync="isShowUpdateCategory">
          <el-input v-model="categoryName"></el-input>
          <div slot="footer" class="dialog-footer">
              <el-button @click="isShowUpdateCategory = false;CategoryName=''">取 消</el-button>
              <el-button type="primary" @click="updateCategoryName">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加类目" :visible.sync="showCategoryDialog">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="categoryName" placeholder="类目名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addCategory">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/jsx">
  import categoryService from '@/services/CategoryService.js'
  let id = 1000;
  export default {
      components: {},
      data() {
          return {
            filterText : "",
            category: [],
            defaultProps: {
              children: 'children',
              label: 'name',
              isLeaf : (data, node) =>{
                  this.$set(data,'node',node);
              },
            },
            editSpec : {},
            //类目
            showCategoryDialog : false,
            categoryName:"",
            isShowUpdateCategory:false,
            editCategory : {},
            checkedCategory : {},
            // 属性
            spuAttrList : [],
            showPreview : true,
            showAttrPopver : false,
            specName : "",
            inputValue : "",
          }
      },

      methods: {
          // 属性
          addAttr(){
            this.spuAttrList.push(
              {
                "inputVisible":false, // 自己加的
                "isDelete" : true,// 自己加的
                "isSelect" : true,// 自己加的
                "sku" : false,// 自己加的
                "show" : false,// 自己加的
                "search" : false,// 自己加的
                "name":this.specName,
                "propValue":"",
                "propValues":[],
              }
            )
            this.specName = "";
            this.showPopver = false;
          },
          addCategoryProps(){

          },
          addCategory(){
              if(!this.categoryName){
                  this.$ltsMessage.show({type:"error",message: "类目名称为空"});
                  return false;
              }
              let parentId = this.editCategory && this.editCategory.id ? this.editCategory.id : 0;
              categoryService.addCategory(this.categoryName,parentId).then((data)=>{
                  this.showCategoryDialog = false;
                  this.getAllCategoryList();
              });
          },
          // 获取类目列表
          getAllCategoryList(){
              let  category = categoryService.getAllCategoryList();
              category.then((data)=>{
                  this.category = data.data
              });
          },

          // 删除一条类目
          remove(event,node, data) {
            event.stopPropagation();
            // const parent = node.parent;
            // const second_category = parent.data.second_category || parent.data;
            // const index = second_category.findIndex(d => d.id === data.id);
            // second_category.splice(index, 1);

            this.$ltsMessageBox.show(this,{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
                action:'你确定要删除这一条吗',
                title:'提示',
                successMessage:'删除成功',
                cancelMessage:'取消删除'});
            this.$on('confirm',function () {
                categoryService.removeCategoryItem()
            })

          },

          deleteTag(proplist,key){
            proplist.splice(key,1);
          },
          removeProp(list,index){
            list.splice(index,1);
            this.getSkuPropsList();
          },
          showInput(item) {
            item.inputVisible = true;
            const refObject = item.id;
            // TOOD 动态refs 抱了一个错 缓过来在研究
            // console.log(this.$refs.saveTagInput);
            // this.$nextTick(_ => {
            //   this.$refs.saveTagInput.$refs.input.focus();
            // });
          },
          handleInputConfirm(value,val) {
            let inputValue = this.inputValue;
            if(!value.propValue){
                value.propValue = inputValue;
            }else{
                value.propValue = value.propValue + "," + inputValue;
            }

            if (inputValue) {
              val.push(
                {
                  value : inputValue,
                  isCanEdit : true,
                  isSelected : true,
                }
              );
            }
            value.inputVisible = false;
            this.inputValue = '';
            console.log(value);
          },

          filterNode(value, data){
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
          },
          appendCategory(event,data) {
             event.stopPropagation();
             this.showCategoryDialog = true;
             this.editCategory = data ? data : {};
          },

          addCategorySpec(){
            let self = this, params = [];
            this.spuAttrList.forEach(function(value,index,array){
                value.propValue = "";
                if(value && value.propValues){
                    value.propValues.forEach(function(prop,key){
                        if(key == 0){
                            value.propValue = prop.value
                        }else{
                            value.propValue = value.propValue + ',' + prop.value
                        }
                    });
                }
                params.push({
                    name : value.name,
                    values : value.propValue,
                    type : 0,
                    sku : value.sku,
                    show : value.show,
                    search : value.search
                })
            });
            categoryService.addCategoryProps(this.editCategory.id, params).then((data)=>{
                this.getAllCategoryList();
                this.centerDialogVisible = false;
            })
          },

          treeNodeClick(data){
            console.log(data);
            this.editCategory = data;
            this.checkedCategory = data;
            categoryService.getCategoryProps(this.editCategory.id).then((data)=>{
                data.datalist.forEach(function(value,index,array){
                    value.propValues.forEach(function(prop,key,array){
                        let Obj = {
                            isCanEdit : true,
                            isSelected : true,
                            value : prop
                        };
                        array[key] = Obj;
                    })
                })
                this.spuAttrList = data.datalist;
            });
          },

          showUpdate(event,category){
             event.stopPropagation();
             this.isShowUpdateCategory = true;
             this.editCategory = category;
             this.categoryName = category.name;
          },

          updateCategoryName(){
              categoryService.updateCategory(this.editCategory.id,this.categoryName);
          },

          renderContent(h, { node, data, store }) {
            return (
              <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                <span>{node.label}</span>
              </span>
              <span>
              <el-button style="font-size: 12px;" type="text"  disabled={data.show_child}  on-click={ ($event) => this.appendCategory($event,data) }>新增子类目</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ ($event) => this.showUpdate($event,data) }>修改名称</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ ($event) => this.remove($event,node, data) }>删除</el-button>
              </span>
              </span>
            );
          },
      },
      mounted(){
         this.getAllCategoryList()
      },
      watch: {
          filterText(val) {
            this.$refs.categroyTree.filter(val);
          }
      },
  };
</script>
<style lang="less">
  .el-tree{
      margin-top: 20px;
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
  .addCategory{
      margin: 0 30px;
      display: block;
  }
  .specitem .el-form{
    background-color: rgba(249,252,255,1);

    border-radius: 6px;
    margin-bottom: 10px;
    padding: 10px 0px;
    transition: all ease .2s;
    overflow: hidden;
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
  .tree-box{
      display: flex;
      .el-tree{
          flex:1;
      }
      .card-box{
          width: 70%;
      }
      .el-alert{
          margin-top: 26px;
      }
  }
</style>
