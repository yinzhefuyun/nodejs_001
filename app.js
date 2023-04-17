const express = require('express');
const { readDir, sendImg } = require('./js/file');
const { readFileSync } = require("fs");
const { json } = require('body-parser');
// const open = require('open');
const app = express();
const config = JSON.parse(readFileSync('./js/config.json', 'utf-8'));

// 使用 config.port 变量代替硬编码端口号
const port = config.port;

app.use(json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/getImgList', readDir);

// 简化代码，直接使用 sendFile() 方法
app.get('/img/:name', sendImg);

app.listen(port, () => {
    console.log(`${new Date()} Server running at http://localhost:${port}`);
    // open(`http://localhost:${port}`).then(() => {});
});