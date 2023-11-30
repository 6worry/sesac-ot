const Database = require('./final_database2');

async function main() {
     db= new Database('mydb4.db');
    //  db= new Database(':memory:');
    try{
        await db.createTable();
        const newUserA = {username: '6worry', email: '6worry.sesac.co.kr'};
        const newUserB = {username: '6worry2', email: '6worry2.sesac.co.kr'};
        
        await db.insertUser(newUserA);
        await db.insertUser(newUserB);
        
        const changeUser = {
            id: 3,
            username: '6worry321',
            email: '6worry321.sesac.co.kr'
        };
        
        await db.updateUser(changeUser);
        
        const delUser = {id: 6};
        const delUser2 = {id: 7};
        
        await db.deleteUser(delUser);
        await db.deleteUser(delUser2);
        
        await db.readUser();
    } catch (err) {
        console.error('오류오류:', err);
    } finally {        
        //데이터베이스 연결 종료
        db.close();
    };
};

main();