const express = require('express');

const app = express();

const port = 3001;

function myLogger(req, res, next) { 
    const date = new Date(Date.now());
    const formattedTime = date.toLocaleString();
    console.log(`${formattedTime}: log message`);
    next();
};

function requestTime(req, res, next) {
    req.requestTime = Date.now();
    next();
}

// 1. 라우팅
app.get('/', (req, res) => {
    console.log(req.requestTime);
    res.send('Hi');
}); // 루트 경로 설정

// 2. 미들웨어
app.use(myLogger);
app.use(requestTime);

app.listen(port, () => {
    console.log(`서버 ${port}번 포트 실행중`);
});