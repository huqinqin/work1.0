import { MessageBox } from 'element-ui'
export default {
  show(that,action,title,option){
    option = option ? option : {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning',center: true}
    MessageBox.confirm('你确定要' + action + '这一条吗？',title,{
      confirmButtonText: option.confirmButtonText,
      cancelButtonText: option.cancelButtonText,
      type: option.type,
      center: option.center
    }).then(() => {
      this.$emit('confirm')
      that.$ltsMessage.show({
        type: option.successType,
        message: option.successMessage
      })
    }).catch(() => {
      that.$ltsMessage.show({
        type: option.cancelType,
        message: option.cancelMessage
      })
    })
  }
}
