import BaseService from "./abstract/BaseService";
import md5 from 'md5'
export default class InstallerService extends BaseService {
    /**
     * return  datalist 工程商列表
     * params {page: ''} 页数
     * params {page_size: ''} 每页条数
     * params {order_by: ''} 排序方式
     * params {shop: {}} 查询参数
     * @auth taohua
     * @remark 搜索工程商列表
     */
    static getList(bizparams, pagination) {
        let params = {
            order_by: bizparams.order_by,
            installer_name: bizparams.installer_name,
            page: pagination.page,
            page_size: pagination.pagesize
        }
        return super.getRequest('/store/installer/get_list', params)
    }

    static get(id) {
        return super.getRequest('/store/installer/get', {id: id})
    }

    /**
     * return  datalist 工程商列表
     * params {}
     * params {}
     * params {}
     * @auth taohua
     * @remark 新增工程商
     */
    static add(params = {
        account : null,
        password : null,
        store_name : null,
        address : null,
        lc_code : null,
        contact : null,
        contact_phone : null,
        contact_mobile : null,
    }) {
        params.password = md5(params.password);
        return super.postRequest('/store/installer/add', params)
    }

    /**
     * return  datalist 工程商列表
     * params {store_request：} JDON串
     * params {}
     * params {}
     * @auth taohua
     * @remark 编辑工程商
     */
    static update(params = {
        uid : null,
        store_name : null,
        address : null,
        lc_code : null,
        contact : null,
        contact_phone : null
    }) {
        return super.postRequest('/store/installer/update', params)
    }

    static delete(uid) {
        return super.postRequest('/store/installer/delete', {uid: uid})
    }
}
