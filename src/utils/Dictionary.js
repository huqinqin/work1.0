import Const from 'const'

let Dictionary = {};

Dictionary.install = (Vue, ...options) => {
  Vue.prototype.$_dic = (key, value) => {
    // 获取常量中的编码
    let code = Const[key][value];

    // 通过常量中的编码获取国际化语言
    let trans = Vue.prototype.$_t.call(code);

    // 如果没有活动
    return trans || code || value;
  }
}

export default Dictionary
