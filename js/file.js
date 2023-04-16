const memoryCache = {};  // 内存缓存
const fs = require('fs');
const path = require('path');
const express = require('express');
// 读取配置文件
const config = JSON.parse(fs.readFileSync('./js/config.json', 'utf-8'));

const app = express();

function sendImg(req, res) {
    const imgPath = path.join(__dirname, 'images', req.query.name);
    if (memoryCache[req.query.name]) {   // 已在缓存,返回缓存数据
        res.send(memoryCache[req.query.name]);
    } else {    // 加载数据,缓存并返回
        fs.readFile(imgPath, (err, data) => {
            memoryCache[req.query.name] = data;
            res.contentType('image/jpg');
            res.send(data);
        });
    }
}

function readDir(req, res) {
    fs.readdir(config.dir, (err, files) => {
        if (err) throw err;
        console.log(files);
        for (const file of files) {
            console.log(file);
        }
        // 过滤出所有类型为文件（不是文件夹）的文件名
        const fileNames = files.filter((fileName) => {
            const filePath = config.dir + '/' + fileName;
            const stats = fs.statSync(filePath);
            if (req.body.name != null && req.body.name !== "" && req.body.name !== undefined) {
                if (fileName.includes(req.body.name)) {
                    return stats.isFile();
                }
            }else{
                return stats.isFile();
            }

        });

        // 打印所有符合条件的文件名
        console.log('所有类型为文件（不是文件夹）的文件名：', fileNames);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(fileNames));
    });
}

module.exports = {
    sendImg: sendImg,
    readDir: readDir
};