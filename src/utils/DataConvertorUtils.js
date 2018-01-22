export default {
    convertorCate(datalist = []){
        let tree = [];
        datalist.forEach((cate)=>{
            let first = {
                value : cate.id,
                label : cate.name,
            };
            if(cate.children.length > 0){
                first.children = this.convertorCate(cate.children)
            }
            tree.push(first)
        });
        return tree;
    }
}
