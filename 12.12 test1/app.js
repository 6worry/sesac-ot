const express = require('express');
const session = require('express-session');
const flash = require('express-flash');

const app = express();
const port = 3009;

app.use(session({
    secret: 'qwer',
    resave: false,
    saveUninitialized:true
}));

// flash 미들웨어 설정
app.use(flash());

app.get('/', (req, res) => {
    req.flash('info', 'Hi Hi');
    res.redirect('/message');
});

app.get('/message', (req, res) => {
    res.send(req.flash('info'));
});

app.listen(port, () => {
    console.log(`${port} 번 준비 완료!`);
});
