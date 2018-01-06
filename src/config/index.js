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
        service: 'http://work.lts.com:8085/gateway'
    },
    homePage: '/',
    loginPage: '/login',
    appKey: '00000-500mi',
    // 用户session在本地存储名
    sessDataName: 'SESSION_DATA',
    isUseMock: isUseMock,
    isDebug: isDebug,
    // log等级 debug info error warnning notice prod, 暂未实现
    logLevel: 'debug',
}
