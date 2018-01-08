import {request} from 'ltsutil'
export default class BaseService {
    static getRequest(method, param) {
        return request.getApi(method, param);
    }
    static postRequest(method, param) {
        return request.postApi(method, param);
    }
}
