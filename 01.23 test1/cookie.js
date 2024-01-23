const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('mycookie', 'test', {maxAge: 60000});
    res.cookie('username', 'user1', {maxAge: 60000});
    res.cookie('cart', ['prod1', 'prod2'], {maxAge: 60000});
    res.send('쿠키 전달 완료');
});

app.get('/user', (req, res) => {
    const {mycookie, username, cart} = req.cookies;

    res.send(`${mycookie}쿠키 ${username}전달 완료${cart}`);
});

app.listen(port, () => {
    console.log(`${port} 준비 완료`);
});