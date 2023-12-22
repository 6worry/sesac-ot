const WebSocket = require('ws');

const port = 8080; // well-known port -- 정해져 있는 포트(번호) ex) 25 -- smtp, 22 -- ssh, 80 -- http, 21 -- ftp, 23 -- telnet etc..

const wss = new WebSocket.Server({ port: port });

wss.on ('listening', () => {
    console.log(`웹소켓 ${port}번에 대기중!`);
});

console.log('웹소켓 서버 시작');