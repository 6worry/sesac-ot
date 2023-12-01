const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
// const csv = require('csv-parser');
const csv = require('fast-csv');
const app = express();
const port = 3003;

nunjucks.configure('views hw', {
    express: app,
    autoescape: true
});

app.set('view engine', 'html');
app.use(express.static("view hw"));
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

async function loadDataIntoMemory() {
    return new Promise((resolve, reject) => {

        fs.createReadStream('user.csv', {encoding: 'utf-8'})
        .pipe(csv.parse({headers: true, trim: true}))
        .on('headers', (headers) => {
            header.push(...headers);
        })
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', () => {
            resolve();
        })
        .on('error', (err) => {
            reject(err);
        });
    });
};

async function loadDataIntoMemory2() {
    return new Promise((resolve, reject) => {

        fs.createReadStream('store.csv', {encoding: 'utf-8'})
        .pipe(csv.parse({headers: true, trim: true}))
        .on('headers', (headers) => {
            header.push(...headers);
        })
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', () => {
            resolve();
        })
        .on('error', (err) => {
            reject(err);
        });
    });
};


async function startServer() {
    await loadDataIntoMemory();

    app.get('/', (req, res) => {
        const itemsPerPage = 15;

        page = req.query.page || 1;
        const startIndex = (page -1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const totalPages = Math.ceil(data.length / itemsPerPage);

        const realdata = data.slice(startIndex, endIndex);
        res.render('index', {data: realdata, headers: header, pagebuttons: totalPages, page: parseInt(page)});
    });

    app.get("/users", (req, res) => {
        const itemsPerPage = 15;

        page = req.query.page || 1;
        const username = req.query.name
        const searchdata = data.filter((d) => d.name && d.name.includes(username));
        const totalPages = Math.ceil(data.length / itemsPerPage);
    
        res.render("index", {data: searchdata, headers: header, pagebuttons: totalPages, page: parseInt(page)});
      });

    app.get('/users/:id', (req, res) => {
        
        const userid = req.params.id;
        const user = (data.find((d) => d.id == userid));

        res.render("user", {data: user, headers: header, page: parseInt(page)});
    });

    app.listen(port, () => {
        console.log(`${port}번 실행 완료`);
    });
};

startServer();