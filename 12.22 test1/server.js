const WebSocket = require('ws'); // npm 설치해야함!

const port = 8080; // well-known port -- 정해져 있는 포트(번호) ex) 25 -- smtp, 22 -- ssh, 80 -- http, 21 -- ftp, 23 -- telnet etc..

const wss = new WebSocket.Server({ port: port });

wss.on('listening', () => {
    console.log(`웹소켓 ${port}번에 대기중!`); // 웹소켓 연결 대기 즉, 소켓을 열고 대기 하는 것임.
});
    
wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log('클라이언트 접속함', clientIp); // 소켓 연결 요청온 것에 대하여 처리함
        
    ws.on('message', (message) => {
        console.log(message.toString()); // 연결된 이후 내부 메세지 처리하는 부분 

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) { // 모든 클라이언트에게 메세지 전송
                client.send(message.toString());
            };
        });
    });
        
        
    ws.on('close', () => {
        // 연결된 이후 연결 종료를 처리하는 부분
    });
});

console.log('웹소켓 서버 시작');