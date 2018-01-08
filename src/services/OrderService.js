import BaseService from "./abstract/BaseService";
export default class OrderService extends BaseService{
    get(tid){
        let param = {
            tid : tid,
        };
        return super.getRequest('/store/order/detail', param);
    }
    accept(tid){
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
    createTrade(param){
      let params = {
        wholesale_trade_request : JSON.stringify(param)
      }
      return super.getRequest('/wholesale/trade/create_trade',params)
    }
}
