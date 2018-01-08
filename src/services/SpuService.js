import BaseService from "./abstract/BaseService";
export  default class SpuService extends BaseService{
    /**
     * return 产品列表
     * RequestParam(value="spu") String spu
     * RequestParam(value="page") Int page
     * RequestParam(value="page_size") Int page_size
     * RequestParam(value="order_by") String order_by
     *@auth 小猪
     */
    static getSpuList(categoryId){
       let params = {
           spu : JSON.stringify({cids:categoryId}),
           page : 1,
           page_size : 20,
           order_by : 'id',
       };
       return super.getRequest("/spu/getList",params);
    }
    /**
     * return 产品属性
     * RequestParam(value="spu_request") Object spu_request 产品基本信息
     * RequestParam(value="spec") String spec 销售单位
     * RequestParam(value="child_spu_request_list") String child_spu_request_list 规格笛卡尔积
     *@auth 小猪
     */
    static getSkuProps(categoryId){
        let params = {
            category_id : categoryId,
            sku : true,
        };
        return super.getRequest("/spu/getCateProps",params);
    }
    /**
     * return 新增产品
     * RequestParam(value="spu_request") Object spu_request 产品基本信息
     * RequestParam(value="spec") String spec 销售单位
     * RequestParam(value="child_spu_request_list") String child_spu_request_list 规格笛卡尔积
     *@auth 小猪
     */
    static addSpu(param){
        let params = {
            props : [],
            spu_request : JSON.stringify(param.spu_request),
            spec : JSON.stringify({unit : param.spec}),
            child_spu_request_list : JSON.stringify(param.child_spu_request_list),
        };
        return super.getRequest("/spu/add",params);
    }
    /**
     * return datalist
     * RequestParam(value="spu_id") Long 产品Id
     * @auth 小猪
     * @remark 获取spu
     */
    static getSpudtoist(param){
      let params = {
        spu_id : 179944,
      };
      return super.getRequest("/spu/get_spudto_list",params);
    }
}
