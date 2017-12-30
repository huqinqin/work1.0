import {request} from 'ltsutil'
import md5 from 'md5'
export default {
    login(account, password){
        let param = {
            account : account,
            password: md5(password),
            source : 'PC'
        };
        return request.api('/user/login', param);
    },
    logout(){
        return request.api('/user/logout', {});
    }
}
