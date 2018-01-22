import Dictionary from '../'

export default function(error){
    let code = error.code;
    let dic = new Dictionary();
    let message = dic.getMessage(code);
    alert(message);
}
