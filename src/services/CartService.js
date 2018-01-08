import BaseService from "./abstract/BaseService";
export default class CartService extends BaseService{
  /**
   * return ture
   * param userId 工程商ID
   * param num 数量
   * param carrierUid 市场Uid
   * param cartItemKey 商品信息
   * param itemPropDOS 商品属性信息
   * @autor 小猪
   * remark 添加购物车
   */
  static putCartPlus(uid,param){
    let params = {
      user_id : uid,
      num : param.num,
      carrier_uid : 158635,
      cart_item_key : JSON.stringify(
        {
          puserId : 158635,
          spuId : param.spuId,
          itemId : param.id,
        }
      ),
      item_props : JSON.stringify([
        {
          "attribute":0,
          "id":26,
          "img_url":"",
          "price":1500,
          "price_action":0,
          "prop_value":"{'配件':'支架'}",
          "props":"支架",
          "sin":"",
          "spuId":0,
          "storage":0,
          "value_type":0
        },
        {
          "attribute":0,
          "id":29,
          "img_url":"",
          "price":35000,
          "price_action":1,
          "prop_value":"{'颜色':'红色','内存:'32G'}",
          "props":"红色,32G",
          "sin":"CMIP2832DW-S",
          "spuId":179886,
          "storage":0,
          "value_type":0
        }
      ]),
    };
    console.log(params);
    return super.getRequest('//wholesale/cart/putCartPlus',params);
  }

  /**
   * return
   * params {user_id: 1} user_id
   * params {shop_id: 1} shop_id
   * params {carrier_uid: 1} carrier_uid
   * @auth taohua
   * @remark 查询购物车
   */
  static queryCartList(userId){
    let params = {
      user_id: userId
    };
    console.log(params);
    return super.getRequest('/wholesale/cart/queryCartList',params)
  }
}
