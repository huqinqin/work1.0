export default class BaseService {
  constructor() {

  }
  output(promise) {
    return new Promise((resolve, reject) => {
        promise.then((resp) => {
          resolve(resp)
          // if (resp.success) {
          //   resolve(resp.data || resp.datalist);
          // } else {
          //   reject(resp.errorMessage);
          // }
        }, (resp) => {
          reject(resp.errorMessage);
        })
    })
  }
}
