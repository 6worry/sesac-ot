const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = 3002;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');
// app.set('views', __dirname + '내 디렉토리');

app.get('/', (req, res) => {
    res.render('index', {title: 'THIS IS NUNJUCKS', message: '지금은 오후 2시 20분'})
});

app.get('/greeting', (req, res) => {
    const username = '진영록';

    res.render('greeting', {username: username});
});

app.get('/welcome', (req, res) => {
    const Admin = true;
    res.render('welcome', {Admin: Admin});
});

app.get('/fruits', (req, res) => {
    const fruits = ['Apple', 'Lemon', 'Grapes'];
    res.render('fruits', {fruits: fruits});
});

app.get('/page', (req, res) => {
    const data = {
        title: 'MY Page',
        content: 'I want to eat lunch'
    };
    res.render('main', data);
});

app.listen(port, () => {
    console.log(`${port}번 실행 굳굳`);
});