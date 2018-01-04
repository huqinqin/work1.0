import {request} from 'ltsutil'
export default {
    get(tid){
        let param = {
            tid : tid,
        };
        return request.api('/store/order/detail', param);
    },
    accept(tid){
        let param = {
            tid : tid,
        };
        return request.api('/store/order/accept', param);
    }
}
