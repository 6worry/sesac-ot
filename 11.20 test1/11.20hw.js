const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 3003;

nunjucks.configure('views hw', {
    express: app
});

app.set('view engine', 'html');

app.get('/', (req, res) => {
    const data = []; // 읽은 데이터를 담을 곳
    fs.readFileSync('user.csv', {encoding: 'utf-8'})
   
    // === 파일 읽기
    res.render('index', { data });
});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});
