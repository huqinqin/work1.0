import BaseService from "./abstract/BaseService";
export default class CustomerOrderService extends BaseService {

    static submitCart(cart){
        let params = {
            cart: cart
        }
        return super.getRequest('',params)
    }

}
