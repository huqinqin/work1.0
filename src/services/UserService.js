import BaseService from "./abstract/BaseService";
import md5 from 'md5'
export default class UserService extends BaseService {
    static login(account, password){
        let param = {
            account : account,
            password: md5(password),
            source : 'PC'
        };
        return super.getRequest('/user/login', param);
    }
    static logout(){
        return super.getRequest('/user/logout', {});
    }
}
