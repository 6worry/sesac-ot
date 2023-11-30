const sqlite = require('better-sqlite3');
// const db = sqlite('mydb1.db');
const db = sqlite(':memory:');

//데이터 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`);

// 사용자 조회
const allUsers = db.prepare('SELECT * FROM users').all();
console.log('모든 사용자:', allUsers);

// 사용자 추가
const newUser = {
    username: '6worry', email: '6worry@gmail.com'
}

const insert = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');
const insertResult = insert.run(newUser.username, newUser.email);

console.log('추가된 사용자:', insertResult.lastInsertRowid);

// 특정사용자 조회
const userid = 1;
const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);

console.log(`${userid}: ${user.username}`);

// 사용자 갱신
const updateUser = {
    username: '6worry4321', email: '6worry4321@gmail.com'
};

const update = db.prepare('UPDATE users SET username = ?, email = ? WHERE id = ?');

update.run(updateUser.username, updateUser.email, updateUser.id);

console.log('업뎃 성공');

// 사용자 삭제
const deleteUser = { id: 1 };
const deleteQuery = db.prepare('DELETE FROM users WHERE id = ?');

deleteQuery.run(deleteUser.id);

console.log('삭제 성공');

// 데이터 연결 종료
db.close();