import config from '@/config/index'
import store from '@/utils/DBHelper'
export  default {
    sessionData : null,
    sessionKey: 'session_data',
    isLogin(){
        return this.getSessionData() != null;
    },
    checkLogin(){
        if (!this.isLogin()) {
            location.href = config.loginPage;
        }
    },
    getSessionData(){
        if (this.sessionData == null) {
            let sessionStr = store.getItem(this.sessionKey);
            try {
                this.sessionData = JSON.parse(sessionStr);
            } catch (err){
                console.log(err);
            }
        }
        return this.sessionData;
    },
    login(sessionData){
        store.setItem(this.sessionKey, JSON.stringify(sessionData));
        location.href = config.homePage;
    },
    logout(){
        store.removeItem(this.sessionKey);
        location.href = config.loginPage;
    }
}
