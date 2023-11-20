const express = require('express');
const path = require('path');

const app = express();
const port = 3002;
const users = {};

app.use('/static', express.static('public/static'));
app.use('/images', express.static('public/static'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'new about.html'));
});

app.get('/user', (req, res) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});