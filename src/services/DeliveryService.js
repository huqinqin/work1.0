import {request} from 'ltsutil'
export default {
    get_picking_list(stock_time, status){
        let param = {
            stock_time : stock_time,
            status: status
        };
        return request.api('/store/delivery/get_picking_list', param);
    }
}
