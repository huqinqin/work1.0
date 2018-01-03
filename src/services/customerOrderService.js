import {request} from 'ltsutil'
export default {
    /**
     * return
     * params {} 客户分组
     * params {} 搜索类型
     * params {} keyword
     * @auth taohua
     * @remark 搜索客户
     */
    searchCustomer(forminline){
        let params = {
            keyword:forminline.keyword
        }
        return request.api('',params)
    }
}
