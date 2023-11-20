const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;
const Success = 200;
const Create = 201;
const Server_Error = 500;
const Not_Found = 404;
const users = {};

app.use('/static', express.static('public/static'));
app.use('/images', express.static('public/static'));
app.use(bodyParser.json());
// app.use(express.json()); //신 버전부턴 body-parser 설치 없이 express.json()으로 사용 가능


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'new about.html'));
});

app.get('/user', (req, res) => {
    res.json(users);
});

app.post('/user', (req, res) => {
    const {name} = req.body; // = const name = req.body.name
    const id = Date.now();

    users[id] = name;
    res.status(Create).send('등록 성공');
});

app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const {name} = req.body;

    users[id] = name;

    res.status(Success).send('수정 완료');
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    delete users[id];
    
    res.status(Success).send('삭제 완료');
});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});