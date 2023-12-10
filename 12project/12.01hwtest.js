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

let data = []; // 읽은 데이터를 담을 곳
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

function startServer() {
    app.get('/', (req, res) => {
        const itemsPerPage = 15;
        page = req.query.page || 1;
        const startIndex = (page - 1) * itemsPerPage;
        query = `SELECT * FROM users LIMIT ${itemsPerPage} OFFSET ${startIndex}`;
    
        db.all(query, (err, row) => {
            const totalQuery = `SELECT COUNT(*) as count FROM users`;
            db.get(totalQuery, (err, result) => {
                const totalPages = Math.ceil(result.count / itemsPerPage);
                const header = ["ID", "Name", "Gender", "Age", "Birthdate", "Address"];
                res.render('index', {
                    data: row,
                    headers: header,
                    pagebuttons: totalPages,
                    page: parseInt(page)
                });
            });
        });
    });
    

    app.get('/users', (req, res) => {
        const itemsPerPage = 15;
        page = req.query.page || 1;
        const startIndex = (page - 1) * itemsPerPage;
        const searchName = req.query.name || '';
        query = `SELECT * FROM users WHERE Name LIKE '%${searchName}%' LIMIT ${itemsPerPage} OFFSET ${startIndex}`;
    
        db.all(query, (err, row) => {
            const totalQuery = `SELECT COUNT(*) as count FROM users WHERE Name LIKE '%${searchName}%'`;
            db.get(totalQuery, (err, result) => {
                const totalPages = Math.ceil(result.count / itemsPerPage);
                const header = ["ID", "Name", "Gender", "Age", "Birthdate", "Address"];
                res.render('index', {
                    data: row,
                    headers: header,
                    pagebuttons: totalPages,
                    page: parseInt(page),
                    searchName: searchName
                });
            });
        });
        // const { Name } = req.query;
        // let query;
        // if (Name) {
        //     query = `SELECT * FROM users WHERE Name LIKE '%${Name}%'`;
        // } else {
        //     //db로부터 특정 테이블 조회 코드 작성
        //     query = `SELECT * FROM users`;
        //     //get 방식으로 username 받아와서 사용자 검색하기
        //     // 127.0.0.1:3001/users?username=user1
        // }
        // const header = ["ID", "Name", "Gender", "Age", "Birthdate", "Address"]
        // db.all(query, (err, row) => {
        //     res.render('user', {data: row, headers: header});
        // });
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

    app.get('/userdetail/:ID', (req, res) => {
        //db로부터 특정 테이블 조회 코드 작성
        const users_id = req.params.ID;
        // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
        const query = `Select * from users u WHERE u.id=?`
        const query2 = `SELECT o.ID AS OrderID, * FROM users u join orders o on u.ID = o.UserID WHERE u.id =?`;
        const query3 = `Select s.Name, Count(s.Name) from users u join orders o on u.ID = o.UserID join stores s on s.ID = o.StoreID WHERE u.id=? group by s.Name order by Count(s.Name) desc limit 5`
        const query4 = `Select i.Name, Count(i.Name) from users u join orders o on u.ID = o.UserID join stores s on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE u.id=? group by s.Name order by Count(i.Name) desc limit 5`
        // const query = `SELECT * FROM users u join order o on u.ID = o.UserID WHERE id =?`;
        
        const firstheader = ["Name", "Gender", "Age", "Birthdate", "Address"];
        const secondheader = ["OrderID", "OrderAt", "StoreID"];
        const firstcontent = ["Name"];
        const secondcontent = ["Count(s.Name)"];
        const thirdcontent = ["Name"];
        const fourthcontent = ["Count(i.Name)"];
        db.all(query, [users_id], (err, row) => {
            if(err){
                console.error(err)
            }
            
        db.all(query2, [users_id], (err, row2) => {
            if(err){
                console.error(err)
            }
        db.all(query3, [users_id], (err, row3) => {
            if(err){
                console.error(err)
            }
        db.all(query4, [users_id], (err, row4) => {
            if(err){
                console.error(err)
            }
            res.render('userdetail', {data: row, data2: row2, data3: row3, data4: row4, firstheaders: firstheader, secondheaders: secondheader, firstcontents: firstcontent, secondcontents: secondcontent, thirdcontents: thirdcontent, fourthcontents: fourthcontent});
                    });
                });
            });
        });
    });

    app.get('/storedetail/:ID', async (req, res) => {
        try {
            const stores_id = req.params.ID;
            const yearMonth = req.query.YearMonth;
    
            const firstQueries = [
                Query = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-01-01' and '2023-01-31'`, // 뒤에 group by YearMonth
        Query2 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-02-01' and '2023-02-28'`,
        Query3 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-03-01' and '2023-03-31'`,
        Query4 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-04-01' and '2023-04-30'`,
        Query5 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-05-01' and '2023-05-31'`,
        Query6 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-06-01' and '2023-06-30'`,
        Query7 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-07-01' and '2023-07-31'`,
        Query8 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-08-01' and '2023-08-31'`,
        Query9 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-09-01' and '2023-09-30'`,
        Query10 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-10-01' and '2023-10-31'`,
        Query11 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-11-01' and '2023-11-30'`,
        Query12 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-12-01' and '2023-12-31'`,
        Query13 = `Select u.ID AS UserID, u.Name, Count(u.id) AS 방문횟수 from stores s join orders o on s.ID = o.StoreID join users u on u.ID = o.UserID WHERE s.id = ? group by u.id order by Count(u.id) desc limit 10` //? 뒤에 and o.OrderAt between '${yearmonth}-01' and '${yearmonth}-31' 
            ];
    
            const secondQueries = [
                query = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-01-01' and '2023-01-31'`,
        query2 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-02-01' and '2023-02-28'`,
        query3 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-03-01' and '2023-03-31'`,
        query4 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-04-01' and '2023-04-30'`,
        query5 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-05-01' and '2023-05-31'`,
        query6 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-06-01' and '2023-06-30'`,
        query7 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-07-01' and '2023-07-31'`,
        query8 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-08-01' and '2023-08-31'`,
        query9 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-09-01' and '2023-09-30'`,
        query10 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-10-01' and '2023-10-31'`,
        query11 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-11-01' and '2023-11-30'`,
        query12 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-12-01' and '2023-12-31'`,
        query13 = `Select u.ID AS UserID, u.Name, Count(u.id) AS 방문횟수 from stores s join orders o on s.ID = o.StoreID join users u on u.ID = o.UserID WHERE s.id = ? group by u.id order by Count(u.id) desc limit 10`
            ];
    
            const executeQueries = async (queries, params) => {
                const results = [];
                for (const query of queries) {
                    const result = await new Promise((resolve, reject) => {
                        db.all(query, params, (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(rows);
                            }
                        });
                    });
                    results.push(result);
                }
                return results;
            };
    
            const [firstResults, secondResults] = await Promise.all([
                executeQueries(firstQueries, [stores_id, yearMonth]),
                executeQueries(secondQueries, [stores_id])
            ]);
    
            const firstheader = ["Name", "Type", "Address"];
            const secondheader = ["YearMonth", "TotalPrice", "Count"];
            const thirdheader = ["UserID", "Name", "방문횟수"];
    
            res.render('storedetail', {
                data: firstResults[0],
                data2: firstResults[1],
                data3: firstResults[2],
                data4: firstResults[3],
                data5: firstResults[4],
                data6: firstResults[5],
                data7: firstResults[6],
                data8: firstResults[7],
                data9: firstResults[8],
                data10: firstResults[9],
                data11: firstResults[10],
                data12: firstResults[11],
                data13: firstResults[12],
                firstheaders: firstheader,
                secondheaders: secondheader,
                thirdheaders: thirdheader,
                Data: secondResults[0],
                Data2: secondResults[1],
                Data3: secondResults[2],
                Data4: secondResults[3],
                Data5: secondResults[4],
                Data6: secondResults[5],
                Data7: secondResults[6],
                Data8: secondResults[7],
                Data9: secondResults[8],
                Data10: secondResults[9],
                Data11: secondResults[10],
                Data12: secondResults[11],
                Data13: secondResults[12],
            });
                
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
    

    // app.get('/storedetail/:ID', (req, res) => {
    //     //db로부터 특정 테이블 조회 코드 작성
    //     const stores_id = req.params.ID;
    //     const yearMonth = req.query.YearMonth;
    //     // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
    //     const query = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-01-01' and '2023-01-31'`;
    //     const query2 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-02-01' and '2023-02-28'`;
    //     const query3 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-03-01' and '2023-03-31'`;
    //     const query4 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-04-01' and '2023-04-30'`;
    //     const query5 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-05-01' and '2023-05-31'`;
    //     const query6 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-06-01' and '2023-06-30'`;
    //     const query7 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-07-01' and '2023-07-31'`;
    //     const query8 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-08-01' and '2023-08-31'`;
    //     const query9 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-09-01' and '2023-09-30'`;
    //     const query10 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-10-01' and '2023-10-31'`;
    //     const query11 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-11-01' and '2023-11-30'`;
    //     const query12 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-12-01' and '2023-12-31'`;
    //     const query13 = `Select u.ID AS UserID, u.Name, Count(u.id) AS 방문횟수 from stores s join orders o on s.ID = o.StoreID join users u on u.ID = o.UserID WHERE s.id = ? group by u.id order by Count(u.id) desc limit 10`;

    //     const Query = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-01-01' and '2023-01-31'`; // 뒤에 group by YearMonth
    //     const Query2 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-02-01' and '2023-02-28'`;
    //     const Query3 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-03-01' and '2023-03-31'`;
    //     const Query4 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-04-01' and '2023-04-30'`;
    //     const Query5 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-05-01' and '2023-05-31'`;
    //     const Query6 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-06-01' and '2023-06-30'`;
    //     const Query7 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-07-01' and '2023-07-31'`;
    //     const Query8 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-08-01' and '2023-08-31'`;
    //     const Query9 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-09-01' and '2023-09-30'`;
    //     const Query10 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-10-01' and '2023-10-31'`;
    //     const Query11 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-11-01' and '2023-11-30'`;
    //     const Query12 = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-12-01' and '2023-12-31'`;
    //     const Query13 = `Select u.ID AS UserID, u.Name, Count(u.id) AS 방문횟수 from stores s join orders o on s.ID = o.StoreID join users u on u.ID = o.UserID WHERE s.id = ? group by u.id order by Count(u.id) desc limit 10`; //? 뒤에 and o.OrderAt between '${yearmonth}-01' and '${yearmonth}-31' 

    //     const firstheader = ["Name", "Type", "Address"];
    //     const secondheader = ["YearMonth", "TotalPrice", "Count"];
    //     const thirdheader = ["UserID", "Name", "방문횟수"];
        
        
    //         db.all(Query, [stores_id, yearMonth], (err, row1) => {
    //             if(err){
    //                 console.error(err)
    //             }
                
    //             db.all(Query2, [stores_id, yearMonth], (err, row2) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query3, [stores_id, yearMonth], (err, row3) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query4, [stores_id, yearMonth], (err, row4) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query5, [stores_id, yearMonth], (err, row5) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query6, [stores_id, yearMonth], (err, row6) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query7, [stores_id, yearMonth], (err, row7) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query8, [stores_id, yearMonth], (err, row8) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query9, [stores_id, yearMonth], (err, row9) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query10, [stores_id, yearMonth], (err, row10) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query11, [stores_id, yearMonth], (err, row11) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    
    //             db.all(Query12, [stores_id, yearMonth], (err, row12) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
    //             db.all(Query13, [stores_id, yearMonth], (err, row13) => {
    //                 if(err){
    //                     console.error(err)
    //                 }
                
    //             res.render('storedetail2', {data: row1, data2: row2, data3: row3, data4: row4, data5: row5, data6: row6, data7: row7, data8: row8, data9: row9, data10: row10, data11: row11, data12: row12, data13: row13, firstheaders: firstheader, secondheaders: secondheader, thirdheaders: thirdheader});
                
    //             });});});});});});
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });

    //     db.all(query, [stores_id], (err, row1) => {
    //         if(err){
    //             console.error(err)
    //         }
            
    //         db.all(query2, [stores_id], (err, row2) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query3, [stores_id], (err, row3) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query4, [stores_id], (err, row4) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query5, [stores_id], (err, row5) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query6, [stores_id], (err, row6) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query7, [stores_id], (err, row7) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query8, [stores_id], (err, row8) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query9, [stores_id], (err, row9) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query10, [stores_id], (err, row10) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query11, [stores_id], (err, row11) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query12, [stores_id], (err, row12) => {
    //             if(err){
    //                 console.error(err)
    //             }
    //         db.all(query13, [stores_id], (err, row13) => {
    //             if(err){
    //                 console.error(err)
    //             }
            
    //         res.render('storedetail', {data: row1, data2: row2, data3: row3, data4: row4, data5: row5, data6: row6, data7: row7, data8: row8, data9: row9, data10: row10, data11: row11, data12: row12, data13: row13, firstheaders: firstheader, secondheaders: secondheader, thirdheaders: thirdheader});
            
    //         });});});});});});
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    
    // });

    // app.get('/storedetail/:YearMonth', (req, res) => {
    //     //db로부터 특정 테이블 조회 코드 작성
    //     const stores_id = req.params.ID;
    //     // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
    //     const query = `SELECT Substr(o.OrderAt, 1, 10) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-01-01' and '2023-01-31'`;
    //     const query2 = `SELECT o.OrderAt AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-02-01' and '2023-02-28'`;
    //     const query3 = `SELECT o.OrderAt AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-03-01' and '2023-03-31'`;
    //     const query4 = `SELECT o.OrderAt AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-04-01' and '2023-04-30'`;
    //     const query5 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-05-01' and '2023-05-31'`;
    //     const query6 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-06-01' and '2023-06-30'`;
    //     const query7 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-07-01' and '2023-07-31'`;
    //     const query8 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-08-01' and '2023-08-31'`;
    //     const query9 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-09-01' and '2023-09-30'`;
    //     const query10 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-10-01' and '2023-10-31'`;
    //     const query11 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-11-01' and '2023-11-30'`;
    //     const query12 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and o.OrderAt between '2023-12-01' and '2023-12-31'`;
    //     const query13 = `Select u.ID AS UserID, u.Name, Count(u.id) AS 방문횟수 from stores s join orders o on s.ID = o.StoreID join users u on u.ID = o.UserID WHERE s.id = ? group by u.id order by Count(u.id) desc limit 10`;
    //     const firstheader = ["Name", "Type", "Address"];
    //     const secondheader = ["YearMonth", "TotalPrice", "Count"];
    //     const thirdheader = ["UserID", "Name", "방문횟수"];
        
    //     db.all(query, [stores_id], (err, row1) => {
    //         if(err){
    //             console.error(err)
    //         }
            
    //         db.all(query2, [stores_id], (err, row2) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query3, [stores_id], (err, row3) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query4, [stores_id], (err, row4) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query5, [stores_id], (err, row5) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query6, [stores_id], (err, row6) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query7, [stores_id], (err, row7) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query8, [stores_id], (err, row8) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query9, [stores_id], (err, row9) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query10, [stores_id], (err, row10) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query11, [stores_id], (err, row11) => {
    //             if(err){
    //                 console.error(err)
    //             }

    //         db.all(query12, [stores_id], (err, row12) => {
    //             if(err){
    //                 console.error(err)
    //             }
    //         db.all(query13, [stores_id], (err, row13) => {
    //             if(err){
    //                 console.error(err)
    //             }
            
    //         res.render('storedetail2', {data: row1, data2: row2, data3: row3, data4: row4, data5: row5, data6: row6, data7: row7, data8: row8, data9: row9, data10: row10, data11: row11, data12: row12, data13: row13, firstheaders: firstheader, secondheaders: secondheader, thirdheaders: thirdheader});
            
    //         });});});});});});
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });

    app.get('/itemdetail/:ID', (req, res) => {
        //db로부터 특정 테이블 조회 코드 작성
        const items_id = req.params.ID;
        // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;

        const query = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-01-01' and '2023-01-31'`;

        const query2 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-02-01' and '2023-02-28'`;

        const query3 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-03-01' and '2023-03-31'`;

        const query4 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-04-01' and '2023-04-30'`;

        const query5 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-05-01' and '2023-05-31'`;

        const query6 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-06-01' and '2023-06-30'`;

        const query7 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-07-01' and '2023-07-31'`;

        const query8 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-08-01' and '2023-08-31'`;

        const query9 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-09-01' and '2023-09-30'`;

        const query10 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-10-01' and '2023-10-31'`;

        const query11 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-11-01' and '2023-11-30'`;

        const query12 = `SELECT Substr(o.OrderAt, 1, 7) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(i.id) AS Count, * FROM items i join orderitems oi on i.ID = oi.ItemID join orders o on o.ID = oi.OrderID WHERE i.id =? and o.OrderAt between '2023-12-01' and '2023-12-31'`;
        // const query = `SELECT * FROM users u join order o on u.ID = o.UserID WHERE id =?`;
        
        const firstheader = ["Name", "UnitPrice"];
        const secondheader = ["YearMonth", "TotalPrice", "Count"];
        
        db.all(query, [items_id], (err, row1) => {
            if(err){
                console.error(err)
            }
            
            db.all(query2, [items_id], (err, row2) => {
                if(err){
                    console.error(err)
                }

            db.all(query3, [items_id], (err, row3) => {
                if(err){
                    console.error(err)
                }

            db.all(query4, [items_id], (err, row4) => {
                if(err){
                    console.error(err)
                }

            db.all(query5, [items_id], (err, row5) => {
                if(err){
                    console.error(err)
                }

            db.all(query6, [items_id], (err, row6) => {
                if(err){
                    console.error(err)
                }

            db.all(query7, [items_id], (err, row7) => {
                if(err){
                    console.error(err)
                }

            db.all(query8, [items_id], (err, row8) => {
                if(err){
                    console.error(err)
                }

            db.all(query9, [items_id], (err, row9) => {
                if(err){
                    console.error(err)
                }

            db.all(query10, [items_id], (err, row10) => {
                if(err){
                    console.error(err)
                }

            db.all(query11, [items_id], (err, row11) => {
                if(err){
                    console.error(err)
                }

            db.all(query12, [items_id], (err, row12) => {
                if(err){
                    console.error(err)
                }
            
            res.render('itemdetail', {data: row1, data2: row2, data3: row3, data4: row4, data5: row5, data6: row6, data7: row7, data8: row8, data9: row9, data10: row10, data11: row11, data12: row12, firstheaders: firstheader, secondheaders: secondheader});
            
            });});});});});
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    app.get('/orderdetail/:ID', (req, res) => {
        //db로부터 특정 테이블 조회 코드 작성
        const orders_id = req.params.ID;
        // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
        const query = `SELECT oi.ID AS OrderitemID, i.Name AS Item, * FROM orders o join orderitems oi on o.ID = oi.OrderID join items i on i.ID = oi.ItemID WHERE o.id =?`;
        // const query = `SELECT * FROM users u join order o on u.ID = o.UserID WHERE id =?`;
    
        const firstheader = ["OrderitemID", "OrderID", "ItemID", "Item"];
        
        db.all(query, [orders_id], (err, row) => {
            res.render('orderdetail', {data: row, firstheaders: firstheader});
        });
    });

    app.get('/orderitemdetail/:ID', (req, res) => {
        //db로부터 특정 테이블 조회 코드 작성
        const orderitems_id = req.params.ID;
        // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
        const query = `SELECT * FROM orderitems oi join orders o on o.ID = oi.OrderID WHERE oi.id =?`;
        // const query = `SELECT * FROM users u join order o on u.ID = o.UserID WHERE id =?`;
        
        const firstheader = ["OrderID", "OrderAt", "StoreID", "UserID"];
        
        db.all(query, [orderitems_id], (err, row) => {
            res.render('orderitemdetail', {data: row, firstheaders: firstheader});
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