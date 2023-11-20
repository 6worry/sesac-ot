const express = require('express');

const app = express();
const port = 3002;

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});