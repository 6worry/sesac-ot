const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const Success = 200;
const Server_Error = 500;
const Not_Found = 404;

const staticFolder = './static';

// Ensure that the static folder exists
async function ensureStaticFolder() {
    try {
        await fs.access(staticFolder);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Folder doesn't exist, create it
            await fs.mkdir(staticFolder);
        } else {
            throw error;
        }
    }
}

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);
    try {
        await ensureStaticFolder();

        if (req.method === 'GET' && req.url.startsWith('/static/')) {
            const filePath = path.join(staticFolder, req.url.slice('/static/'.length));
            const data = await fs.readFile(filePath);
            const contentType = 'image/jpg'; // Adjust content type based on file type
            res.writeHead(Success, { 'Content-Type': contentType });
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
    } catch (err) {
        console.error('오류!', err.message);
        res.writeHead(Server_Error, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('오류발생');
    }
});

const port = 7600;
server.listen(port, () => {
    console.log(`${port}포트 연결함`);
});
