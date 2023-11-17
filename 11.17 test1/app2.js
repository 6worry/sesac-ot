const express = require('express');

const app = express();
const port = 3001;

// 라우팅 추가
app.get('/', (req, res) => {
    res.send('Hello\nGET'); // \n = 줄바꿈
});

app.post('/', (req, res) => {
    res.send('Hello\nPOST'); // \n = 줄바꿈
});

app.put('/', (req, res) => {
    res.send('Hello\nPUT'); // \n = 줄바꿈
});

app.delete('/', (req, res) => {
    res.send('Hello\nDELETE'); // \n = 줄바꿈
});

// 서버 생성
app.listen(port, () => {
    console.log(`서버 ${port}포트 생성`)
});
