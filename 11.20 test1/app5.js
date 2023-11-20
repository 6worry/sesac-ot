const express = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');

const app = express();
const port = 3002;

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.get('/', (req, res) => {
    res.send('나의 메인 페이지');
});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});