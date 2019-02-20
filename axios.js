/**
 * axios 基于 promise 的 xhr 封装所以 axios 接收 xhr 的参数
 * 并且 axios.interceptors.request.use 拦截器可在请求或者返回被 then 或者 catch 处理之前对它们进行拦截
 */
import axios from "axios";
import APIS from "api/index";
import Qs from "qs";
import { Message } from 'iview';

// 获取参数类型
const toType = obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
const HOST = process.env.HOST;

// 配置默认
axios.defaults = Object.assign(axios.defaults, {
  //正式环境和开发测试域名区分 
  baseURL:`//${HOST === 'prod' ? 'api' : HOST}.novoiot.com`,
  timeout: 10000, //超时
  withCredentials: true ,// 跨域请求是否提供凭据信息
  // 该属性为 fetch 的允许跨域属性
  // mode: 'cors'
})
// http请求拦截器
axios.interceptors.request.use(config => {
  const headers =config.headers
  // 获取请求类型并转化成小写
  const method = config.method.toLowerCase();
  let contentType ='application/x-www-form-urlencoded;charset=utf-8';   // 请求返回的参数类型
  if(headers['Content-type']){
    contentType = headers['Content-type']
  }
  if (contentType.indexOf('application/x-www-form-urlencoded') != -1) {
    if('put,post'.indexOf(method)!=-1){
      //post请求参数用&拼接
      config.data = Qs.stringify(config.data); 
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(response =>{
  return response
},error => {
  return Promise.reject(error)
})


// 参数过滤函数
function filterNull(o) {

  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}

// 登录判断
function checkLogin(res, reject) {
  if (res && res.status && res.status >= 400) {
    const resData = res.data || {};
    if (resData.code && resData.code == 'NON_LOGIN') {

      //跳转到登录页面 并记录当前页面地址
      const redirectUrl = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/login?ROUT=${redirectUrl}`;

    } else {
      Message.warning({
        content: resData.msg || '后台出错，请稍后重试',
        duration: 2
      });
      reject(res)
    }
  }
  return res;
}


// 错误信息批量处理
function errorFormat(error, reject, callback) {
  if (error.code === 'ECONNABORTED') {
    Message.warning('请求超时，请稍后再试');
  } else if (error.response) {
    checkLogin(error.response, reject);
  }
  if (error && error.response && error.response.data) {
    error = error.response;
    callback && callback(error);
  }
}
// 请求处理批量处理
function requestformat(method, url, params, config, callback) {
  return new Promise((resolve, reject) => {
    let allParams = {
      url: APIS[url].url,
      method,
      config,
    };
    let headers = {};
    if (!APIS[url].url) {
      return;
    }
   
    // params空参数或者null, undefined 过滤
    params = params ? filterNull(params) : {}
    // 初始化 config
    if (config && config['headers']) {
      headers = config['headers'];
      delete config['headers'];
      allParams.headers = headers;
     
    }
    if('get,delete'.indexOf(method)!=-1 ){
      params.dateTime = new Date().getTime();
      allParams.params = params;
    }else{
      
      allParams.data = params;
    }
    axios(allParams).then(function (response) {
      resolve(response);
      callback && callback(response)
    }).catch(function (error) {
      errorFormat(error, reject, callback)
    });
  });
}


export default {
  get: (url, params, config, callback) => {
    return requestformat('get', url, params, config, callback)
  },
  post: (url, params, config, callback) => {
    return requestformat('post', url, params, config, callback)
  },
  put: (url, params, config = {}, callback) => {
    return requestformat('put', url, params, config, callback)
  },
  delete: (url, params, config, callback) => {
    return requestformat('delete', url, params, config, callback)
  },
};
