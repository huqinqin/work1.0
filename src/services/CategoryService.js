import BaseService from "./abstract/BaseService";
export default class CategoryService extends BaseService {
    /**
     * return LONG 类目id
     * params {name : ''} 类目名称
     * params {type : ''} 类目类型 1 一级类目 2 二级类目 3 三级类目
     * @auth taohua
     * @remark 新增类目
     */
    static addCategory(categoryName,parentId){
       let params = {
           name : categoryName,
           parentId : parentId,
       };
       return super.getRequest('/category/add',{category:JSON.stringify(params)});
    }
    /**
     * return datalist 类目列表
     * @auth taohua
     * @remarkl 获取所有的类目列表
     */
    static getAllCategoryList(){
        return super.getRequest('/category/getCarrierCategoryList');
    }
    /**
     * return LONG 类目id
     * params {categoryName : ''} 类目名称
     * params {type : ''} 类目类型 1 一级类目 2 二级类目 3 三级类目
     * @auth taohua
     * @remark 修改类目
     */
    static updateCategory(id,categoryName,skuProps){
        let params = {
            category: JSON.stringify({
                id: id,
                categoryName: categoryName,
            })
        };
        super.getRequest('/category/update',params);
    }
    /**
     * return LONG 类目id
     * params {categoryName : ''} 类目名称
     * params {type : ''} 类目类型 1 一级类目 2 二级类目 3 三级类目
     * @auth taohua
     * @remark 删除类目
     */
    static deleteCategory(id){
        let params = {
            id : id
        }
        super.getRequest('/category/delete',params);
    }
    /**
     * return
     * params {}
     * params {}
     * @auth taohua
     * @remark 增加属性
     */
    static addCategoryAttr(){
      let params = {}
      super.getRequest('',params)
    }
    /**
     * return datalist
     * params {id : LONG}
     * @auth taohua
     * @remark 获取类目属性
     */
    static getCategoryProps(id){
      let params = {
          category_id : id,
          order_by: 'id'
      };
      return super.getRequest('/category/getCateProps',params)
    }

    /**
     * return datalist
     * params {id : LONG}
     * @auth taohua
     * @remark 添加类目属性
     */
    static addCategoryProps(id,props){
        let params = {
            category_id : id,
            props : JSON.stringify(props)
        };
        return super.getRequest('/category/propsSetting',params)
    }
    /**
     * return datalist
     * params {id : LONG}
     * @auth taohua
     * @remark 添加类目属性
     */
    static getCateProps(id){
        let params = {
            category_id : id,
            sku : true,
            order_by : "id",
        };
        return super.getRequest('/category/getCateProps',params)
    }
}
