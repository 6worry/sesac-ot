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
app.use(express.urlencoded({extended: true})); // body-parser 미들웨어 추가


app.get('/', (req, res) => {
    const successMessage = req.flash('success');
    const errorMessage = req.flash('error');
    res.json({ successMessage, errorMessage });
});

app.get('/login', (req, res) => {
    const successMessage = req.flash('success');
    const errorMessage = req.flash('error');
    res.render('login', { successMessage, errorMessage})
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'pass') {
        req.flash('success', '로그인 성공');
    } else {
        req.flash('error', '로그인 실패! 다시 정확히 입력해라.')
    }

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`${port} 번 준비 완료!`);
});
