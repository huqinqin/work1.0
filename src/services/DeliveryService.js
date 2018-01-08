import BaseService from "./abstract/BaseService";
export default class DeliveryService extends BaseService {
    static get_provider_spot_view_order_list_by_deliver(status, stock_time = '', warehouse_time = ''){
        let param = {
            stock_time : stock_time,
            warehouse_time : warehouse_time,
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
    static confirm_warehousing(ids = []){
        let param = {
            ids : ids
        };
        return super.getRequest('/store/delivery/confirm_warehousing', param);
    }
    static stock_out(id = 0, num = 0){
        let param = {
            id : id,
            num : num
        };
        return super.getRequest('/store/delivery/stock_out', param);
    }
}
