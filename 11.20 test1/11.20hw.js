const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 3003;

nunjucks.configure('views hw', {
    express: app,
    autoescape: true
});

app.set('view engine', 'html');

app.get('/', (req, res) => {
    const data = []; // 읽은 데이터를 담을 곳
    const header = [];
    fs.createReadStream('data.csv', {encoding: 'utf-8'})
    .pipe(csv())
    .on('headers', (headers) => {
        header.push(...headers)
        console.log(header)
    })
    .on('data', (row) => {
        data.push(row);
    })
    .on('end', () => {
        res.render('index', {data: data, headers: header});
    })
    .on('error', (err) => {
        
    })
    // === 파일 읽기
});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});
