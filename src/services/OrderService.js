import {request} from 'ltsutil'
export default {
    get(tid){
        let param = {
            tid : tid,
        };
        return request.api('wbm.tp.wholesale.order.get_by_tid', param);
    }
}
