const express = require('express');
const session = require('express-session');

const app = express();
const port = 3004;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: 'my-key2',
    resave: false,
    saveUninitialized: true
}));

const users = [
    {id: 1, userid: 'user1', userpw: 'pw1'},
    {id: 2, userid: 'user2', userpw: 'pw2'}
];

app.get('/', (req, res) => {
    res.send('Login 하시오');
});

app.get('/profile', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({userid: user.userid, message: '프로필 정보'})
    } else {
        res.status(401).json({message: '로그인을 하라고'});
    };
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('삭제오류', err);
            res.status(500).json({message: '실패!'});
        } else {        
            console.log('로그아웃 성공');
            res.json({message: 'logout success'});
        };
    });
});

app.post('/login', (req, res) => {
    const { userid, userpw } = req.body;
    console.log(userid, userpw);

    const user = users.find((u) => 
        u.userid === userid
        && u.userpw === userpw
    );

    if (user) {
        console.log('로그인 성공');
        req.session.user = user;
        res.json({message: 'login success'});
    } else {
        console.log('로그인 실패');
        res.status(401).json({message: 'login fail'});
    };
});


app.listen(port, () => {
    console.log(`${port}번 생성 완료`);
});