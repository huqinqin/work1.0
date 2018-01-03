import {request} from 'ltsutil'
export default{
    /**
     * return LONG 类目id
     * params {name : ''} 类目名称
     * params {type : ''} 类目类型 1 一级类目 2 二级类目 3 三级类目
     * @auth taohua
     * @remark 新增类目
     */
    addCategory(categoryName,parentId){
       let params = {
           name : categoryName,
           parentId : parentId,
       };
       return request.api('/category/add',{category:JSON.stringify(params)});
    },
    /**
     * return datalist 类目列表
     * params //TOOD 未知
     * @auth taohua
     * @remarkl 获取所有的类目列表
     */
    getAllCategoryList(){
        let params = {
            categoryDO : {},
        };
        return request.api('/category/getCarrierCategoryList',params);
    },
    /**
     * return LONG 类目id
     * params {categoryName : ''} 类目名称
     * params {type : ''} 类目类型 1 一级类目 2 二级类目 3 三级类目
     * @auth taohua
     * @remark 修改类目
     */
    updateCategory(id,categoryName,skuProps){
        let params = {
            category: JSON.stringify({
                id: id,
                categoryName: categoryName,
            })
        };
        request.api('/category/update',params);
    },
    /**
     * return LONG 类目id
     * params {categoryName : ''} 类目名称
     * params {type : ''} 类目类型 1 一级类目 2 二级类目 3 三级类目
     * @auth taohua
     * @remark 删除类目
     */
    deleteCategory(id){
        let params = {
            id : id
        }
        request.api('/category/delete',params);
    },
    /**
     * return
     * params {}
     * params {}
     * @auth taohua
     * @remark 增加属性
     */
    addCategoryAttr(){
      let params = {}
      request.api('',params)
    },
    /**
     * return datalist
     * params {id : LONG}
     * @auth taohua
     * @remark 获取类目属性
     */
    getCategoryProps(id){
      let params = {
          category_id : id,
          order_by: 'id'
      };
      return request.api('/category/getCateProps',params)
    },

    /**
     * return datalist
     * params {id : LONG}
     * @auth taohua
     * @remark 添加类目属性
     */
    addCategoryProps(id,props){
        let params = {
            category_id : id,
            props : JSON.stringify(props)
        };
        return request.api('/category/propsSetting',params)
    },

}
