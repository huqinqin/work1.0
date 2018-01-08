import BaseService from "./abstract/BaseService";
export default class repertoryService extends BaseService{
  /**
   * return
   * param
   * @autor taohua
   * remark 库存管理-查询列表
   */
  static repertoryManage(formInline,pagination){
    let params = {
        page: pagination.page,
        page_size: pagination.page_size,
        wholesale_sku_query: JSON.stringify({
            keywords: formInline.keywords,
            cids: formInline.cids
        })
    };
    console.log(params);
    return super.getRequest('/sku/get_storage_inventory_detail',params)
  }

  /**
   * return
   * param
   * @autor taohua
   * remark 库存明细-查询列表
   */
  static repertoryList(XXXXX){
    let params = {
      XXXXX:XXXXX
    };
    console.log(params);
    return super.getRequest('/XXXXX',params)
  }

  /**
   * return
   * param
   * @autor taohua
   * remark 盘亏盘盈-查询列表
   */
  static repertoryCheck(XXXXX){
    let params = {
      XXXXX:XXXXX
    };
    console.log(params);
    return super.getRequest('/XXXXX',params)
  }

  /**
   * return
   * param
   * @autor taohua
   * remark 库存预警-查询列表
   */
  static repertoryWarning(XXXXX){
    let params = {
      XXXXX:XXXXX
    };
    console.log(params);
    return super.getRequest('/XXXXX',params)
  }

  /**
   * return
   * param
   * @autor taohua
   * remark 库存管理-提交操作
   */
  static repertoryHandle(handle){
    let params = {
      sku_id:handle.sku_id,
      storage: handle.radio === 30002 ? handle.input : handle.count,
      remark: handle.remark,
      op_type:handle.radio
    };
    return super.getRequest('/sku/change_storage',params)
  }

}
