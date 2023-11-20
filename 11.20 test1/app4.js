const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = 3002;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.get('/page', (req, res) => {
    const data = {
        title: 'MY Page',
        content: 'I want to eat lunch'
    };
    res.render('page', data);
});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});