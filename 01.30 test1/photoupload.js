const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended:true }));
app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape:true,
    express:app
}).addFilter('formatPostDate', function(date) {
    const option = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return new Date(date).toLocaleDateString('ko-KR', option);
});

// 게시글 담는 변수
let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts }); // posts=posts를 {}로 대체해서 표현
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/write', (req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    const date = new Date();
    posts.push({ title, content, date });

    res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
    const index = req.params.index -1; // 실제 인덱스 변환
    
    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1); // 해당 인덱스 항목 1개 삭제
    };

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`${port} 준비 완료`);
});