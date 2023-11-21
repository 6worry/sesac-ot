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


async function startServer() {
    await loadDataIntoMemory();

    app.get('/', (req, res) => {
        const itemsPerPage = 15;
        let startIndex;
        let endIndex;

        console.log(`요청 파라미터: ${req.query.page}`)
        page = req.query.page || 1;
        startIndex = (page -1) * itemsPerPage;
        endIndex = startIndex + itemsPerPage;

        const totalPages = Math.ceil(data.length / itemsPerPage);

        const realdata = data.slice(startIndex, endIndex);
        res.render('index', {data: realdata, headers: header, pagebuttons: totalPages, page: parseInt(page)});
    });

    app.listen(port, () => {
        console.log(`${port}번 실행 완료`);
    });
};

app.get('/user/:ID', (req, res) => {

});

startServer();