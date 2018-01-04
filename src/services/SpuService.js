import {request} from 'ltsutil'
export  default{
    /**
     * return 产品列表
     * RequestParam(value="spu") String spu
     * RequestParam(value="page") Int page
     * RequestParam(value="page_size") Int page_size
     * RequestParam(value="order_by") String order_by
     *@auth 小猪
     */
    getSpuList(categoryId){
       let params = {
           spu : JSON.stringify({cids:categoryId}),
           page : 1,
           page_size : 20,
           order_by : 'id',
       };
       return request.api("/spu/getList",params);
    },
    /**
     * return 产品属性
     * RequestParam(value="spu_request") Object spu_request 产品基本信息
     * RequestParam(value="spec") String spec 销售单位
     * RequestParam(value="child_spu_request_list") String child_spu_request_list 规格笛卡尔积
     *@auth 小猪
     */
    getSkuProps(categoryId){
        let params = {
            category_id : categoryId,
            sku : true,
        };
        return request.api("/spu/getCateProps",params);
    },
    /**
     * return 新增产品
     * RequestParam(value="spu_request") Object spu_request 产品基本信息
     * RequestParam(value="spec") String spec 销售单位
     * RequestParam(value="child_spu_request_list") String child_spu_request_list 规格笛卡尔积
     *@auth 小猪
     */
    addSpu(param){
        let params = {
            props : [],
            spu_request : JSON.stringify(param.spu_request),
            spec : JSON.stringify({unit : param.spec}),
            child_spu_request_list : JSON.stringify(param.child_spu_request_list),
        };
        console.log(params);
        return request.api("/spu/add",params);
    },
}
