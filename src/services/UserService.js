import  Request from 'request'
export default {
    login(account, password){
        let param = {
            account : account,
            password: password,
            source : 'PC'
        };
        return Request.ltsService('/user/login', param);
    },
    logout(){
        return Request.ltsService('/user/logout', {});
    }
}
