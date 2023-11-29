const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('mydb1.db');

//데이터 테이블 생성
db.run(`CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
    )`);

//데이터 삽입
const msg1 = ['Hello'];
db.run(`INSERT INTO greetings (message) Values (?)`, msg1,
    function(err) {
        if (err) {
            console.error('데이터 삽입 실패', err);
            return;
        }
        console.log('데이터 추가 성공', this.lastID);
    }
);

//데이터 조회
db.each('Select * from greetings', (err, row) => {
    if(err) {
        console.error('쿼리실패');
        return;
    }
    console.log('Greeting:', row.message);
});

//데이터베이스 연결 종료
db.close();