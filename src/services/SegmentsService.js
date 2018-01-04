import {request} from 'ltsutil'
export default {
  getSegmentsList(){
    let params = {
      page:1,
      page_size:10,
      order_by: 'id'
    }
    return request.api('/',params)
  },
}
