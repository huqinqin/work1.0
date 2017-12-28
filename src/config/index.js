/**
 * 是否为开发者模式
 * @type {boolean}
 */
const isDebug = false;
const isUseMock = false;
export default {
    url: {
        main: 'http://work.lts.com:8085'
    },
    api: {
        api: 'http://work.lts.com:8085/gateway/api',
        service: 'http://work.lts.com:8085/gateway',
        tp: 'http://tp.api.500mi.com:8080/gateway/api',
        wbm: 'http://work.local.lts.com:8085',
    },
    homePage: '/pages/index.html',
    loginPage: '/pages/login.html',
    appKey: '00000-500mi',
    // 用户session在本地存储名
    sessIdName: 'SESSION_ID',
    sessDataName: 'SESSION_DATA',
    isUseMock: isUseMock,
    isDebug: isDebug,
    // log等级 debug info error warnning notice prod, 暂未实现
    logLevel: 'debug',
}
