import BaseService from "./abstract/BaseService";
export default class MerchantsService extends BaseService{
  /**
   * return  datalist 工程商列表
   * params {page: ''} 页数
   * params {page_size: ''} 每页条数
   * params {order_by: ''} 排序方式
   * params {shop: {}} 查询参数
   * @auth taohua
   * @remark 搜索工程商列表
   */
  static getMerchantsList(bizparams,pagination){
    let params = {
      order_by:bizparams.order_by,
      shop:bizparams.shop,
      page:pagination.page,
      page_size:pagination.pagesize
    }
    console.log(params)
    return super.getRequest('/installer/getStoreList',params)
  }
  /**
   * return  datalist 工程商列表
   * params {}
   * params {}
   * params {}
   * @auth taohua
   * @remark 新增工程商
   */
  static addMerchantsItem(formData){
    let params = {
      store_request:JSON.stringify(formData)
    }
    return super.getRequest('/installer/add',params)
  }
  /**
   * return  datalist 工程商列表
   * params {store_request：} JDON串
   * params {}
   * params {}
   * @auth taohua
   * @remark 编辑工程商
   */
  static editMerchantsItem(formData){
    let params = {
      store_request:JSON.stringify(formData)
    }
    console.log(params)
    return super.getRequest('/installer/update',params)
  }
  // 把省市区放到级联选择器里
    static getProvince(item,data,option){
    for (let i = 0; i < data.datalist.length; i++){
      if (item.indexOf(data.datalist[i].province) === -1){
        item.push(data.datalist[i].province)
      }else{
      }
    }
    for(let i = 0; i < item.length; i++){
      let pro = {
        value:item[i],
        label:item[i],
        children:[]
      }
      option.push(pro)
    }
    console.log(option)
    return option
  }
  // 获取到市
    static getCity(item,data,option){

  }
}
