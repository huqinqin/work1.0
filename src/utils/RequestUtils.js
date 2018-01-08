import config from 'config'
import $ from 'jquery'

export default {
    /**
     * 给请求的参数自动加随机数
     */
    mixParam(param = {}, isAddRandom = true) {
        return new Promise(resolve => {
                if (isAddRandom) param.r = new Date().getTime();
                resolve(param);
            }
        )
    },
    parseErrorResult(url, xhr, type, error) {
        let errorResult = {
            success: false,
            data: xhr.responseText,
            error_code: 0,
            error_name: type,
            error_message: ''
        };
        switch (type) {
            case 'timeout':
                errorResult.error_code = 9001;
                errorResult.error_message = '请求超时';
                break;
            case 'error':
                // BOP封装了下面3个httpStatusCode
                if (url.indexOf('api.lts.com') > 0 && (xhr.status === 400 || xhr.status === 406 || xhr.status === 500)) {
                    return xhr.responseText;
                }
                errorResult.error_code = xhr.status;
                errorResult.error_message = error;
                break;
            case 'abort':
                errorResult.error_code = 9003;
                errorResult.error_message = '请求中断,请检查网络是否连接';
                break;
            case 'parseerror':
                errorResult.error_code = 9004;
                errorResult.error_message = '返回的数据解析失败';
                break;
            default:
                errorResult.error_code = 9005;
                errorResult.error_message = '请求异常';
        }
        return errorResult;
    }
    ,
// 纯净的的get
    getRequest(url, parameter) {
        return new Promise((resolve, reject) => {
            if (config.isDebug) {
                var reqId = new Date().getTime();
                console.log('reqId:' + reqId + ';url:' + url);
                console.log('reqId:' + reqId + ';param:' + JSON.stringify(parameter));
            }
            $.ajax({
                type: 'GET',
                url: url,
                data: parameter,
                timeout: 30 * 1000,
                cache: false,
                // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
                success(data, status, xhr) {
                    if (config.isDebug) {
                        console.log(data);
                        console.log(xhr.responseText);
                    }
                    resolve(xhr.responseText);
                },
                // type: "timeout", "error", "abort", "parsererror"
                error: (xhr, type, error) => {
                    if (config.isDebug) {
                        console.log(xhr);
                    }
                    if (type == 'error' && xhr.responseText) {
                        let text = JSON.parse(xhr.responseText);
                    }
                    let errorResult = this.parseErrorResult(url, xhr, type, error);
                    if (config.isDebug && errorResult) {
                        console.log(errorResult);
                    }
                    if (errorResult.error_message == '') {
                        errorResult.error_message = '接口获取失败'
                    }
                    reject(errorResult)
                }
            })
        })
    },
// 加了参数过滤和权限判断的get
    getJSON(url, parameter, isAddToken, isAddRandom) {
        // param是过滤处理后的parameter
        return this.mixParam(parameter, isAddRandom).then(param => {
            return this.getRequest(url, param);
        }).then(response => {
            return this.checkResponse(response);
        })
    },
// 纯净的post
    postRequest(url, parameter) {
        return new Promise((resolve, reject) => {
            if (config.isDebug) {
                let reqId = new Date().getTime()
                console.log('reqId:' + reqId + ';url:' + url)
                console.log('reqId:' + reqId + ';param:' + JSON.stringify(parameter))
            }
            $.ajax({
                type: 'POST',
                url: url,
                data: parameter,
                timeout: 30 * 1000,
                traditional: true,
                cache: false,
                success(data, status, xhr) {
                    if (config.isDebug) {
                        console.log(data);
                        console.log(xhr.responseText);
                    }
                    resolve(xhr.responseText);
                },
                // type: "timeout", "error", "abort", "parsererror"
                error: (xhr, type, error) => {
                    if (config.isDebug) {
                        console.log(xhr.responseText);
                    }
                    let errorResult = this.parseErrorResult(url, xhr, type, error);
                    reject(errorResult);
                }
            });
        })
    }
    ,
// 加了参数过滤和权限判断的post
    postJSON(url, parameter, isAddToken, isAddRandom) {
        // param是过滤处理后的parameter
        return this.mixParam(parameter, isAddRandom).then(param => {
            return this.postRequest(url, param);
        }).then(response => {
            return this.checkResponse(response);
        });
    }
    ,
    /**
     * 检测返回的结果
     * resp.error_response是接口技术异常返回 resp.success是业务返回
     */
    checkResponse(response) {
        return new Promise((resolve, reject) => {
            try {
                var respObj = typeof response == "object" ? response : JSON.parse(response);
//					if(config.isDebug) console.log(JSON.stringify(respObj.data||respObj.datalist));
                if (respObj.error_response == undefined) {
                    // 正常结果
                    if (respObj == 'true') {
                        resolve(true);
                    } else if (respObj == 'false') {
                        reject(false);
                    } else if (respObj.success != undefined && !respObj.success) {
                        reject(respObj);
                    } else {
                        resolve(respObj);
                    }
                } else {
                    // 异常结果
                    if (console.isDebug) {
                        console.log(respObj.error_response.code + ':' + respObj.error_response.msg);
                    }
                    // 异常结果
                    var errorResult = {
                        success: false,
                        data: '',
                        error_code: respObj.error_response.code,
                        error_name: '',
                        error_message: respObj.error_response.msg
                    };
                    reject(errorResult);
                }
            } catch (error) {
                if (console.isDebug) {
                    console.log('json parse error:' + error.message);
                    console.log('response:' + response);
                }
                reject({
                    success: false,
                    data: '',
                    error_code: 99999,
                    error_name: '',
                    error_message: '系统错误，响应的格式异常！'
                });
            }
        })
    }
    ,

    /**
     *
     * @param type get post
     * @param method
     * @param parameter
     * @param isAddRandom
     * @returns {PromiseLike<T>}
     */
    baseApi(type, method, parameter, isAddRandom) {
        parameter = parameter || {};
        let url = config.api.service + method;
        if (method.startsWith('wbm.')) {
            url = config.api.api;
            parameter.method = method;
        }

        // param是过滤处理后的parameter
        return this.mixParam(parameter, isAddRandom).then(param => {
            if (type === 'get') {
                return this.getRequest(url, param);
            } else {
                return this.postRequest(url, param);
            }
        }).then(this.checkResponse);
    },
    api(method, parameter, isAddRandom) {
        return this.getApi(method, parameter, isAddRandom);
    },
    getApi(method, parameter, isAddRandom) {
        return this.baseApi('get', method, parameter, isAddRandom);
    },
    postApi(method, parameter, isAddRandom) {
        return this.baseApi('post', method, parameter, isAddRandom);
    }
}
