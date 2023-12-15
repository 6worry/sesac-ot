const nodemailer = require('nodemailer');
require('dotenv').config();

// 네이버 메일 서버 설정

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
    to: process.env.NAVER_ID,
    subject: '경 축! ',
    text: '당첨!'
};

// 이메일 발송

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error(err)
    } else {
        console.log('전송 성공:' + info.response);
    };
});