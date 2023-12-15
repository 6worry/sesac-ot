const request = require('request');
require('dotenv').config();

const client_id = process.env.NAVER_CLIENT1;
const client_secret = process.env.NAVER_CLIENT1_SECRET;
const text = '하이요'
const encText = encodeURIComponent(text);
const url = `https://openapi.naver.com/v1/search/blog.json?query=${encText}`
const headers = {
    'X-Naver-Client-Id':client_id, 
    'X-Naver-Client-Secret': client_secret
 };

 request.get({
    url: url,
    headers: headers,
 }, (error, response, body) => {
    if (error) {
        console.log('요청 실패');
    } else {
        const data = JSON.parse(body);
        console.log(data);
    };
 });

 console.log('THE END');