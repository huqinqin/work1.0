import {request} from 'ltsutil'
export default {
  /**
   * wholesale_item
   * item_props
   * @param params
   */
  addWithProps(params){
    return request.api('/wholesale/item/add_with_props',params);
  },
  /**
   * wholesale_item_query
   */
  getManageList(){
    let params = {};
    return request.api('/wholesale/item/get_manage_list',params)
  },
  /**
   * itemId
   */
  getWithProps(id){
    let params = {
      item_id : id
    };
    return request.api('/wholesale/item/get_with_props',params)
  },
  /**
   * wholesale_item
   * item_props_list
   */
  modifyWithProps(params){
    return request.api('/wholesale/item/modify_with_props',params)
  },
}
