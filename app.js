const express = require('express');
const url = require('url');
const querystring = require('querystring');
const {readDir, sendImg} = require('./js/file');
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const config = JSON.parse(fs.readFileSync('./js/config.json', 'utf-8'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/getImgList', (req, res) => {
    readDir(req, res)
});

app.get('/img/:name', (req, res) => {
    const imageName = req.params.name;
    res.sendFile(config.dir + imageName);
});

app.listen(config.port, () => {
    console.log(new Date() + 'Server running at http://localhost:' + config.port);
});