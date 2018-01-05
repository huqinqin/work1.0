import {request} from 'ltsutil'

export default {
  /**
   * return  datalist 工程商列表
   * params {page: ''} 页数
   * params {page_size: ''} 每页条数
   * params {order_by: ''} 排序方式
   * params {shop: {}} 查询参数
   * @auth taohua
   * @remark 搜索工程商列表
   */
  getMerchantsList(bizparams,pagination){
    let params = {
      order_by:bizparams.order_by,
      shop:bizparams.shop,
      page:pagination.page,
      page_size:pagination.pagesize
    }
    console.log(params)
    return request.api('/installer/getStoreList',params)
  },
  /**
   * return  datalist 工程商列表
   * params {}
   * params {}
   * params {}
   * @auth taohua
   * @remark 新增工程商
   */
  addMerchantsItem(formData){
    let params = {
      store_request:JSON.stringify(formData)
    }
    return request.api('/installer/add',params)
  },
  /**
   * return  datalist 工程商列表
   * params {store_request：} JDON串
   * params {}
   * params {}
   * @auth taohua
   * @remark 编辑工程商
   */
  editMerchantsItem(formData){
    let params = {
      store_request:JSON.stringify(formData)
    }
    console.log(params)
    return request.api('/installer/update',params)
  },

}
