const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const port = 3001;

const app = express();
expressWs(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client3.html'));
});

// 웹소켓 핸들링 코드

app.ws('/chat', (ws ,req) => {})

app.listen(port, () => {
    console.log(`${port} 준비 완료`);
});