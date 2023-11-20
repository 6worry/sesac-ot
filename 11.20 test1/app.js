const express = require('express');
const app = express();
const port = 3002;

app.use('/public', express.static('public'));
app.use('/public', express.static('images'));

app.get('/', (req, res) => {

});

app.listen(port, () => {
    console.log(`${port}번 실행 완료`);
});