import Request from 'request'
import md5 from 'md5'
export default {
    login(account, password){
        let param = {
            account : account,
            password: md5(password),
            source : 'PC'
        };
        return Request.ltsService('/user/login', param);
    },
    logout(){
        return Request.ltsService('/user/logout', {});
    }
}
