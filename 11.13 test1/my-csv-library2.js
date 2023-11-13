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
    //의도적으로 한줄한줄 느리게 쓰기위한 데모코드
    // 한줄씩 처리하도록 setTimeout을 통해 지연 처리

    let currentIndex = 0;

    function writeLine(){
        if (currentIndex < dataTowrite.length){
            const line = dataTowrite[currentIndex].join(',')
            fs.appendFile(filePath, line + '\n', 'utf8', (err) =>{
                if (err){
                    console.error('쓰기 오류', err)
                    return callback(err);
                }

                currentIndex++;
                setTimeout(writeLine, 100);
            });
        } else {
            callback (null);
        }
    }
    writeLine();
}
    
module.exports = {readCSV, writeCSV};