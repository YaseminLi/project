import jsonp from 'common/js/jsonp.js';
import { commonParams ,options} from 'api/config.js';
// import axios from 'axios';

// export function getSinger() {
//     const url = '/api/getSinger';
//     const data = Object.assign({}, commonParams, {
//         g_tk: 1433327100,
//         loginUin: 2608438541,
//         hostUin: 0,
//         format: 'json',
//         platform: 'yqq.json',
//         needNewCode: 0,
//         data: { "comm": { "ct": 24, "cv": 0 }, "singerList": { "module": "Music.SingerListServer", "method": "get_singer_list", "param": { "area": -100, "sex": -100, "genre": -100, "index": -100, "sin": 0, "cur_page": 1 } } }
//     });
//     return axios.get(url, {
//         params: data
//     }).then((res) => {
//         return Promise.resolve(res.data)
//     })

// }


export function getSinger() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq'
    })
    return jsonp(url, data, options)
}

