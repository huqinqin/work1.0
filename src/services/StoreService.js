import BaseService from "./abstract/BaseService";

export default class StoreService extends BaseService {

    /**
     * return datalist
     * params {page : '1'} 第几页
     * params {page_size : '10'} 每页数量
     * params {order_by : 'id'} 排序方式
     * @auth taohua
     * @remark 获取子市场列表
     */
    static getStoreList(pagination, bizparams) {
        let params = {
            page: pagination.page,
            page_size: pagination.pagesize,
            order_by: bizparams.order_by
        }
        return super.getRequest('/hq/store/get_store_list', params)
    }

    /**
     * return
     * params {addChildMarketRequest : ''} json串
     * @auth taohua
     * @remark 新增子市场
     */
    static add(formData) {
        let params = {
            add_child_market_request: JSON.stringify(formData)
        }
        return super.postRequest('/hq/store/add', params)
    }

    /**
     * return
     * params {addChildMarketRequest : ''} json串
     * @auth taohua
     * @remark 编辑子市场
     */
    static edit(formData) {
        let params = {
            bizDO: JSON.stringify(formData)
        };
        return super.postRequest('/hq/store/update', params)
    }
}
