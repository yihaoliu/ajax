

const jsonParse = (res) => {
  return res.json();
}
const Qs = (param) => {
  var bodyParams = [];
  for (var p in param) {
    bodyParams.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p]));
  }
  return bodyParams.join('&');
}
const ajax = (method, url, params, config) => {
  let contentType = 'application/json; charset=utf-8';
  let body = '';
  method = method.toLowerCase();
  if (config && config[headers] && config[headers]['Content-Type']) {
    contentType = config[headers]['Content-Type'];
  }
  if ('post,put'.indexOf(method) != -1) {
    if(contentType.indexOf('application/json')!=-1){
      body = JSON.stringify(params);
    }else if(contentType.indexOf('application/x-www-form-urlencoded')!=-1){
      body = Qs(params);
    }else{
      body = JSON.stringify(params);
    }
    
  } else { //现在我们的后台 delete 是url传输
    url = url+'?'+Qs(params);
  }

  return new Promise((resolve, reject) => {
    featch(url, Object.assign({
      method: method,
      headers: {
        'Accept': '*',
        'Content-Type': contentType
      },
      mode: 'cors',//是否允许跨域
      credentials: 'include',//是否携带cookie
      body,
    }, config))
      .then(jsonParse)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  })
}
export default {
  get: (url, params, config) => {
    return ajax('get', url, params, config)
  },
  post: (url, params, config) => {
    return ajax('post', url, params, config)
  }
}