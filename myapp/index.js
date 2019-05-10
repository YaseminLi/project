const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
    console.log("主页 GET 请求");
    res.send('Hello GET');
 })

 //访问静态资源文件
 app.use('/classic', express.static('classic'));
 app.use('/images', express.static('images'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))