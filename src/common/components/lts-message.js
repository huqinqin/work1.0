import {Message} from 'element-ui'
export default {
  show(opotion){
    opotion = opotion ? opotion : {type : '',message:'用message组件你需要传{type:"类型"，message;"信息""}'}
    Message({
      showClose: true,
      message: opotion.message,
      type : opotion.type,
    })
  }
}
