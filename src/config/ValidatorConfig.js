/**
 * 表单输入验证
 * @Author Nation
 * @cdate 2018-01-17 21:26
 */
export default {
    checkPasswordRepeat(password, passwordRepeat, callback) {
        if (password !== passwordRepeat) {
            callback(new Error('两次输入密码不一致!'))
        } else {
            callback()
        }
    },
    account: [
        {required: true, message: '请输入登录账号', trigger: 'blur'},
        {min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 8, max: 30, message: '密码长度在 8 到 30 个字符', trigger: 'blur'}
    ],
    /**
     * 密码确认验证，由于第一次输入的密码要从组件作用域获取，所以只能动态创建，通过回调函数获取第一次输入的密码
     * @param cb
     * @returns {Array & *[]}
     */
    passwordRepeat(cb){
        let checkPassRule = Object.assign([], this.password);
        checkPassRule.push({validator: (rule, value, callback)=>{
            cb.call(cb, rule, value, callback);
        }, trigger: 'blur'});
        return checkPassRule;
    },
    location: [
        {required: true, message: '请选择区域', trigger: 'change'}
    ],
    storeName: [
        {required: true, message: '请输入门店名称', trigger: 'blur'},
        {min: 4, max: 200, message: '长度在 4 到 200 个字符', trigger: 'blur'}
    ],
    address: [
        {required: true, message: '请输入详细地址', trigger: 'blur'},
        {min: 4, max: 200, message: '长度在 4 到 200 个字符', trigger: 'blur'}
    ],
    contact: [
        {required: true, message: '请输入联系人', trigger: 'blur'},
        {min: 2, max: 800, message: '长度在 2 到 800 个字符', trigger: 'blur'}
    ],
    mobile: [
        {required: true, message: '请输入手机号', trigger: 'blur'},
        {min: 11, max: 11, message: '长度在11个字符', trigger: 'blur'}
    ],
    /**
     * 电话或者手机
     */
    phone: [
        {required: true, message: '请输入联系号码', trigger: 'blur'},
        {min: 11, max: 16, message: '长度在 11-16 个字符', trigger: 'blur'}
    ],
}
