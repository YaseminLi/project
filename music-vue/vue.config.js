const path = require('path');
const axios=require('axios');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('base', resolve('src/base'))

    },
    devServer:{
        before(app){
            app.get('/api/getDiscList',function(req,res){
                const url='https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
                axios.get(url,{
                    headers:{
                        referer: 'https://y.qq.com/portal/playlist.html',
                        // host: 'c.y.qq.com'
                    },
                    params:req.query
                }).then((response)=>{
                    res.json(response.data)
                }).catch((e)=>{
                    console.log(e);
                })
            }),
            app.get('/api/getSinger',function(req,res){
                const url='https://u.y.qq.com/cgi-bin/musicu.fcg';
                axios.get(url,{
                    headers:{
                        referer: 'https://y.qq.com/portal/singer_list.html',
                    },
                    params:req.query
                }).then((response)=>{
                    res.json(response.data)
                }).catch((e)=>{
                    console.log(e);
                })
            })
        }
    }
}
