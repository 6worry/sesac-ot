const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const Success = 200;
const Create = 201;
const Server_Error = 500;
const Not_Found = 404;
const StaticFolder = './static'

async function createStaticFolder(){
    try{
        await fs.access(StaticFolder) // 파일 및 폴더 접근 여부 확인
    }catch(err){
        if(err.code === 'ENOENT') { // ENOENT = 파일 및 디렉토리 찾을 수 없음을 뜻하는 에러코드
            await fs.mkdir(StaticFolder) // 폴더 없을 시 폴더 생성
        } else {
            console.log('오류!오류!', err);
        }
    }
}

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);
    try{
        await createStaticFolder();

        if(req.method === 'GET' && req.url.startsWith('/static/')) {
            const FolderPath = path.join(StaticFolder, req.url.slice('/static/'.length)); // slice = /static/ 이후의 경로만 가져오기 위해 사용
            const data = await fs.readFile(FolderPath);
            if(req.url.startsWith('/static/images')){
                res.writeHead(Success, {'Content-Type': 'image/jpg'});
                res.end(data);            
            } else if(req.url.startsWith('/static/css')){
                res.writeHead(Success, { 'Content-Type': 'text/css' });
                res.end(data);
            } else if(req.url.startsWith('/static/js')){
                res.writeHead(Success, {'Content-Type': 'application/javascript'});
                res.end(data);
            }
            // const data = await fs.readFile('images/photo2.jpg') // 1개일 때 단일 파일로
            // const data = await fs.readFile(`./${req.url}`); // 2개 이상일 때 
            // res.writeHead(Success, {'Content-Type': 'image/jpg'});
            // res.end(data);
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
                res.writeHead(Not_Found, {'Content-Type': 'text/plain; charset=utf-8'} );
                res.end('Nothing!');
            };
        } else if(req.method === 'POST') {
            //요청을 생성할 때 사용
            res.writeHead(Create);
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