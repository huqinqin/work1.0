import config from 'config'
import {store} from 'ltsutil'
export default {
    sessionData : null,
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
            let sessionStr = store.getItem(config.sessDataName);
            try {
                this.sessionData = JSON.parse(sessionStr);
            } catch (err){
                console.log(err);
            }
        }
        return this.sessionData;
    },
    login(sessionData){
        store.setItem(config.sessDataName, JSON.stringify(sessionData));
        location.href = config.homePage;
    },
    logout(){
        store.removeItem(config.sessDataName);
        location.href = config.loginPage;
    }
}
