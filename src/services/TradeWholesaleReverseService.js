import BaseService from "./abstract/BaseService";
import {request} from 'ltsutil'

export default class TradeWholesaleReverseService extends BaseService {
  /**
   * 获取退款处理列表
   * @returns {Promise}
   */
  getList() {
    return super.output(request.api('/wholesale/trade/reverse/getList', {}));
  }

}