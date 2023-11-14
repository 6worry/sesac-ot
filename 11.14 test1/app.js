const http = require('http');

const server = http.createServer();

server.on('request', function(){
    console.log('요청 들어옴');
});

server.on('connection', function(){
    console.log('연결됨');
});

server.on('close', function(){
    console.log('연결 종료');
});

console.log('시작');
server.listen(4001); // 서버가 시작 및 대기
console.log('종료');

