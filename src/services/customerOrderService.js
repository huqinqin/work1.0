import {request} from 'ltsutil'
export default {

    submitCart(cart){
        let params = {
            cart: cart
        }
        return request.api('',params)
    }

}
