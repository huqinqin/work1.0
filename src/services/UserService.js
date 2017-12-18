import  BaseService from 'BaseService'
import  Request from 'request'
export default class UserService extends BaseService{
  /**
   * 测试连接 获取wubaimi的 商品列表
   * @author:xiaozhu
   * @param{*}
   * @return{}
   */
   getUserItemList(param) {
      let params = {};
      params = {
        puser_id : 138890,
        shop_id : 21985,
        page : 1,
        pagesize : 10,
        cate_id : 9494699,
      }
      return super.output(Request.wbmApi('/mobile/consumer/item/searchItem',params));
   }

}
