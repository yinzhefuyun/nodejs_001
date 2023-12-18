const express = require('express');
const { readDir, sendImg } = require('./js/file');
const { readFileSync } = require("fs");
const { json } = require('body-parser');
const app = express();
const opn = require('opn');
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
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    console.log(`Server running at http://localhost:${port}`);
    opn(`http://localhost:${port}`).then(() => {});
});
