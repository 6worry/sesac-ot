const express = require('express');
const app = express();
const userRouter = require('./userRouter');
const port = 3002;

app.use('/user', userRouter);
app.use('/product', userRouter);

app.get('/', (req, res) => {
    res.send('나의 메인 페이지')
});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});