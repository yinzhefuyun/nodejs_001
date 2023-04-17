const fs = require('fs');
const path = require('path');
const express = require('express');

// 读取配置文件
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));

const app = express();

// 声明路由处理函数
function sendImg(req, res) {
    res.sendFile(path.join(config.dir, req.params.name));
}

function readDir(req, res) {
    fs.readdir(config.dir, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        console.log(files);
        const fileNames = files.filter((fileName) => {
            const filePath = path.join(config.dir, fileName);
            const stats = fs.statSync(filePath);
            if (req.body.name != null && req.body.name !== "" && req.body.name !== undefined) {
                if (fileName.includes(req.body.name)) {
                    return stats.isFile();
                }
            } else {
                return stats.isFile();
            }

        });

        console.log('所有类型为文件（不是文件夹）的文件名：', fileNames);
        const jsonResponse = JSON.stringify(fileNames);
        res.setHeader('Content-Type', 'application/json');
        res.end(jsonResponse);
    });
}

// 导出模块
module.exports = {
    sendImg,
    readDir
};