import Request from 'request'
import Config from 'config'

export default class BaseService {
  /**
   * 出口封装
   * @param promise
   * @returns {Promise}
   */
  output(promise) {
    return new Promise((resolve, reject) => {
      promise.then((resp) => {
        if (resp.success) {
          resolve(resp.data || resp.datalist || resp.list);
        } else {
          reject(resp.errorMessage);
        }
      }, (resp) => {
        reject(resp.errorMessage);
      })
    });
  }
}
