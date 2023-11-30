const sqlite = require('better-sqlite3');
// const db = sqlite('mydb1.db');
const db = sqlite(':memory:');

//데이터 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
    )`);

//데이터 삽입
const msg1 = ['Hello'];
const insert = db.prepare(`INSERT INTO greetings (message) Values (?)`);
const result = insert.run(msg1); // 해당 구문에 대한 인자를 가져와 실행

console.log('데이터 추가 성공', result.lastInsertRowid);

//데이터 조회
const read = db.prepare('Select * from greetings');
const greetings = read.all(); // 결과 가져옴

greetings.forEach((row) => {
    console.log('Greeting:', row.message);
});

//데이터베이스 연결 종료
db.close();