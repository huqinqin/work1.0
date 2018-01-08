import BaseService from "./abstract/BaseService";
export default class DeliveryService extends BaseService {
    static get_provider_spot_view_order_list_by_deliver(stock_time, status){
        let param = {
            stock_time : stock_time,
            status: status
        };
        return super.getRequest('/store/delivery/get_provider_spot_view_order_list_by_deliver', param);
    }
    static start_stock_up(ids = []){
        let param = {
            ids : ids
        };
        return super.getRequest('/store/delivery/start_stock_up', param);
    }
}
