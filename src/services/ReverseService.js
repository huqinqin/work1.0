import BaseService from "./abstract/BaseService";
import {commonUtils} from 'ltsutil'
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
    static apply(oid, installer_uid, reverse_reason, stock_item = {}, return_item = {}, bad_item = {}, remark){
        let param = {
            oid : oid,
            installer_uid : installer_uid,
            reverse_reason : reverse_reason,
            remark : remark,
        };
        if (!commonUtils.isBlankObject(stock_item)) {
            param.stock_item = JSON.stringify(stock_item);
        }
        if (!commonUtils.isBlankObject(return_item)) {
            param.return_item = JSON.stringify(return_item);
        }
        if (!commonUtils.isBlankObject(bad_item)) {
            param.bad_item = JSON.stringify(bad_item);
        }
        return super.postRequest('/store/reverse/apply', param);
    }
    static operate(id, installer_uid, op_type, remark, deal_remark){
        let param = {
            id : id,
            installer_uid : installer_uid,
            op_type : op_type,
            remark : remark,
            deal_remark : deal_remark,
        };
        return super.postRequest('/store/reverse/operate', param);
    }
}
