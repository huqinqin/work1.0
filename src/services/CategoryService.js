import {request} from 'ltsutil'
export default{
    /**
     * return LONG 类目id
     * param {categoryName : ''} 类目名称
     * param {type : ''} 类目类型 1 一级类目 2 二级类目 3 三级类目
     * @auth taohua
     */
    addCategory(categoryName){
       let param = {
           categoryName : categoryName,
           type : 1,
       };
       request.api('wbm.basic.category.add',param);
    },
}
