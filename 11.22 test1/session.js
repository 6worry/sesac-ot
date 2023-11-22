const express = require('express');
const session =  require('express-session');

const app = express();
const port = 3004;

app.use(session({
    secret: 'my-key',
    resave: false, // 세션 데이터가 변경되지 않아도 다시 저장할지에 대한 여부 확인
    saveUninitialized: true // 초기화 되지 않은 세션을 저장소에 저장할지에 대한 여부 확인
}));

app.get('/', (req,res) => {
    console.log(req.session);
    res.send('GOOD');
});

app.listen(port, () => {
    console.log(`${port} 생성 완료다`);
});