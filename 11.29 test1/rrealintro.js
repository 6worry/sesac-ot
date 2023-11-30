const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const app = express();
const port = 3001;
// const dbFile = 'mydb5.db';
const dbFile = ':memory:';

const db = new sqlite3.Database(dbFile);

const sql = fs.readFileSync('init_database.sql', 'utf-8');

// //db 초기화 함수
async function init_database() {
    await createTable()
    await insertTable()
};

function createTable() {
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            };
        });
    });
};

function insertTable() {
    return new Promise((resolve, reject) => {
        db.prepare(sql, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            };
        });
    });
};

init_database();


// function createTable() {
//         db.exec(sql, (err) => {
//             if (err) {
//             } else {
//             };
//         });

// }

// createTable();

//서버 URL
app.get('/:table', (req, res) => {
    //db로부터 특정 테이블 조회 코드 작성
    const db_table = req.params.table;
    const query = `SELECT * FROM ${db_table}`;

    db.all(query, (err, rows) => {
        res.json(rows);
    });
});

app.get('/:table/:id', (req, res) => {
    //db로부터 특정 테이블 조회 코드 작성
    const db_table = req.params.table;
    const table_id = req.params.id;
    // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
    const query = `SELECT * FROM ${db_table} WHERE id = ?`;
    
    db.get(query, [table_id], (err, row) => {
        res.json(row);
    });
});

//express 서버 시작
app.listen(port, () => {
    console.log(`${port} 서버 시작합니다.`);
});