const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const app = express();
const port = 3001;
const dbFile = 'mydb1.db';

const db = new sqlite3.Database(dbFile);

//db 초기화 함수
function init_database() {
    const sql = fs.readFileSync('init_database.sql');
};

init_database();

//서버 URL
app.get('/:table', (req, res) => {
    //db로부터 특정 테이블 조회 코드 작성
});

//express 서버 시작
app.listen(port, () => {
    console.log(`${port} 서버 시작합니다.`);
});