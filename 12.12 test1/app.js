const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const nunjucks = require('nunjucks');

const app = express();
const port = 3009;

nunjucks.configure('view', {
    express: app
});

app.set('view engine', 'html');
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
    // res.send(req.flash('info'));
    res.render('message', { messages: req.flash() });
});

app.listen(port, () => {
    console.log(`${port} 번 준비 완료!`);
});
