import BaseService from "./abstract/BaseService";
export default class GoodsService extends BaseService{
  /**
   * wholesale_item
   * item_props
   * @param params
   */
  static addWithProps(params){
    return super.getRequest('/wholesale/item/add_with_props',params);
  }
  /**
   * wholesale_item_query
   */
  static getManageList(){
    let params = {};
    return super.getRequest('/wholesale/item/get_manage_list',params)
  }
  /**
   * itemId
   */
  static getWithProps(id){
    let params = {
      item_id : id
    };
    return super.getRequest('/wholesale/item/get_with_props',params)
  }
  /**
   * wholesale_item
   * item_props_list
   */
  static modifyWithProps(params){
    return super.getRequest('/wholesale/item/modify_with_props',params)
  }
}
