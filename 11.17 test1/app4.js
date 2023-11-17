const express = require('express');
const app = express();
const port = 3001;

// 미들웨어를 통한 body 데이터 처리
// 본디 body-parser 모듈이였지만 현재는 built-in express 모듈을 사용할 예정
app.use(express.json());

app.post('/submit', (req, res) => {
    let data = '';

    req.on('data', (body) => {
        data += body;
    });
    req.on('end', () => {
        try {
            console.log(data);
            const jsonData = JSON. parse(data);
            res.json({receiveData: jsonData});
        } catch(err) {
            res.status(400).json({err: "입력값이 잘못됐다."});
        };
    });

    // req.status(201);
    // res.end();
    // res.status(201).end();
});

app.post('/submit2', (req, res) => {
    const jsonData = req.body;
    console.log(jsonData);
    res.json({receiveData: jsonData});
});


app.listen(port, () => {
    console.log(`${port}번 생성 완료`);
});