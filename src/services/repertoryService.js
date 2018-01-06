import {request} from 'ltsutil'
export default {
  /**
   * return
   * param
   * @autor taohua
   * remark 库存管理-查询列表
   */
  repertoryManage(formInline){
    let params = {
      XXXXX:formInline
    };
    console.log(params);
    return request.api('/XXXXX',params)
  },

  /**
   * return
   * param
   * @autor taohua
   * remark 库存明细-查询列表
   */
  repertoryList(XXXXX){
    let params = {
      XXXXX:XXXXX
    };
    console.log(params);
    return request.api('/XXXXX',params)
  },

  /**
   * return
   * param
   * @autor taohua
   * remark 盘亏盘盈-查询列表
   */
  repertoryCheck(XXXXX){
    let params = {
      XXXXX:XXXXX
    };
    console.log(params);
    return request.api('/XXXXX',params)
  },

  /**
   * return
   * param
   * @autor taohua
   * remark 库存预警-查询列表
   */
  repertoryWarning(XXXXX){
    let params = {
      XXXXX:XXXXX
    };
    console.log(params);
    return request.api('/XXXXX',params)
  },

  /**
   * return
   * param
   * @autor taohua
   * remark 库存管理-操作
   */
  repertoryHandle(XXXXX){
    let params = {
      XXXXX:XXXXX
    };
    console.log(params);
    return request.api('/XXXXX',params)
  },

}
