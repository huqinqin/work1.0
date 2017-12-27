import Config from 'config'
import db from './DBHelper'
import Strings from 'string'
import $ from 'jquery'

export default {
  httpStatusCodeMap: {
    100: {name: 'CONTINUE', cname: ''},
    101: {name: 'SWITCHING_PROTOCOLS', cname: ''},
    102: {name: 'PROCESSING', cname: ''},

    200: {name: 'OK', cname: ''},
    201: {name: 'CREATED', cname: ''},
    202: {name: 'ACCEPTED', cname: ''},
    203: {name: 'NON_AUTHORITATIVE_INFORMATION', cname: ''},
    204: {name: 'NO_CONTENT', cname: '服务器成功处理了请求，但不需要返回任何实体内容'},
    205: {name: 'RESET_CONTENT', cname: ''},
    206: {name: 'PARTIAL_CONTENT', cname: ''},
    207: {name: 'MULTI_STATUS', cname: ''},

    300: {name: 'MULTIPLE_CHOICES', cname: ''},
    301: {name: 'MOVED_PERMANENTLY', cname: ''},
    302: {name: 'MOVED_TEMPORARILY', cname: ''},
    303: {name: 'SEE_OTHER', cname: ''},
    304: {name: 'NOT_MODIFIED', cname: ''},
    305: {name: 'USE_PROXY', cname: ''},
    307: {name: 'TEMPORARY_REDIRECT', cname: ''},

    400: {name: 'BAD_REQUEST', cname: '错误的请求'},
    401: {name: 'UNAUTHORIZED', cname: ''},
    402: {name: 'PAYMENT_REQUIRED', cname: ''},
    403: {name: 'FORBIDDEN', cname: ''},
    404: {name: 'NOT_FOUND', cname: ''},
    405: {name: 'METHOD_NOT_ALLOWED', cname: ''},
    406: {name: 'NOT_ACCEPTABLE', cname: '无权限'},
    407: {name: 'PROXY_AUTHENTICATION_REQUIRED', cname: ''},
    408: {name: 'REQUEST_TIMEOUT', cname: ''},
    409: {name: 'CONFLICT', cname: ''},
    410: {name: 'GONE', cname: ''},
    411: {name: 'LENGTH_REQUIRED', cname: ''},
    412: {name: 'PRECONDITION_FAILED', cname: ''},
    413: {name: 'REQUEST_ENTITY_TOO_LARGE', cname: ''},
    414: {name: 'REQUEST_URI_TOO_LONG', cname: ''},
    415: {name: 'UNSUPPORTED_MEDIA_TYPE', cname: ''},
    416: {name: 'REQUESTED_RANGE_NOT_SATISFIABLE', cname: ''},
    417: {name: 'EXPECTATION_FAILED', cname: ''},
    422: {name: 'UNPROCESSABLE_ENTITY', cname: ''},
    423: {name: 'LOCKED', cname: ''},
    424: {name: 'FAILED_DEPENDENCY', cname: ''},

    500: {name: 'INTERNAL_SERVER_ERROR', cname: '服务器内部错误'},
    501: {name: 'NOT_IMPLEMENTED', cname: ''},
    502: {name: 'BAD_GATEWAY', cname: '网关异常'},
    503: {name: 'SERVICE_UNAVAILABLE', cname: ''},
    504: {name: 'GATEWAY_TIMEOUT', cname: ''},
    505: {name: 'HTTP_VERSION_NOT_SUPPORTED', cname: ''},
    507: {name: 'INSUFFICIENT_STORAGE', cname: ''}
  },
  /**
   * 给请求的参数自动加session和随机数
   */
  mixParam(param, isAddRandom) {
    param = param == null || param == undefined ? {} : param;
    isAddRandom = isAddRandom == null || isAddRandom == undefined ? true : isAddRandom;

    if (isAddRandom) param.r = new Date().getTime();
    return new Promise((resolve, reject) => {
        if (Config.isUseMock) {
          resolve(param);
        } else {
          if (param.session == undefined || Strings(param.session).isEmpty()) {
              param.session = db.getItem(Config.sessIdName);
              resolve(param);
          } else {
            resolve(param);
          }
        }
      }
    )
  },
  parseErrorResult(url, xhr, type, error) {
    var errorResult = {
      success: false,
      data: xhr.responseText,
      errorCode: 0,
      errorName: type,
      errorMessage: ''
    };
    switch (type) {
      case 'timeout':
        errorResult.errorCode = 9001;
        errorResult.errorMessage = '请求超时';
        break;
      case 'error':
        // BOP封装了下面3个httpStatusCode
        if (url.indexOf('api.500mi.com') > 0 && (xhr.status == 400 || xhr.status == 406 || xhr.status == 500)) {
          return xhr.responseText;
        }
        errorResult.errorCode = xhr.status;
        errorResult.errorMessage = error;
        break;
      case 'abort':
        errorResult.errorCode = 9003;
        errorResult.errorMessage = '请求中断,请检查网络是否连接';
        break;
      case 'parseerror':
        errorResult.errorCode = 9004;
        errorResult.errorMessage = '返回的数据解析失败';
        break;
      default:
        errorResult.errorCode = 9005;
        errorResult.errorMessage = '请求异常';
    }
    return errorResult;
  }
  ,
// 纯净的的get
  getRequest(url, parameter) {
    return new Promise((resolve, reject) => {
      if (Config.isDebug) {
        var reqId = new Date().getTime();
        console.log('reqId:' + reqId + ';url:' + url);
        console.log('reqId:' + reqId + ';param:' + JSON.stringify(parameter));
      }
      // mock
      if (Config.isUseMock) url = this.getMockUrl(url);
      $.ajax({
        type: 'GET',
        url: url,
        data: parameter,
        timeout: 5 * 1000,
        cache: false,
        // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
        success(data, status, xhr) {
          if (Config.isDebug) {
            console.log(data);
            console.log(xhr.responseText);
          }
          resolve(xhr.responseText);
        },
        // type: "timeout", "error", "abort", "parsererror"
        error: (xhr, type, error) => {
          if (Config.isDebug) {
            console.log(xhr);
          }
          if (type == 'error' && xhr.responseText) {
            let text = JSON.parse(xhr.responseText);
          }
          let errorResult = this.parseErrorResult(url, xhr, type, error);
          if (Config.isDebug && errorResult) {
            console.log(errorResult);
          }
          if(errorResult.errorMessage == '') {
            errorResult.errorMessage = '接口获取失败'
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
      if (Config.isDebug) {
        let reqId = new Date().getTime()
        console.log('reqId:' + reqId + ';url:' + url)
        console.log('reqId:' + reqId + ';param:' + JSON.stringify(parameter))
      }
      // mock
      if (Config.isUseMock) url = this.getMockUrl(url)
      $.ajax({
        type: 'POST',
        url: url,
        data: parameter,
        timeout: 30 * 1000,
        traditional: true,
        cache: false,
        success(data, status, xhr) {
          if (Config.isDebug) {
            console.log(data);
            console.log(xhr.responseText);
          }
          resolve(xhr.responseText);
        },
        // type: "timeout", "error", "abort", "parsererror"
        error: (xhr, type, error) => {
          if (Config.isDebug) {
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
//					if(Config.isDebug) console.log(JSON.stringify(respObj.data||respObj.datalist));
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
            errorCode: respObj.error_response.code,
            errorName: '',
            errorMessage: respObj.error_response.msg
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
          errorCode: 99999,
          errorName: '',
          errorMessage: '系统错误，响应的格式异常！'
        });
      }
    })
  }
  ,

  /* 以下为根据api请求的方法 */
  baseApi(url, method, parameter, isAddRandom) {
    parameter = parameter || {};
    parameter.method = 'wbm.' + method;
    parameter.app_key = '00000-500mi';
    parameter.style = 'underline'
    parameter.format = parameter.format ? parameter.format : 'jsonOnly';
    // param是过滤处理后的parameter
    return this.mixParam(parameter, isAddRandom).then(param => {
      return this.getRequest(url, param);
    }).then(this.checkResponse);
  }
  ,
  tpApi(method, parameter, isAddRandom) {
    console.log('Request：' + JSON.stringify(parameter));
    method = 'tp.' + method;
    return this.baseApi(Config.api.tp, method, parameter, isAddRandom);
  }
  ,

  wbmApi(method, parameter, isAddRandom) {
    return this.getRequest(Config.api.wbm + method, parameter);
    // return this.baseApi(Config.api.wbm, method, parameter, isAddRandom);
  }
  ,
  tpPostApi(method, parameter, isAddRandom) {
    method = 'tp.' + method;
    return this.postBaseApi(Config.api.tp, method, parameter, isAddRandom);
  }
  ,
}
