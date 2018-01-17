export default {
    isBlankObject(obj = {}) {
        if (!obj) return true;
        for (let i in obj) {
            return false;
        }
        return true;
    },
    /**
     * 根据选项的值获得级联选择器的选型标签全路径
     * @param options [{value:'',label:'',children:[],disabled:true}]
     * @param value []
     */
    getCascaderFullLabelByValue(options = [], value = []){
        if (!options || options.length === 0 || !value || value.length === 0) {
            return '';
        }
        options = Object.assign([], options);
        value = Object.assign([], value);
        let fullLable = '';
        options.forEach((option) => {
            if (option.value == value[0]) {
                fullLable += option.label;
                value.shift();
                fullLable += this.getCascaderFullLabelByValue(option.children, value);
            }
        });
        return fullLable;
    }
}
