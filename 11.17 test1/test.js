const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');
const {parse} = require('querystring');
const users ={};
// app.use(express.static('public'));
app.use(express.json());

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
    // const jsFilePath = path.join(__dirname, 'public', 'user.js');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(JSON.stringify(users));
});

app.post('/user', (req, res) => {
    let body='';
    req.on('data', (data)=>{
    body += data
    });
    req.on('end', ()=>{
        try{
            const jsonData = JSON.parse(body);
            const id = Date.now();
            users[id] = jsonData.name;   
            console.log('456:', users[id])
            
            // 결과 response를 주는 코드
        res.writeHead(201, {'Content-Type': 'text/plain; charset=utf-8'});
        res.send('등록 성공');

            // res.json({receiveData: formData})
        } catch (err) {
            res.status(400).json({err: "입력값이 잘못됐다."});
        };
    });
    
    // //결과 response를 주는 코드
    //     res.writeHead(201, {'Content-Type': 'text/plain; charset=utf-8'});
    //     res.end('등록 성공');
    
});

app.listen(port, () => {
    console.log(`${port} 생성!`);
});