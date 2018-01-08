import BaseService from "./abstract/BaseService";
export default class TradeWholesaleReverseService extends BaseService {
    /**
     * 获取退款处理列表
     * @returns {Promise}
     */
    static getList() {
        return super.getRequest('/wholesale/trade/reverse/getList', {});
    }
}
