const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('mydb4.db');

//데이터 테이블 생성
function createTable(){
    return new Promise((resolve, reject) => {
        //지연처리되는 코드를 작성할 수 있는 것
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT
        )`, (err) => {
            if (err){
                reject(err);
            } else{
                resolve();
            }
        }
    );

    })
}

    //데이터 삽입)(CREATE)
    function insertUser(newUser){
        return new Promise((resolve, reject) =>  {
    
            db.run('INSERT INTO users (username, email)Values (?, ?)',
            [newUser.username, newUser.email], function(err){
        if (err) {
            console.error('데이터 삽입 실패');
            reject(err);
        } else{
        console.log('데이터 삽입 성공:', this.lastID)
        resolve();
        }
    });
        })
    }

//데이터 수정 (UPDATE)
function updateUser(updateUser) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE users SET username=?, email=? WHERE id=?',
            [updateUser.username, updateUser.email, updateUser.id], (err) => {
                if (err) {
                    console.error('수정 실패', err);
                    reject(err);
                } else{
                console.log('수정 성공');
                resolve();
                }
            }
        );
    })
}

//데이터 삭제(DELETE)
function deleteUser(delUser) {
    return new Promise((resolve, reject) => {
db.run('DELETE FROM users WHERE id=?', [delUser.id], (err) => {
    if(err) {
        console.error('삭제 실패');
        reject(err);
    } else{
    console.log('삭제 성공');
    resolve();
}
}
);
})
}

//데이터 조회 (Read)
function readUser() {
    return new Promise((resolve, reject) => {
        db.each('SELECT * FROM users', (err, row) => {
        if(err) {
        console.error('쿼리실패');
        reject(err);
    } else {
        console.log('All Users:', row);
        resolve();
    }
    });
    })
}

async function main(){
    await createTable();
    const newUserA = {username: '6worry', email: '6worry.sesac.co.kr'};
    const newUserB = {username: '6worry2', email: '6worry2.sesac.co.kr'};
    await insertUser(newUserA);
    await insertUser(newUserB);
    const changeUser = {
        id: 3,
        username: '6worry321',
        email: '6worry321.sesac.co.kr'
    }
    await updateUser(changeUser);
    const delUser = {id: 6};
    const delUser2 = {id: 7};
    await deleteUser(delUser);
    await deleteUser(delUser2);
    await readUser();
    //데이터베이스 연결 종료
    db.close();
};

main();