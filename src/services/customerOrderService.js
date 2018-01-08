import BaseService from "./abstract/BaseService";
export default class customerOrderService extends BaseService {

    submitCart(cart){
        let params = {
            cart: cart
        }
        return super.getRequest('',params)
    }

}
