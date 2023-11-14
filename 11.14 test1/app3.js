const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res)=>{
    try{
        const data = await fs.readFile('./server.html')
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'})
        res.end('오류발생!');
        // res.end(err.message);
    }
})
    .listen(8000,()=>{
        console.log('8000번 포트 열었다.');
    });