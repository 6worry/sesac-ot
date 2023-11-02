const http = require('http');

//요청하고 싶은 주소 정의

const options ={
    hostname: 'www.naver.com',
    port: 80,
    path: '/',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`상태코드: ${res.statusCode}`);
    res.on('data', (chunk) =>{
        console.log(`데이터수신: ${chunk}`);
    })
});

req.on('error', (error) =>{
    console.error(`요청중 오류 발생, ${error}`);
})

req.end();

