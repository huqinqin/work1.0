import BaseService from "./abstract/BaseService";
export default class DeliveryService extends BaseService {
    static get_picking_list(stock_time, status){
        let param = {
            stock_time : stock_time,
            status: status
        };
        return super.getRequest('/store/delivery/get_picking_list', param);
    }
}
