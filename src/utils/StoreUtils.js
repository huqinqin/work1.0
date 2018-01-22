/**
 * Created by Administrator on 2017/7/12.
 */
export default {
    _getItem(k) {
        let jsonStr = window.localStorage.getItem(k.toString());
        return jsonStr ? JSON.parse(jsonStr).data : null;
    },
    getItem(k) {
        return this._getItem(k);
    },
    setItem(k, value) {
        value = JSON.stringify({
            data: value
        });
        k = k.toString();
        try {
            window.localStorage.setItem(k, value);
        } catch (e) {
            console.log(e);
            this.removeItem(k);
        }
    },
    getLength() {
        return window.localStorage.length;
    },
    removeItem(k) {
        return window.localStorage.removeItem(k);
    },
    clear() {
        return window.localStorage.clear();
    },
    key(index) {
        return window.localStorage.key(index);
    },
    getItemByIndex(index) {
        let item = {
            keyname: '',
            keyvalue: ''
        };
        item.keyname = this.key(index);
        item.keyvalue = this._getItem(item.keyname);
        return item;
    },
    /**
     * @description 获取所有存储对象
     * @param {Object} key 可选，不传参则返回所有对象，否则返回含有该key的对象
     */
    getItems(k) {

    },
    /**
     * @description 清除指定前缀的存储对象
     * @param {Object} keys
     * @default ["filePathCache_","ajax_cache_"]
     * @author liuyf 2015-07-21
     */
    removeItemByKeys(keys, cb) {

    }
}
