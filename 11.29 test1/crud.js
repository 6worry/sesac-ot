const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('mydb2.db');

//데이터 테이블 생성
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
    )`);

    //데이터 삽입)(CREATE)
    const newUser = {username: '6worry', email: '6worry.sesac.co.kr'};
    db.run('INSERT INTO users (username, email)Values (?, ?)',
    [newUser.username, newUser.email], function(err){
        if (err) {
            console.error('데이터 삽입 실패');
            return;
        }
        console.log('데이터 삽입 성공:', this.lastID)
    });
    
//데이터 조회 (Read)
db.each('SELECT * FROM users', (err, row) =>    {
    if(err) {
        console.error('쿼리실패');
        return;
    }
    console.log('All Users:', row);
});

//데이터 수정 (UPDATE)
const updateUser = {
    id: 1,
    username: '6worry',
    email: '6worry.sesac.co.kr'
}
db.run('UPDATE users SET username=?, email=? WHERE id=?',
    [updateUser.username, updateUser.email, updateUser.id], (err) => {
        if (err) {
            console.error('수정 실패', err);
            return;
        }
        console.log('수정 성공');
    }
);

//데이터 삭제(DELETE)
const delUser = {
    id:3
};
db.run('DELETE FROM users WHERE id=?', [delUser.id], (err) => {
    if(err) {
        console.error('삭제 실패');
        return;
    }
    console.log('삭제 성공');
});

//데이터베이스 연결 종료
db.close();