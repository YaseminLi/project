import jsonp from 'common/js/jsonp.js';
import { commonParams, options } from 'api/config.js';
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uni:0,
        needNewCode:1
    })
    return jsonp(url,data,options)
}

export function getDiscList(){

}