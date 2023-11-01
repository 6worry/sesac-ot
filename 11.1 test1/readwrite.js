const fs = require('fs');

// 파일 읽기

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err){
        console.log('파일을 읽는데 오류 발생', err);
        return;
    }
    console.log('파일 내용:', data);
});


fs.readFile('example.txt', 'utf8', readFileCallback);

function readFileCallback(err,data){
    if (err){
        console.log('파일을 읽는데 오류 발생', err);
        return;
    }
    console.log('파일 내용:', data);
};
// 파일 쓰기
const content = "하이요"
fs.writeFile('newFile.txt', content, 'utf8', (err) => {
    if(err) {
        console.error('파일 결과 오류', err);
        return;
    }
    console.log('파일 결과 기록 성공');
});

//파일 복사
fs.copyFile('newFile.txt', 'newFile2.txt', (err) =>{
    if (err){
        console.error("파일 복사 중 오류", err);
        return;
    }
    console.log('파일 복사 성공');
});
