import {config} from'../config.js';
class Http{
  request(params){
    var str = params.url.substring(1, 3);
    if(str=='v2'){
      var url =config.appBase01 + params.url;
    }else{
      var url =config.appBase02 + params.url;
    };

    if(!params.method){
      params.method="GET";
    }
    wx.request({
      url: url,
      method: params.method,
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        let code = res.statusCode.toString();
        if(code.startsWith('4')){
          console.log("error:"+code)
        }else{
          params.success(res);
        }
        
      },
      fail: function (error) {
        console.log(error)
      }
    })
  }
}

function convertToStars(stars){
  var starsArray = [];
  var starsNum = stars.toString().substring(0, 1);
  for (var i = 0; i < 5; i++) {
    starsArray[i] = (i < starsNum ? 1 : 0);
  };
  return starsArray;
}
function convertToCastString(array){
  var string='';
  for(var idx in array){
    string=string+array[idx].name+'/';
  }
  return string.substring(0, string.length - 1);
}
function convertToCastInfos(casts){
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}
module.exports = {
  Http: Http,
  convertToStars: convertToStars,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
