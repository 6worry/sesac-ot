const express = require('express');
const fs = require('fs');
const path = require('path');

const Success = 200;
const Create = 201;
const Server_Error = 500;
const Not_Found = 404;
const app = express();
const port = 3001;
const users ={};

app.use("/static", express.static('static'));
app.use(express.static('public/new index.html'));

app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'new index.html');

    fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('읽기 오류:', err);
            res.status(Server_Error).send('서버 오류!');
            return;
        };

        res.status(Success).send(data); // 파일을 잘 읽었으면 send
    });
});

app.get('/about', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'new about.html');

    fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('읽기 오류:', err);
            res.status(Server_Error).send('서버 오류!');
            return;
        };
        
        res.status(Success).send(data); // 파일을 잘 읽었으면 send
    });
});

app.get('/user', (req, res) => {
    res.status(Success).send(users);
});

app.post('/user', (req, res) => {
    let body='';

    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        const formData = JSON.parse(body);
        const username = formData.name;
        const id = Date.now();

        users[id] = username;
    });

    res.status(Create).send('등록 성공');   
});

app.put('/user/:id', (req,res) => {
    const id = req.params.id;
    let body = '';

    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        delete users[id];
        const formData = JSON.parse(body);

        users[id] = formData.name;
    });

    res.status(Success).send('수정 성공');
});

app.delete('/user/:id', (req,res) => {
    const id = req.params.id;
    delete users[id];

    res.status(Success).send('삭제 완료');
});

app.use((req, res) => {
    res.status(Not_Found).send(`
    <H1>This is ERROR</H1>
    `);
});

app.listen(port, () => {
    console.log(`${port} 생성!`);
});