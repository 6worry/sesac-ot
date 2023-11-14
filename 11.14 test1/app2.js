const http = require('http');

const server = http.createServer((req, res)=>{
    //헤더
    res.writeHead(200, {'Content-Type': 'text/html; charset-utf-8'})
    //본문(Body)
    res.write('<H1>my first Was server</H1>')
    res.end('<p> 안녕:)</p>')
});

server.listen(4001, ()=>{
    console.log('서버 4001에 연결됨. 준비 완료!');
});

