const express = require('express');
const nunjucks = require('nunjucks');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const debug = require('debug')('upload')

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape:true,
    express:app
}).addFilter('formatPostDate', function(date) {
    const option = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return new Date(date).toLocaleDateString('ko-KR', option);
});
debug.enabled = true;
// 게시글 담는 변수
let posts = [];

app.get('/', (req, res) => {
    res.render('index2', { posts }); // posts=posts를 {}로 대체해서 표현
});

app.get('/write', (req, res) => {
    res.render('write2');
});

// 파일 업로드를 위한 하수 정의
const upload = multer({
    dest: 'public/uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }, // 10mb 제한
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('사진 파일만 첨부해라'), false);
        };
        cb(null, true);
    }
});

app.post('/write', upload.single('photo'), (req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    // const photo = req.body.photo;
    const date = new Date();

    // const photo = req.file ? req.file.path: null;
    // const photo = req.file ? req.file.filename: null;
    const filepath = req.file ? req.file.path: null;
    const filename = filepath ? `${req.file.filename}`: null;
    const thumbnailpath = filepath ? `thumbnails/thumb_${req.file.filename}`: null;

    console.log(req.file)
    debug(req.file)
    posts.push({ title, content, filepath, filename, thumbnailpath, date });

    // 썸네일 생성
    if (filepath) {
        sharp(filepath)
        .resize(100) // 썸네일 크기
        .toFile(`public/${thumbnailpath}`, (err, info) => {
            if (err) {
                console.error(err);
            };
        });
    };

    res.redirect('/');
});

app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'public', 'uploads', filename);
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(filepath);
});

app.post('/delete/:index', (req, res) => {
    const index = req.params.index -1; // 실제 인덱스 변환
    const post = posts[index];
    console.log(posts)
    if (post.filepath) {
        fs.unlinkSync(post.filepath);
        const thumbpath = path.join(__dirname, 'public', post.thumbnailpath)
        fs.unlinkSync(thumbpath);
    };

    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1); // 해당 인덱스 항목 1개 삭제
    };

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`${port} 준비 완료`);
});