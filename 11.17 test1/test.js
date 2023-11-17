const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');

// app.use(express.static('public'));

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


app.listen(port, () => {
    console.log(`${port} 생성!`);
});