/**
 * Toast插件
 * @type {{}}
 */
let Toast = {};

Toast.install = (Vue, options) => {
  let opt = {

    // 默认显示位置
    defaultType: 'bottom',

    // 持续时间
    duration: '2500',

    //
    ...options,
  };

  // 注册Toast
  Vue.prototype.$toast = (tips, type) => {
    // 如果有传type，位置则设为该type
    if (type) {
      opt.defaultType = type;
    }

    // 如果toast还在，则不再执行
    if (document.getElementsByClassName('vue-toast').length) {
      return;
    }

    //
    let toastTpl = Vue.extend({
      template: '<div class="lts-toast toast-' + opt.defaultType + '">' + tips + '</div>'
    });


    let tpl = new toastTpl().$mount().$el;

    //
    document.body.appendChild(tpl);

    // duration秒后删除
    setTimeout(() => {
      document.body.removeChild(tpl);
    }, opt.duration);
  }

  ['bottom', 'center', 'top'].forEach(type => {
    Vue.prototype.$toast[type] = (tips) => {
      return Vue.prototype.$toast(tips, type)
    }
  })
}

export default Toast;