import {request} from 'ltsutil'
export default {
  /**
   * return  datalist 工程商列表
   * params {page: ''} 页数
   * params {page_size: ''} 每页条数
   * params {order_by: ''} 排序方式
   * @auth taohua
   * @remark 搜索工程商列表
   */
  getMerchantsList(){
    let params = {
      page:1,
      page_size:10,
      order_by: 'id'
    }
    return request.api('/',params)
  },
  /**
   * return  datalist 工程商列表
   * params {}
   * params {}
   * params {}
   * @auth taohua
   * @remark 新增工程商
   */
  addMerchantsItem(){
    let params = {

    }
    return request.api('/',params)
  },
  /**
   * return  datalist 工程商列表
   * params {}
   * params {}
   * params {}
   * @auth taohua
   * @remark 编辑工程商
   */
  editMerchantsItem(){
    let params = {

    }
    return request.api('/',params)
  },

}
