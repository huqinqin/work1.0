import BaseService from "./abstract/BaseService";
export default class GoodsService extends BaseService{
  /**
   * store_item
   * item_props
   * @param params
   */
  static addWithProps(params){
    return super.getRequest('/store/item/add_with_props',params);
  }
  /**
   * store_item_query
   */
  static getManageList(){
    let params = {};
    return super.getRequest('/store/item/get_manage_list',params)
  }
  /**
   * itemId
   */
  static getWithProps(id){
    let params = {
      item_id : id
    };
    return super.getRequest('/store/item/get_with_props',params)
  }
  /**
   * store_item
   * item_props_list
   * @remark 编辑商品
   * @auth xiaozhu
   */
  static modifyWithProps(params){
    return super.getRequest('/store/item/modify_with_props',params)
  }
  /**
  * @returns {*}
  * 获取商品列表
  */
  static getList(userId){
      let params = {
          user_id : userId,
          order_type : 'valet_order'
      };
      return super.getRequest('/store/item/getList',params);
  }
}
