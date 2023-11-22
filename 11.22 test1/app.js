const express = require('express');

const app = express();
const port = 3004;

app.use(express.json());

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
});

app.listen(port, () => {
    console.log(`${port}번 생성 완료`);
});