import {Loading} from 'element-ui'
let loadingInstance = ''
export default {
  show (Object) {
    const opotion = Object ? {
      lock: true,
      text: '正在加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    } : ''
    loadingInstance = Loading.service(opotion)
  },
  close () {
    loadingInstance.close()
  }
}
