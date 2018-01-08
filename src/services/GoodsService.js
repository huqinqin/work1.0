import BaseService from "./abstract/BaseService";
export default class GoodsService extends BaseService{
  /**
   * wholesale_item
   * item_props
   * @param params
   */
  addWithProps(params){
    return super.getRequest('/wholesale/item/add_with_props',params);
  }
  /**
   * wholesale_item_query
   */
  getManageList(){
    let params = {};
    return super.getRequest('/wholesale/item/get_manage_list',params)
  }
  /**
   * itemId
   */
  getWithProps(id){
    let params = {
      item_id : id
    };
    return super.getRequest('/wholesale/item/get_with_props',params)
  }
  /**
   * wholesale_item
   * item_props_list
   */
  modifyWithProps(params){
    return super.getRequest('/wholesale/item/modify_with_props',params)
  }
}
