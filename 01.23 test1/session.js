const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(session ({
    secret: 'my-secret', // 세션 데이터 암호화 키
    resave: false, // 변경된 부분 없이도 저장가능여부 확인
    saveUninitialized: true, // 데이터 없이도 저장가능여부 확인
}));

app.get('/', (req, res) => {
    req.session.username = 'user1';
    req.session.cart = ['상품1', '상품2'];
    res.send(`${req.sessionID}세션 전달 완료${JSON.stringify(req.session)}`);
});

app.get('/user', (req, res) => {
    console.log('세션정보:', req.sessionStore.sessions)
    res.send(`${req.sessionID}세션 전달 완료${JSON.stringify(req.session)}`);
})

app.listen(port, () => {
    console.log(`${port} 준비 완료`);
});