import {request} from 'ltsutil'
export default {
    /**
     * return  datalist 客户列表
     * params {} 客户分组
     * params {} 搜索类型
     * params {} keyword
     * @auth taohua
     * @remark 搜索客户
     */
    searchCustomer(customerForm){
        let params = {
            keyword:customerForm.keyword,

        }
        return request.api('',params)
    },

    /**
     * return datalist 商品列表
     * params {} 短码
     * params {} 长码
     * params {} 品牌
     * @auth taohua
     * @remark 搜索商品
     */
    searchItem(itemform){
        let params = {

        }
        return request.api('',params)
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
