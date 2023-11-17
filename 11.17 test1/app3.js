const express = require('express');

const app = express();
const port = 3001;

// 정적 파일을 제공할 디렉토리 = 미들웨어를 통해 설정
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('HIIIOO')
});

app.get('/about', (req, res) => {
    res.send('SIUUUUU')
});

app.get('/user', (req, res) => {
    res.send('WOOOOWW')
});

app.get('/user/:id', (req, res) => { // /: = 라우트 파라미터
    const uid = req.params.id; // req.params. = 라우트 파라미터에 대한 변수, 라우터 파라미터는 이를 통해 접근 가능
    res.send(`파라미터 완료 ${uid}님`)
});

app.get('/user/:id/profile', (req, res) => { // /: = 라우트 파라미터
    const uid = req.params.id; // req.params. = 라우트 파라미터에 대한 변수, 라우터 파라미터는 이를 통해 접근 가능
    res.send(`
    <HTML>
    <BODY>
    <H1>${uid}님의 프로필</H1>
    <p>내 프로필: </p>
    <img src="/images/photo3.jpg">
    </BODY>
    </HTML>
    `);
});

// 미들웨어를 통한 존재하지 않는 페이지 정의
app.use((req, res) =>{
    res.status(404).send(`
    <H1>Page Is Noting</H1>
    `);
});

// GET 파라미터
  // ex) search?keyword=jin
app.get('/search', (req, res) => {
    const keyword = req.query.keyword; // req.query를 통해 GET 파라미터 전달
    res.send(`입력한 키워드: ${keyword}`);
});

  // ex) shopping?category=drink&item=beer
app.get('/shopping', (req, res) => {
    const category = req.query.category; // req.query를 통해 GET 파라미터 전달
    const item = req.query.item;
    res.send(`입력한 키워드: ${category}의 ${item}이다`);
});

// POST 

// 서버 생성
app.listen(port, () => {
    console.log(`${port} 포트 생성`);
});