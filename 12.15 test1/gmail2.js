const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');

const app = express();
const port = 3002;

require('dotenv').config();

app.get('/', (req, res) => {
    // 네이버 메일 서버 설정
    function mailmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: 'smtp.naver.com',
        // port: 465,
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASS,
        }
    })
    
    // 이메일 내용 정의
    
    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: process.env.GMAIL_ID,
        subject: '회원가입 인증코드',
        text: '인증코드: ' + Math.floor(Math.random() * 1000)
    };
    
    // 이메일 발송
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err)
        } else {
            console.log('전송 성공:' + info.response);
        };
    });
}
    res.sendFile(path.join(__dirname, 'randomcode.html'));
    
});

app.get('/sign', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end('<h1>회원가입</h1>' +
    '<p>인증코드 발송되었음</p>' +
    '<p>인증코드: <input type="text" name="" id=""> ' +
    '<button type="submit">인증코드 확인</button></p>')
})

app.listen(port, () => {
    console.log('출력완료')
})






