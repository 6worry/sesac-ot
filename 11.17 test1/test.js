const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');
const {parse} = require('querystring');
const users ={};
app.use(express.json());
app.use("/static", express.static('static'));
app.use(express.static('public/new index.html'));
// app.use("public", express.static('images/photo3.jpg'));
app.use((req, res, next) => {
    next();
});

app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'new index.html');
    fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('읽기 오류:', err);
            res.status(500).send('서버 오류!');
            return;
        };

        res.send(data); // 파일을 잘 읽었으면 send
    });
});

app.get('/about', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'new about.html');

    fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('읽기 오류:', err);
            res.status(500).send('서버 오류!');
            return;
        };
        res.send(data); // 파일을 잘 읽었으면 send
    });
});

app.get('/user', (req, res) => {
    res.status(200).send(users);
});

app.post('/user', (req, res) => {
        try {
            const jsonData = req.body;
            const id = Date.now();
            users[id] = jsonData.name;
            console.log('456:', users);
            res.json({receiveData: users}); 
        } catch (err) {
            res.status(400).json({err: "입력값이 잘못됐다."});
        };    
});

app.put('/user/:id', (req,res) => {
    const id = req.params.id;
    const jsonData = req.body;
    users[id] = jsonData.name;
    res.json({receiveData: users});
});

app.delete('/user/:id', (req,res) => {
    const id = req.params.id;
    delete users[id];
    res.send('삭제 완료');
});

app.listen(port, () => {
    console.log(`${port} 생성!`);
});