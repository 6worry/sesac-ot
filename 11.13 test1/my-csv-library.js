const fs = require('fs');

function readCSV(filePath, callback){ // 파일이 성공적으로 읽혔을 때 callback(err, result) 형태로 반환
    fs.readFile(filePath, 'utf8', (err, data) => {
    // 저 파일을 읽어서 화면에 출력
        if(err){
        console.error('오류!오류!', err);
        return callback(err, null);
        };

        const rows = data.split('\n');
        const result = rows.map((row) => row.split(','));
        callback (null, result);
    });
}
function writeCSV(filePath, dataTowrite, callback){ //파일이 성공적으로 쓰였을 때 callback(err) 형태로 반환되고 성공시 아무런 값도 반환되지 않음
    const csvContent = dataTowrite.map((row) => row.join(',')).join('\n');
    fs.writeFile(filePath, csvContent, 'utf8', (err) => {
        if(err){
            console.error('에러!에러!', err);
            return callback(err);
        };
        callback(null);
    });
}

module.exports = {readCSV, writeCSV};