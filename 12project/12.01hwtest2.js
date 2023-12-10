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
    });

    app.get('/stores', (req, res) => {
        const itemsPerPage = 15;
        page = req.query.page || 1;
        const startIndex = (page - 1) * itemsPerPage;
        const searchName = req.query.name || '';
        query = `SELECT * FROM stores WHERE Name LIKE '%${searchName}%' LIMIT ${itemsPerPage} OFFSET ${startIndex}`;

        db.all(query, (err, row) => {
            const totalQuery = `SELECT COUNT(*) as count FROM stores WHERE Name LIKE '%${searchName}%'`;
            db.get(totalQuery, (err, result) => {
                const totalPages = Math.ceil(result.count / itemsPerPage);
                const header = ["ID", "Name", "Type", "Address"];
                res.render('store', {
                    data: row,
                    headers: header,
                    pagebuttons: totalPages,
                    page: parseInt(page),
                    searchName: searchName
                });
            });
        });
    });

    app.get('/orders', (req, res) => {
        const itemsPerPage = 15;
        page = req.query.page || 1;
        const startIndex = (page - 1) * itemsPerPage;
        const searchName = req.query.name || '';
        query = `SELECT * FROM orders WHERE OrderAt LIKE '%${searchName}%' LIMIT ${itemsPerPage} OFFSET ${startIndex}`;

        db.all(query, (err, row) => {
            const totalQuery = `SELECT COUNT(*) as count FROM orders WHERE OrderAt LIKE '%${searchName}%'`;
            db.get(totalQuery, (err, result) => {
                const totalPages = Math.ceil(result.count / itemsPerPage);
                const header = ["ID", "OrderAt", "StoreID", "UserID"];
                res.render('order', {
                    data: row,
                    headers: header,
                    pagebuttons: totalPages,
                    page: parseInt(page),
                    searchName: searchName
                });
            });
        });
    });

    app.get('/items', (req, res) => {
        const searchName = req.query.name || '';
        query = `SELECT * FROM items WHERE Name LIKE '%${searchName}%'`; 
        const header = ["ID", "Name", "Type", "UnitPrice"];

        db.all(query, (err, row) => {
            res.render('item', {data: row, headers: header, searchName: searchName});
        });
    });

    app.get('/orderitems', (req, res) => {
        const itemsPerPage = 15;
        page = req.query.page || 1;
        const startIndex = (page - 1) * itemsPerPage;
        const searchName = req.query.name || '';
        query = `SELECT * FROM orderitems WHERE OrderID LIKE '%${searchName}%' or ItemID LIKE '%${searchName}%' LIMIT ${itemsPerPage} OFFSET ${startIndex}`;

        db.all(query, (err, row) => {
            const totalQuery = `SELECT COUNT(*) as count FROM orderitems WHERE OrderID LIKE '%${searchName}%' or ItemID LIKE '%${searchName}%'`;
            db.get(totalQuery, (err, result) => {
                const totalPages = Math.ceil(result.count / itemsPerPage);
                const header = ["ID", "OrderID", "ItemID"];
                res.render('orderitem', {
                    data: row,
                    headers: header,
                    pagebuttons: totalPages,
                    page: parseInt(page),
                    searchName: searchName
                });
            });
        });
    });

    app.get('/userdetail/:ID', (req, res) => {
        //db로부터 특정 테이블 조회 코드 작성
        const users_id = req.params.ID;
        // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
        const query = `Select * from users u WHERE u.id=?`;
        const query2 = `SELECT o.ID AS OrderID, * FROM users u join orders o on u.ID = o.UserID WHERE u.id =?`;
        const query3 = `Select s.Name, Count(s.Name) from users u join orders o on u.ID = o.UserID join stores s on s.ID = o.StoreID WHERE u.id=? group by s.Name order by Count(s.Name) desc limit 5`;
        const query4 = `Select i.Name, Count(i.Name) from users u join orders o on u.ID = o.UserID join stores s on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE u.id=? group by s.Name order by Count(i.Name) desc limit 5`;
        
        const firstheader = ["Name", "Gender", "Age", "Birthdate", "Address"];
        const secondheader = ["OrderID", "OrderAt", "StoreID"];
        const firstcontent = ["Name"];
        const secondcontent = ["Count(s.Name)"];
        const thirdcontent = ["Name"];
        const fourthcontent = ["Count(i.Name)"];

        db.all(query, [users_id], (err, row) => {
            if(err){
                console.error(err);
            };
            
        db.all(query2, [users_id], (err, row2) => {
            if(err){
                console.error(err);
            };

        db.all(query3, [users_id], (err, row3) => {
            if(err){
                console.error(err);
            };

        db.all(query4, [users_id], (err, row4) => {
            if(err){
                console.error(err);
            };

            res.render('userdetail', {
                data: row, data2: row2, data3: row3, data4: row4, firstheaders: firstheader, secondheaders: secondheader, firstcontents: firstcontent, secondcontents: secondcontent, thirdcontents: thirdcontent, fourthcontents: fourthcontent
            });
        });
        });
        });
        });
    });

    app.get('/storedetail/:ID', (req, res) => {
        //db로부터 특정 테이블 조회 코드 작성
        const stores_id = req.params.ID;
        // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
        const query = `Select s.Name, s.Type, s.Address from stores s WHERE s.id=?`;

        const query2 = `SELECT strftime('%Y-%m', o.OrderAt) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address, s.ID FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? GROUP BY strftime('%m', o.OrderAt)`;
        
        const query3 = `Select u.ID AS UserID, u.Name, Count(u.id) AS 방문횟수, s.ID from stores s join orders o on s.ID = o.StoreID join users u on u.ID = o.UserID WHERE s.id = ? group by u.id order by Count(u.id) desc limit 10`;

        
        const firstheader = ["Name", "Type", "Address"];
        const secondheader = ["YearMonth", "TotalPrice", "Count"];
        const thirdheader = ["UserID", "Name", "방문횟수"];
        
        db.all(query, [stores_id], (err, row1) => {
            if(err){
                console.error(err);
            };
            
        db.all(query2, [stores_id], (err, row2) => {
            if(err){
                console.error(err);
            };
            
        db.all(query3, [stores_id], (err, row3) => {
            if(err){
                console.error(err);
            };
            
            res.render('storedetail', {
                data: row1, data2: row2, data3: row3, firstheaders: firstheader, secondheaders: secondheader, thirdheaders: thirdheader
            });
        });
        });
        });
    });

    app.get('/storedetail2/:ID/:YearMonth', (req, res) => {
        //db로부터 특정 테이블 조회 코드 작성
        const stores_id = req.params.ID;
        const YearMonth = req.params.YearMonth;
        // const query = `SELECT * FROM ${db_table} WHERE id = ${table_id}`;
        const query = `Select s.Name, s.Type, s.Address from stores s WHERE s.id=?`;

        const query2 = `SELECT strftime('%Y-%m-%d', o.OrderAt) AS YearMonth, Sum(i.UnitPrice) AS TotalPrice, Count(s.id) AS Count, s.Name, s.Type, s.Address FROM stores s join orders o on s.ID = o.StoreID join orderitems oi on o.ID = oi.OrderID join items i on oi.ItemID = i.ID WHERE s.id =? and strftime('%Y-%m', o.OrderAt) = '${YearMonth}' group by strftime('%Y-%m-%d', o.OrderAt)`;

        const query3 = `Select u.ID AS UserID, u.Name, Count(u.id) AS 방문횟수 From stores s join orders o on s.ID = o.StoreID join users u on u.ID = o.UserID WHERE s.id = ? and strftime('%Y-%m', o.OrderAt) = '${YearMonth}' group by strftime('%Y-%m-%d', o.OrderAt) order by Count(u.id) desc`;
        
        const firstheader = ["Name", "Type", "Address"];
        const secondheader = ["YearMonth", "TotalPrice", "Count"];
        const thirdheader = ["UserID", "Name", "방문횟수"];
        
        db.all(query, [stores_id], (err, row1) => {
            if(err){
                console.error(err);
            };
            
        db.all(query2, [stores_id], (err, row2) => {
            if(err){
                console.error(err);
            };
            
        db.all(query3, [stores_id], (err, row3) => {
            if(err){
                console.error(err);
            };
        
            res.render('storedetail2', {
                data: row1, data2: row2, data3: row3, firstheaders: firstheader, secondheaders: secondheader, thirdheaders: thirdheader
            });
        });
        });
        });
    });

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
        
        const firstheader = ["Name", "UnitPrice"];
        const secondheader = ["YearMonth", "TotalPrice", "Count"];
        
        db.all(query, [items_id], (err, row1) => {
            if(err){
                console.error(err);
            };
            
        db.all(query2, [items_id], (err, row2) => {
            if(err){
                console.error(err);
            };

        db.all(query3, [items_id], (err, row3) => {
            if(err){
                console.error(err);
            };

        db.all(query4, [items_id], (err, row4) => {
            if(err){
                console.error(err);
            };

        db.all(query5, [items_id], (err, row5) => {
            if(err){
                console.error(err);
            };

        db.all(query6, [items_id], (err, row6) => {
            if(err){
                console.error(err);
            };

        db.all(query7, [items_id], (err, row7) => {
            if(err){
                console.error(err);
            };

        db.all(query8, [items_id], (err, row8) => {
            if(err){
                console.error(err);
            };

        db.all(query9, [items_id], (err, row9) => {
            if(err){
                console.error(err);
            };

        db.all(query10, [items_id], (err, row10) => {
            if(err){
                console.error(err);
            };

        db.all(query11, [items_id], (err, row11) => {
            if(err){
                console.error(err);
            };

        db.all(query12, [items_id], (err, row12) => {
            if(err){
                console.error(err);
            };
            
            res.render('itemdetail', {
                data: row1, data2: row2, data3: row3, data4: row4, data5: row5, data6: row6, data7: row7, data8: row8, data9: row9, data10: row10, data11: row11, data12: row12, firstheaders: firstheader, secondheaders: secondheader
            });
        });
        });
        });
        });
        });

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
        
        const firstheader = ["OrderID", "OrderAt", "StoreID", "UserID"];
        
        db.all(query, [orderitems_id], (err, row) => {
            res.render('orderitemdetail', {data: row, firstheaders: firstheader});
        });
    });

    app.listen(port, () => {
        console.log(`${port}번 실행 완료`);
    });
};

startServer();