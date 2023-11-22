const express = require('express');
const cookieParser =require('cookie-parser');

const app = express();
const port = 3004;

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('mycookie', 'test', {maxAge: 10000});
    res.send('쿠키 생성 완료');
});

app.get('/readcookie', (req, res) => {
    const myCookie = req.cookies.mycookie
    console.log(myCookie);

    res.send(`내 쿠키 = ${myCookie}`)
});

app.listen(port, () => {
    console.log(`${port} 실행 완료`);
});