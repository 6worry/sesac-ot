const express = require('express');
const path = require('path');

const app = express();
const port = 3004;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const users = [
    {id: 1, userid: 'user1', userpw: 'pw1'},
    {id: 2, userid: 'user2', userpw: 'pw2'}
];

app.post('/login', (req, res) => {
    const { userid, userpw } = req.body;
    console.log(userid, userpw);

    const user = users.find((u) => 
        u.userid === userid
        && u.userpw === userpw
    );

    if (user) {
        console.log('로그인 성공');
        res.json({message: 'login success'});
    } else {
        console.log('로그인 실패');
        res.status(401).json({message: 'login fail'});
    };
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`${port}번 생성 완료`);
});