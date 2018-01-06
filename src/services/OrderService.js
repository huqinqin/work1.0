import {request} from 'ltsutil'
export default {
    get(tid){
        let param = {
            tid : tid,
        };
        return request.api('/store/order/detail', param);
    },
    accept(tid){
        let param = {
            tid : tid,
        };
        return request.api('/store/order/accept', param);
    },
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
      return request.api('/wholesale/trade/create_trade',params)
    },
}
