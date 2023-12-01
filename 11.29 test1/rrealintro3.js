const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const app = express();
const port = 3001;
// const dbFile = 'mydb5.db';
const dbFile = ':memory:';

const db = new sqlite3.Database(dbFile);

app.use(express.json()); // body 안에 있는 
app.use(express.urlencoded({extended: true})); // -d로 오는 

// //db 초기화 함수
function init_database() {
    return new Promise((resolve, reject) => {
        const sql = fs.readFileSync('init_database.sql', 'utf-8');
        
        db.exec(sql, (err) => {
            if (err) {
                if (err.errno == 19) {
                    console.warn('초기화 이미 했다.');
                    resolve();
                } else {
                    console.error('초기화 실패', err);
                    reject();
                };
            } else {
                // console.log('초기화 성공');
                resolve();
            }
        })
    });
};

//서버 URL
app.get('/users', (req, res) => {
    // const username = req.query.username;
    const { username } = req.query;
    let query;
    if (username) {
        query = `SELECT * FROM users WHERE username LIKE '%${username}%'`;
    } else {
        //db로부터 특정 테이블 조회 코드 작성
        query = `SELECT * FROM users`;
        //get 방식으로 username 받아와서 사용자 검색하기
        // 127.0.0.1:3001/users?username=user1
    }
        db.all(query, (err, rows) => {
            res.json(rows);
        });
});

//새로운 사용자 생성
app.post('/users', (req, res) => {
    const { username, password }= req.body;

    console.log(username, password);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)'

    db.run (query, [username, password], function (err){
        if (err) {
            console.error(err.message)
            res.status(500).send('오류!!!')
            return;
        }
        res.send('생성 완료')
    })

});
//사용자 정보 업데이트
app.put('/users/:id', (req, res) => {
    const userid = req.params.id;
    const { username, password } = req.body;

    console.log(username, password);

    db.run('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, password, userid], (err) => {

        if (err) {
            res.status(500).send('내부 오류')
            return;
        }
        res.send('갱신 완료')
    })
});
//사용자 삭제
app.delete('/users/:id', (req, res) => {
    const userid = req.params.id;

    db.run('DELETE FROM users WHERE id = ?', [userid], (err) => {

        if (err) {
            res.status(500).send('내부 오류')
            return;
        }
        res.send('삭제 완료')
    })
});


app.get('/users/:id', (req, res) => {
    //db로부터 특정 테이블 조회 코드 작성
    const users_id = req.params.id;
    // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
    const query = `SELECT * FROM users WHERE id = ?`;
    
    db.get(query, [users_id], (err, row) => {
        res.json(row);
    });
});

app.get('/products', (req, res) => {
    const { name, price } = req.query;
    
    //따옴표 삭제 함수
    function removeQuotes(value) {
        return value.replace(/["'"]/g, "");
    };

    function buildQuery() {
        let query = 'SELECT * FROM products';
        const condition = [];

        if(name){
            condition.push(`name LIKE '%${removeQuotes(name)}'`)
        }

        if(price){
            
            condition.push(`price = ${price}`)
        }

        if(condition.length > 0){
            query += `WHERE ${condition.join('AND')}`
        }
        return query;
    }
    const query = buildQuery();

        //get 방식으로 price 받아와서 name 검색하기
        
        // 127.0.0.1:3001/products?price=2000
        // 127.0.0.1:3001/products?name=product 1
        // 127.0.0.1:3001/products?price=2000 이면서 name=Product 1
        
        db.all(query, (err, rows) => {
            res.json(rows);
        });
});

app.get('/products/:id', (req, res) => {
    //db로부터 특정 테이블 조회 코드 작성
    const products_id = req.params.id;
    // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
    const query = `SELECT * FROM products WHERE id = ?`;
    
    db.get(query, [products_id], (err, row) => {
        res.json(row);
    });
});

app.get('/books', (req, res) => {
    const { name, price } = req.query;
    //db로부터 특정 테이블 조회 코드 작성
    query = `SELECT * FROM books`;

    if (name && price) {
        query = `SELECT * FROM products WHERE name LIKE '%${name}%' and price = ${price}`;
    } else if (name) {
        query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
    } else if (price) {
        query = `SELECT * FROM products WHERE price = ${price}`;
    } else {
        query = `SELECT * FROM products`;
    }

    db.all(query, (err, rows) => {
        res.json(rows);
    });
});

app.get('/books/:id', (req, res) => {
    const books_id = req.params.id;
    // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
    const query = `SELECT * FROM books WHERE id = ?`;
    
    db.get(query, [books_id], (err, row) => {
        res.json(row);
    });
});

//express 서버 시작
async function startServer() {
    try {
        await init_database();

        app.listen(port, () => {
            console.log(`${port} 서버 시작합니다.`);
        });
    } catch (err) {
        console.error(err);
    };
};

startServer();