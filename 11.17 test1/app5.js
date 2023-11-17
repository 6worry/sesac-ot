const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
    <HTML>
        <HEAD>
            <TITLE>이미지 로딩</TITLE>
        </HEAD>
    <BODY>
        <H1>사진</H1>
        <img src="/images/photo3.jpg">
    </BODY>
    </HTML>
    `);
});

app.get('/about', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'index.html');

    fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('읽기 오류:', err);
            res.status(500).send('서버 오류!');
            return;
        };

        res.send(data);
    });
});

app.get('/about2', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(htmlFilePath, (err) => {
        if (err) {
            console.error('읽기 오류:', err);
            res.status(500).send('서버 오류!');
            return;
        };
    });
});

app.listen(port, () => {
    console.log(`${port} 생성!`);
});