const http = require('http');
const port = 3004;
const Success = 200;

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(Success, {'set-cookie' : 'mycookie=test'});
    res.end("BYE BYE");
});

server.listen(port, () => {
    console.log(`${port} 생성 완료`);
});