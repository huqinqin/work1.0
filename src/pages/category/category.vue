<template>
  <div>
      <el-row>
          <el-col :span="20">
              <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-popover
              ref="popover2"
              placement="right"
              width="300"
              trigger="click"
              v-model="showCategoryPopver"
            >
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="">
                  <el-input v-model="categoryName" placeholder="类目名称"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="addCategory">确定</el-button>
              </el-form-item>
            </el-form>
        </el-popover>
            <el-button type="primary" class="addSpec" v-popover:popover2>添加一级类目</el-button>
          </el-col>
      </el-row>
      <el-tree
          :data="category"
          :props="defaultProps"
          accordion
          node-key="id"
          default-expand-all
          :render-content="renderContent"
          :filter-node-method="filterNode"
          ref="categroyTree"
          >
      </el-tree>
      <el-dialog
      :visible.sync="centerDialogVisible"
      :fullscreen="dialogFullScreen"
      width="100%"
      >
      <el-card class="box-card" style="margin-top:20px">
        <div slot="header" class="clearfix">
          <span>类目属性设置</span>
        </div>
        <div class="specbox">
          <div class="specitem">
            <el-form label-width="130px" v-for="(value,index) in spuAttrList" :label="value.name" :key="value.name">
              <el-form-item :label="value.name">
                <el-checkbox label="可搜索"></el-checkbox>
                <el-checkbox label="可展示"></el-checkbox>
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
                  @blur="handleInputConfirm(value,value.propValues,'attr')"
                >
                </el-input>
                <el-button  class="button-new-tag" v-else size="small" @click="showInput(value,'attr')">+ 添加</el-button>
              </el-form-item>
            </el-form>
            <el-popover
              ref="popover2"
              placement="right"
              title="自定义属性"
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
            <el-button type="primary" class="addSpec" v-popover:popover2>自定义属性</el-button>
          </div>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    </div>
</template>
<script type="text/jsx">
  import ElColorAlphaSlider from "element-ui/packages/color-picker/src/components/alpha-slider";

  let id = 1000;
  export default {
      components: {ElColorAlphaSlider},
      data() {
      return {
        filterText : "",
        category: [{
          "name":"厂家直销",
          "id":"1840842222",
          "second_category":[
            {
              "aggregate_objs":"182039",
              "id":"9484005",
              "item_count":0,
              "name":"冰冻榴莲",
              "owner_type":1,
              "owner_uid":138890,
              "second_category":[
                {
                  "id":"9494701",
                  "name":"速冻食品",
                  "owner_type":101,
                  "owner_uid":163464,
                  "notAdd" : true
                },
                {
                  "id":"9494702",
                  "name":"海鲜水产",
                  "owner_type":101,
                  "owner_uid":163464,
                  "notAdd" : true
                },
                {
                  "id":"9494703",
                  "name":"速冻饮品",
                  "owner_type":101,
                  "owner_uid":163464,
                  "notAdd" : true,
                }
              ],
              "show_child":false,
              "type":"分销类目"
            },
            {
              "aggregate_objs":"182388",
              "id":"9484025",
              "item_count":0,
              "name":"百年老店",
              "owner_type":1,
              "owner_uid":138890,
              "second_category":[

              ],
              "show_child":false,
              "type":"分销类目"
            },
            {
              "aggregate_objs":"182280",
              "id":"9494589",
              "item_count":0,
              "name":"大希地",
              "owner_type":1,
              "owner_uid":138890,
              "second_category":[

              ],
              "show_child":false,
              "type":"分销类目"
            },
            {
              "aggregate_objs":"183988",
              "id":"9495633",
              "item_count":0,
              "name":"世界到家",
              "owner_type":1,
              "owner_uid":138890,
              "second_category":[

              ],
              "show_child":false,
              "type":"分销类目"
            }
          ],
          "show_child":false,
          "type":"厂家直销"
        },
        {
          "id":"9494699",
          "item_count":0,
          "name":"生鲜速冻",
          "owner_type":101,
          "owner_uid":163464,
          "second_category":[
            {
              "name":"全部",
              "id":"9494699",
              "second_category":[

              ],
              "show_child":false,
              "type":"默认排序"
            },
            {
              "id":"9494700",
              "name":"猪牛羊肉",
              "owner_type":101,
              "owner_uid":163464
            }
          ],
          "show_child":false,
          "type":"标准类目"
        }],
        defaultProps: {
          children: 'second_category',
          label: 'name',
        },
        editSpec : {},
        centerDialogVisible : false,
        dialogFullScreen : true,
        //类目
        showCategoryPopver : false,
        categoryName:"",
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
            "isSelect" : false,// 自己加的
            "name":this.specName,
            "propValue":"",
            "propValues":[

            ],
          }
        )
        this.specName = "";
        this.showPopver = false;
      },
      addCategory(){
          if(!this.categoryName){
              this.$ltsMessage.show({type:"error",message: "类目名称为空"});
              return false;
          }

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
//        console.log(this.$refs.saveTagInput);
//        this.$nextTick(_ => {
//          this.$refs.saveTagInput.$refs.input.focus();
//        });
      },
      handleInputConfirm(value,val,type) {
        let inputValue = this.inputValue;
        if (inputValue) {
          val.push(
            {
              value : inputValue,
              isCanEdit : true,
              isSelected : type == 'spec' ? false : true,
            }
          );
        }
        value.inputVisible = false;
        this.inputValue = '';
      },

      filterNode(value, data){
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      append(data) {
        console.log(data);
        const newChild = { id: id++, name: 'testtest', second_category: [] };
        if (!data.second_category) {
          this.$set(data, 'second_category', []);
        }
        data.second_category.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const second_category = parent.data.second_category || parent.data;
        const index = second_category.findIndex(d => d.id === data.id);
        second_category.splice(index, 1);
      },

      cateSpec(data){
        this.centerDialogVisible = true;
      },

      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
            <span>{node.label}</span>
          </span>
          <span>
          <el-button style="font-size: 12px;" type="text" disabled={data.notAdd}  on-click={ () => this.append(data) }>新增子节点</el-button>
          <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>修改名称</el-button>
          <el-button style="font-size: 12px;" type="text" on-click={ () => this.cateSpec(data) }>属性</el-button>
          <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
          </span>
        );
      }
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
</style>
