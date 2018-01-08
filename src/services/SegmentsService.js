import BaseService from "./abstract/BaseService";
export default class SegmentsService extends BaseService{

  /**
   * return datalist
   * params {page : '1'} 第几页
   * params {page_size : '10'} 每页数量
   * params {order_by : 'id'} 排序方式
   * @auth taohua
   * @remark 获取子市场列表
   */
  static getSegmentsList(pagination,bizparams){
    let params = {
      page:pagination.page,
      page_size:pagination.pagesize,
      order_by: bizparams.order_by
    }
    return super.getRequest('/market/getChildrenByOpenCode',params)
  }
  /**
   * return
   * params {addChildMarketRequest : ''} json串
   * @auth taohua
   * @remark 新增子市场
   */
  static addSegmentsItem(formData){
    let params = {
      add_child_market_request:JSON.stringify(formData)
    }
    console.log(params)
    return super.getRequest('/market/addChildMarket',params)
  }

  /**
   * return
   * params {addChildMarketRequest : ''} json串
   * @auth taohua
   * @remark 编辑子市场
   */
  static editSegmentsItem(formData){
    let params = {
      bizDO:JSON.stringify(formData)
    }
    console.log(params)
    return super.getRequest('/market/update',params)
  }


    static getItemId(){
    return super.getRequest('/market/get_parentId_by_openCode')
  }
}
