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
    static get_delivery_batch_no_list(incar_time = '', spot_code = ''){
        let param = {
            incar_time : incar_time,
            spot_code : spot_code
        };
        return super.getRequest('/store/delivery/get_delivery_batch_no_list', param);
    }
    static get_in_car_list(status, spot_code, incar_time, batch_no_arr){
        let param = {
            status : status,
            incar_time : incar_time,
            spot_code : spot_code,
            batch_no_arr : batch_no_arr
        };
        return super.getRequest('/store/delivery/get_in_car_list',param);
    }
    static get_in_car_order_list(status, line_code = '', batch_no = '', spot_code = ''){
        let param = {
            status : status,
            line_code : line_code,
            batch_no : batch_no,
            spot_code : spot_code
        };
        return super.getRequest('/store/delivery/get_in_car_order_list', param);
    }
    static consignment(ids = []){
        let param = {
            ids : ids
        };
        return super.getRequest('/store/delivery/consignment', param);
    }
    static consignment_by_line_and_spot(line_code = '', spot_code_arr = ''){
        let param = {
            line_code : line_code,
            spot_code_arr : spot_code_arr
        };
        return super.getRequest('/store/delivery/consignment_by_line_and_spot', param);
    }
}
