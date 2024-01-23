const express = require('express');
const cookieParser = require('cookie-parser');
const jwt= require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'secret-key' // 전자서명에 대한 대칭되는 개인키

app.use(cookieParser());
app.use((req, res, next) => {
    // 클라이언트에게 jwt 생성 및 전송
    const clientID = 'clientID-1234' //클라이언트 고유 식별자

    // jwt로 전자서명
    const token = jwt.sign( { clientID }, secretKey, {expiresIn: '1m'} );

    res.cookie('jwt', token);

    next();
});

app.use((req, res, next) => {
    const token = req.cookies.jwt;
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
            return res.status(401).json({message: '무결성 실패'});
        };
        // 원하는 내용 추출
        const clientID = decoded.clientID;
        if (clientID === 'clientID-1234') {
            console.log('유저 페이지 전달');
            next();   
        } else if (clientID === 'clientID-admin') {
            console.log('관리자 페이지 전달');
            next();
        } else {
            res.status(403).json({message: '승인 거부'});
        };
    });
});

app.get('/', (req, res) => {
    console.log('접속 완료');
    res.send('hi');
});

app.get('/decode', (req, res) => {
    const token = req.cookies.jwt;
    jwt.decode(token, {complete: true}, (decordedToken) => {
        res.send(decordedToken);
    });
});

app.listen(port, () => {
    console.log(`${port} 준비 완료`);
});