const express = require('express');
const sqlite3 = require('sqlite3');
const nunjucks = require('nunjucks');

const dbFile = 'user.db';
const db = new sqlite3.Database(dbFile);

const app = express();
const port = 3003;

nunjucks.configure('views hw', {
    express: app,
    autoescape: true
});

app.set('view engine', 'html');
app.use(express.static("public"));
app.use(express.json());
app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const end = Date.now();
        const duration = end - start;
        console.log(`${duration}ms`);
    });

    next();
});

const data = []; // 읽은 데이터를 담을 곳
const header = [];

async function dbData(table) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(*) as total FROM ${table}`;
        db.get(sql, (err, row) => {
            if (err) {
                console.error('초기화 실패', err);
                reject();
            } else {
                // console.log('초기화 성공');
                resolve(row);
            }
        });
    });
};

// async function f1234(){
    
    // const itemsPerPage = 15;

    // page = req.query.page || 1;
    // const startIndex = (page -1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const { total } = await dbData()
    // const totalPages = Math.ceil(total / itemsPerPage);

    // const realdata = total.slice(startIndex, endIndex);
// }

async function startServer() {
    // await f1234()
    app.get('/', (req, res) => {
        const itemsPerPage = 15;

        page = req.query.page || 1;
        const startIndex = (page -1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const totalPages = Math.ceil(startIndex / itemsPerPage);
    
        const realdata = data.slice(startIndex, endIndex);
        const header = ["ID", "Name", "Gender", "Age", "Birthdate", "Address"]
        query = 'SELECT * FROM users'
        // res.render('index', {data: realdata, headers: header, pagebuttons: totalPages, page: parseInt(page)});
        db.all(query, (err, row) => {
            res.render('index', {data: row, headers: header});
        });

    });

    app.get('/users', (req, res) => {
        const { Name } = req.query;
        let query;
        if (Name) {
            query = `SELECT * FROM users WHERE Name LIKE '%${Name}%'`;
        } else {
            //db로부터 특정 테이블 조회 코드 작성
            query = `SELECT * FROM users`;
            //get 방식으로 username 받아와서 사용자 검색하기
            // 127.0.0.1:3001/users?username=user1
        }
        const header = ["ID", "Name", "Gender", "Age", "Birthdate", "Address"]
        db.all(query, (err, row) => {
            res.render('user', {data: row, headers: header});
        });
    });

    app.get('/stores', (req, res) => {
        const { Name } = req.query;
        let query;
        if (Name) {
            query = `SELECT * FROM stores WHERE Name LIKE '%${Name}%'`;
        } else {
            //db로부터 특정 테이블 조회 코드 작성
            query = `SELECT * FROM stores`;
            //get 방식으로 username 받아와서 사용자 검색하기
            // 127.0.0.1:3001/users?username=user1
        }
            const header = ["ID", "Name", "Type", "Address"]
        db.all(query, (err, row) => {
            res.render('store', {data: row, headers: header});
        });
    });

    app.get('/orders', (req, res) => {
        const { OrderAt } = req.query;
        let query;
        if (OrderAt) {
            query = `SELECT * FROM orders WHERE Name LIKE '%${OrderAt}%'`;
        } else {
            //db로부터 특정 테이블 조회 코드 작성
            query = `SELECT * FROM orders`;
            //get 방식으로 username 받아와서 사용자 검색하기
            // 127.0.0.1:3001/users?username=user1
        }
        const header = ["ID", "OrderAt", "StoreID", "UserID"]
        db.all(query, (err, row) => {
            res.render('order', {data: row, headers: header});
        });
    });

    app.get('/items', (req, res) => {
        const { Name } = req.query;
        let query;
        if (Name) {
            query = `SELECT * FROM items WHERE Name LIKE '%${Name}%'`;
        } else {
            //db로부터 특정 테이블 조회 코드 작성
            query = `SELECT * FROM items`;
            //get 방식으로 username 받아와서 사용자 검색하기
            // 127.0.0.1:3001/users?username=user1
        }
        const header = ["ID", "Name", "Type", "UnitPrice"]
        db.all(query, (err, row) => {
            res.render('item', {data: row, headers: header});
        });
    });

    app.get('/orderitems', (req, res) => {
        const { ID } = req.query;
        let query;
        if (ID) {
            query = `SELECT * FROM orderitems WHERE Name LIKE '%${ID}%'`;
        } else {
            //db로부터 특정 테이블 조회 코드 작성
            query = `SELECT * FROM orderitems`;
            //get 방식으로 username 받아와서 사용자 검색하기
            // 127.0.0.1:3001/users?username=user1
        }
        const header = ["ID", "OrderID", "ItemID"]
        db.all(query, (err, row) => {
            res.render('orderitem', {data: row, headers: header});
        });
    });

    app.get('/users/:ID', (req, res) => {
        //db로부터 특정 테이블 조회 코드 작성
        const users_id = req.params.ID;
        // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
        const query = `SELECT * FROM users WHERE id = ?`;
        
        db.get(query, [users_id], (err, row) => {
            res.json(row);
        });
    });

    // app.get("/users", (req, res) => {
    //     const itemsPerPage = 15;

    //     page = req.query.page || 1;
    //     const username = req.query.name
    //     const searchdata = data.filter((d) => d.name && d.name.includes(username));
    //     const totalPages = Math.ceil(data.length / itemsPerPage);
    
    //     res.render("index", {data: searchdata, headers: header, pagebuttons: totalPages, page: parseInt(page)});
    //   });

    // app.get('/users/:id', (req, res) => {
        
    //     const userid = req.params.id;
    //     const user = (data.find((d) => d.id == userid));

    //     res.render("user", {data: user, headers: header, page: parseInt(page)});
    // });

    app.listen(port, () => {
        console.log(`${port}번 실행 완료`);
    });
};

startServer();