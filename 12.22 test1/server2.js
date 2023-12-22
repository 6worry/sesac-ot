const WebSocket = require('ws'); // npm 설치해야함!
const express = require('express');
const path = require('path');

const app = express();
const port = 8080; // well-known port -- 정해져 있는 포트(번호) ex) 25 -- smtp, 22 -- ssh, 80 -- http, 21 -- ftp, 23 -- telnet etc..
const express_port = 3001;

const wss = new WebSocket.Server({ port: port });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client2.html'));
});

wss.on('listening', () => {
    console.log(`웹소켓 ${port}번에 대기중!`); // 웹소켓 연결 대기 즉, 소켓을 열고 대기 하는 것임.
});
    
wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log('클라이언트 접속함', clientIp); // 소켓 연결 요청온 것에 대하여 처리함
        
    ws.on('message', (message) => {
        console.log(message.toString()); // 연결된 이후 내부 메세지 처리하는 부분 

        let parsedMessage = "";

        try {
            parsedMessage = JSON.parse(message); // 받은 문자열 파싱하여 객체 형태로 만듬
            console.log(parsedMessage);
            console.log(clientIp, parsedMessage.content);
            // console.log(parseMessage.content); // 글자만 빼내여 출력도 가능
        } catch (error) {
            console.error('JSON 포멧 없음', error);
            return;
        };

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) { // 모든 클라이언트에게 메세지 재전송
                const messageType = client === ws ? 'sent' : 'received';
                const messageObj = { type: messageType, content: parsedMessage.content};
                client.send(JSON.stringify(messageObj));
            };
        });
    });
        
        
    ws.on('close', () => {
        // 연결된 이후 연결 종료를 처리하는 부분
    });
});

app.listen(express_port, () => {
    console.log(`${express_port} 준비 완료`);
});

console.log('채팅 서버 시작');