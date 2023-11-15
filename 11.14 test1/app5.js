const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const Success = 200;
const Server_Error = 500;
const Not_Found = 404;

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);
    try{
        if(req.method === 'GET' && req.url.startsWith('/images/')) {
            // url 파싱해서 파일 불러와서 반환한다 3줄정도의 코드
            // const data = await fs.readFile('images/photo2.jpg') // 1개일 때 단일 파일로
            console.log(req.url);
            const filePath = '.' + req.url;
            console.log(filePath);
            const data = await fs.readFile(filePath); // 2개 이상일 때 
                res.writeHead(Success, {'Content-Type': 'image/jpg'});
                res.end(data);

        } else if(req.method === 'GET') {
            if(req.url === '/') {
                const data = await fs.readFile('./index.html');
                res.writeHead(Success, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);

            } else if (req.url === '/about') {
                const data = await fs.readFile('./about.html');
                res.writeHead(Success, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);
            } 
            // else if(req.url === '/photo3.jpg') {
            //     const data = await fs.readFile('images/photo3.jpg');
            //     res.writeHead(Success, {'Content-Type': 'image/jpg'});
            //     res.end(data);
            // }
             else {
                const imageMatch = req.url.match(/^\/images\/(.+)$/)
                if (imageMatch){
                    const imageName = imageMatch[1]
                    const imagePath = './static/'+ imageName;

                    try{
                        const contentType = getContentType(imagePath);
                        const data = await fs.readFile(imagePath)
                        res.writeHead(Success, {'Content-Type': contentType})
                        res.end(data)
                    }catch(err){
                        res.writeHead(Not_Found, {'Content-Type': 'text/plain; charset=utf-8'} );
                        res.end('Nothing!');
                    }
                }
                res.writeHead(Not_Found, {'Content-Type': 'text/plain; charset=utf-8'} );
                res.end('Nothing!');
            };
        } else if(req.method === 'POST') {
            //요청을 생성할 때 사용
            res.writeHead(201);
            res.end('등록 성공');
        } else if (req.method === 'PUT') {
            //요청을 수정할 때 사용
            res.end('수정 성공');
        }else if(req.method === 'DELETE') {
            //요청을 삭제할 때 사용
            res.end('삭제 성공');
        };
    } catch(err) {
        console.error('오류!', err.message);
        res.writeHead(Server_Error, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('오류발생');
    };
});

const port = 7600;
server.listen(port, () => {
    console.log(`${port}포트 연결함`);
});

//filePath - URL 경로를 기반으로 요청한 내용이 무엇인지 판단 후 Content-Type 반환
function getContentType(filePath){
    const extname = path.extname(filePath);
    switch (extname){
        case '.html':
            return 'text/html; charset=utf-8';
        case '.js' :
            return 'application/javascript; charset=utf-8 '
        case '.jpg' :
            return 'image/jpg'
        default:
            return 'applicatin/octer-stream'
    }
}