import BaseService from "./abstract/BaseService";
export default class OrderService extends BaseService{
    static get(tid){
        let param = {
            tid : tid,
        };
        return super.getRequest('/store/order/detail', param);
    }
    static getList(param = {}, page = 1, page_size = 10){
        param.page = page;
        param.page_size = page_size;
        return super.getRequest('/store/order/list', param);
    }
    static accept(tid){
        let param = {
            tid : tid,
        };
        return super.getRequest('/store/order/accept', param);
    }
    /**
     * return
     * params {wholesale_trade_request: JSON} wholesale_trade_request
     * @auth taohua
     * @remark 订单提交
     */
    static createTrade(param){
      let params = {
        wholesale_trade_request : JSON.stringify(param)
      };
      return super.getRequest('/wholesale/trade/create_trade',params)
    }
}
