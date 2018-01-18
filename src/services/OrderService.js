import BaseService from "./abstract/BaseService";
export default class OrderService extends BaseService{
    static get(tid){
        let param = {
            tid : tid,
        };
        return super.getRequest('/store/order/detail', param);
    }
    static getList(param = {}, page = 1, page_size = 10, order_by = 'cdate desc'){
        param.page = page;
        param.page_size = page_size;
        param.order_by = order_by;
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
      return super.postRequest('/store/trade/create_trade',params)
    }

    /**
     * return
     * @auth 小猪
     * @remark 模拟下单
     */
    static simulateCreateTrade(param){
        let params = {
            wholesale_trade_request : JSON.stringify(param)
        };
        return super.postRequest('/store/trade/simulate_create_trade',params)
    }
}
