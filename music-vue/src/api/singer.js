import jsonp from 'common/js/jsonp.js';
import { commonParams, options } from 'api/config.js';
import axios from 'axios';

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
export function getSingerDetail(singer){
  const url = '/api/getSingerDetail';
  const data = Object.assign({}, commonParams, {
    notice: 0,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 10,
    begin: 0,
    singerid: singer.id,
    singermid: singer.mid,
  });
  return axios.get(url, {
    params: data
  }).then((res) => { 
    return Promise.resolve(res.data)
  })
}
// export function getSingerDetail(id) {
//   const url = '/api/getSingerDetail';
//   const data = Object.assign({}, commonParams, {
//     myid: id,
//     hostUin: 0,
//     platform: 'yqq.json',
//     needNewCode: 0,
//     g_tk: 1433327100,
//     loginUin: 2608438541,
//     notice: 0,
//     data: {"comm":{"ct":24,"cv":0},"singer":{"method":"get_singer_detail_info","param":{"sort":5,"singermid":id,"sin":0,"num":10},"module":"music.web_singer_info_svr"}}
//   });
//   return axios.get(url, {
//     params: data
//   }).then((res) => { 
//     return Promise.resolve(res.data)
//   })

// }
