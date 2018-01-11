import BaseService from "./abstract/BaseService";
export default class OrderService extends BaseService{
    static get(id){
        let param = {
            id : id,
        };
        return super.getRequest('/store/reverse/detail', param);
    }
    static getList(oid, status, start_time, end_time, page = 1, page_size = 10, order_by = ''){
        let param = {
            oid : oid,
            status : status,
            start_time : start_time,
            end_time : end_time,
            page : page,
            page_size : page_size,
            order_by : order_by
        };
        return super.getRequest('/store/reverse/list', param);
    }
}
