//讲回调函数写法改成promise
import {
  config
} from '../config.js';
class Http {
  request(url, method = 'GET') {
    return new Promise((resolve,reject)=>{
      this._request(url, resolve, reject, method)
    })
  }
  _request(url,resolve, reject,method='GET') {
    const str = url.substring(1, 3);
    if (str == 'v2') {
      var url = config.appBase01 + url;
    } else {
      var url = config.appBase02 + url;
    };

    if (!method) {
      method = "GET";
    }
    console.log(url);
    wx.request({
      url: url,
      method: method,
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        const code = res.statusCode.toString();
        if (code.startsWith('4')) {
          reject(res.data)
        } else {
          resolve(res.data);
        }

      },
      fail: error => {reject()}
    })
  }
}



module.exports = {
  Http: Http,
}