const path = require('path');
const bodyParser = require('body-parser')
const axios = require('axios');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('base', resolve('src/base'))

    },
    devServer: {
        before(app) {
            app.get('/api/getDiscList', function (req, res) {
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
                axios.get(url, {
                    headers: {
                        referer: 'https://y.qq.com/portal/playlist.html',
                        // host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e);
                })
            }),
                app.get('/api/getSingerDetail', function (req, res) {
                    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
                    axios.get(url, {
                        headers: {
                            referer: `https://y.qq.com/n/yqq/singer/${req.query.myid}.html`,
                        },
                        params: req.query
                    }).then((response) => {
                        res.json(response.data)
                    }).catch((e) => {
                        console.log(e);
                    })
                }),
                app.post('/api/getPurlUrl', bodyParser.json(), function (req, res) {
                    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
                    axios.post(url, req.body, {
                        headers: {
                            referer: 'https://y.qq.com/',
                            origin: 'https://y.qq.com',
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response) => {
                        res.json (response.data)
                    }).catch(e => {
                        console.log(e);

                    })
                })
        }
    }
}
