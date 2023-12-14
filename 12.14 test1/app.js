const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3008;

nunjucks.configure('views', {
    express: app
});

app.set('view engine', 'html');

app.get('/', (req, res) => {
    // 1. db 접속
    // 2. db 쿼리문
    // monthly reveue 쿼리로 테이블 그리기
    res.render('monthly_revenue', {rows: rows});
    // 3. db 접속 종료
});

app.listen(port, () => {
    console.log(`${port} 준비 완료`);
});