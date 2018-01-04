import {request} from 'ltsutil'
export default {


    /**
     * return
     * params {user_id: 1} user_id
     * params {shop_id: 1} shop_id
     * params {carrier_uid: 1} carrier_uid
     * @auth taohua
     * @remark 查询购物车
     */
    queryCartList(bizparams){
      let params = {
        user_id: bizparams.user_id,
        shop_id: bizparams.shop_id,
        carrier_uid: bizparams.carrier_uid
      }
      console.log(params)
      return request.api('/wholesale/cart/queryCartList',params)
    },

    /**
     * return
     * params {} 购物车
     * @auth taohua
     * @remark 添加购物车
     */
    addCartItem(cartItemList){
        let params = {
            cartItemList: cartItemList
        }
        return request.api('',params)
    },

    /**
     * return
     * params {} 购物车
     * @auth taohua
     * @remark 购物车结算
     */
    submitCart(cart){
        let params = {
            cart: cart
        }
        return request.api('',params)
    }

}
