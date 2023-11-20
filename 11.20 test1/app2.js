const express = require('express');

const app = express();
const port = 3002;

app.set('view engine', 'ejs');

app.get('/', (req, res) => { // 템플릿 엔진을 통해 렌더링 필요
    res.render('index', {title: 'THIS IS EXPRESS', message: '계획대로 되고 있어'});
});

app.get('/greeting', (req, res) => {
    const username = '진영록';

    res.render('greeting', {username: username})
});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});