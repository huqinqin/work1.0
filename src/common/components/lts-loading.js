import {Loading} from 'element-ui'
let loadingInstance;
export default {
  show (object = {}) {
    const option = Object.assign({
      lock: true,
      text: '正在加载中',
      spinner: '',
      background: 'hsla(0,0%,100%,.7)'
    }, object);
    loadingInstance = Loading.service(option)
  },
  close () {
    loadingInstance.close()
  }
}
