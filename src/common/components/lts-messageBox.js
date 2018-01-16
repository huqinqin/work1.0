import { MessageBox } from 'element-ui'
export default {
  show(that,option){
    option = option ? option : {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning',center: true}
    MessageBox.confirm(option.action,option.title,{
      confirmButtonText: option.confirmButtonText,
      cancelButtonText: option.cancelButtonText,
      type: option.type,
      center: option.center
    }).then(() => {
      this.$emit('confirm')
      that.$ltsMessage.show({
        type: 'success',
        message: option.successMessage
      })
    }).catch(() => {
      that.$ltsMessage.show({
        type: 'info',
        message: option.cancelMessage
      })
    })
  }
}
