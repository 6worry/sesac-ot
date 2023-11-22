const express = require('express');
const session =  require('express-session');

const app = express();
const port = 3004;

app.use(session({
    secret: 'my-key',
    resave: false, // 세션 데이터가 변경되지 않아도 다시 저장할지에 대한 여부 확인
    saveUninitialized: true // 초기화 되지 않은 세션을 저장소에 저장할지에 대한 여부 확인
}));

app.use((req, res, next) => {
    req.session.visitCount = req.session.visitCount || 0; // 변수인 visitCount 값 초기화
    req.session.visitCount++; // 방문 횟수 증가

    console.log('SessionID:', req.sessionID);
    console.log('SessionInfo:', req.session);
    next();
});

app.get('/', (req,res) => {
    res.send(`너의 방문 횟수: ${req.session.visitCount}`);
});

app.listen(port, () => {
    console.log(`${port} 생성 완료다`);
});