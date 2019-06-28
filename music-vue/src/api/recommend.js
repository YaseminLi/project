import jsonp from 'common/js/jsonp.js';
import { commonParams, options } from 'api/config.js';
import axios from 'axios';
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uni: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}
export function getDiscList() {
    // 线上环境地址，同学们根据自己的需要配置修改
    const url = '/api/getDiscList';
    const data = Object.assign({}, commonParams, {
        picmid: 1,
        g_tk: 1433327100,
        loginUin: 2608438541,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 19,
        rnd: Math.random()
    });
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })

}       
