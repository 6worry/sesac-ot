const http = require('http');

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<H1>Hello</H1>');
    res.write('<p>ㅎㅇㅎㅇ</p>');
    res.write('<div>ㅎㅇㅎㅇ1</div>');
    res.write('<li>ㅎㅇㅎㅇ2</li>');
    res.write('<li>ㅎㅇㅎㅇ3</li>');
    res.write('<li>ㅎㅇㅎㅇ4</li>');
    res.end('<li>ㅎㅇㅎㅇ5</li>');

}).listen (7500, ()=>{
    console.log('7500번 포트 생성 완료!')
});

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<H1>Hello</H1>');
    res.end('<p>ㅎㅇㅎㅇ</p>');

}).listen (7501, ()=>{
    console.log('7501번 포트 생성 완료!')
});

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<H1>Hello</H1>');
    res.end('<p>ㅎㅇㅎㅇ</p>');

}).listen (7502, ()=>{
    console.log('7502번 포트 생성 완료!')
});