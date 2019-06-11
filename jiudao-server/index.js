const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();
app.use(bodyParser.json())
const port = 3000;
const classicData = require('./classic/classic');
const classicFavor = require('./classic/favor');
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
//获取最新一期
app.get('/classic/latest', function (req, res) {
   classicData.sort((a, b) => (b.index - a.index));
   res.send(classicData[0]);
})
//获取当前一期的下一期
app.get('/classic/:index/next', function (req, res) {
   const index = +req.params.index + 1;
   res.send(classicData.find((e) => e.index == index));
})
//获取当前一期的上一期
app.get('/classic/:index/previous', function (req, res) {
   const index = +req.params.index - 1;
   res.send(classicData.find((e) => e.index == index));
})

//获取喜欢的期刊
app.get('/classic/favor', function (req, res) {
   res.send(classicFavor);
})

//进行点赞
app.post('/like', urlencodedParser, function (req, res) {
   const request = req.body.index;
   console.log(request);

   const a = classicData.find((e) => e.index == request);
   console.log(a);
   a.like_status=1;
   a.fav_nums++;
   console.log(a);
   console.log(classicData);
   res.send('like post success');

})
//访问静态资源文件-图片
app.use('/images', express.static('images'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))