const http = require('http');
const fs = require('fs').promises;
const path = require('path');
// const querystring = require ('querystring');
// = const parse = querystring.parse;
// =
//객체 디스트럭처링 (de-structuring)
const {parse} = require('querystring')

const Success = 200;
const Server_Error = 500;
const Not_Found = 404;

const users={};

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
            } else if (req.url ==='/user') {
                res.writeHead(Success, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end(JSON.stringify(users)); // JSON 파일을 문자열로 바꿔줌
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
            if(req.url ==='/user'){

                //요청을 생성할 때 사용
                //요청 request를 파싱해서 처리함
                //데이터 전송 명령어: curl -X POST 127.0.0.1:3000/user -H "Content-Type: multipart/form-data" -d "name=aaa"
            
                let body='';
                req.on('data', (data)=>{
                body += data
                });
                req.on('end', ()=>{
                console.log('요청내용:', body);
                const formData = parse(body)
                console.log('파싱 이후:', formData);
                
                const username = formData.name;
                console.log('사용자 이름:', username);
                
                users[username] = username;
                console.log('최종객체:', users)
            });
            
            //결과 response를 주는 코드
                res.writeHead(201, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end('등록 성공');
            }
        } else if (req.method === 'PUT') {

            //요청을 수정할 때 사용
            //수정 명령어 : curl -X PUT 127.0.0.1:7600/user/aaa -d "name=bbb"

            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data)=>{
                    body += data
                });
                req.on('end', ()=>{
                console.log('요청내용:', body);
                delete users[key]
                const formData = parse(body)
                users[key] = formData.name;
                // const username = formData.name;
                // console.log('사용자 이름:', username);
                
                // users[username] = username;
                // console.log('최종객체:', users)
                });
            }

            //요청에 대한 응답결과 출력
            res.writeHead(Success, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('수정 성공');

        }else if(req.method === 'DELETE') {

            //요청을 삭제할 때 사용
            //요청에 대한 파싱
            //삭제 명령어 : curl -X DELETE 127.0.0.1:7600/user/aaa
            //1. url에 /users/ 시작하는걸 찾고
            //2. 그 뒤에 있는 글자를 읽어서 key 처리
            //3. 그 키를 users라는 객체안에서 삭제
            
            // if(req.url.startsWith('/user')){
            try {
                const key = req.url.split('/')[2];
                delete users[key];
            
                //요청에 대한 응답결과
                res.writeHead(Success, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end('삭제 성공');
            } catch (err) {
                console.error('삭제중 오류:', err)
                res.writeHead(Server_Error, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end('삭제 오류');
            }
        } else {
            res.writeHead(Not_Found);
            res.end('Not Found')
        }
            
        
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