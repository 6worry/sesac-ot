const {readCSV, writeCSV} = require('./my-csv-library2');

const testData = [
    ['이름', '생년월일', '성별'],
    ['가나다', '20231231', '남'],
    ['라마바', '20220522', '여'],
    ['사아자', '20210908', '남'],
    ['차카타', '20200202', '여'],
];

const filePath = 'user.csv';
console.log('쓰기 시작');
writeCSV(filePath, testData, (err)=>{
    if (err){
        console.error('쓰기 오류!', err);
        return;
    }
    console.log('csv파일 생성 완료');
});
console.log('쓰기 종료');

console.log('읽기 시작');
readCSV(filePath, (err, data)=>{
    if (err){
        console.error('읽기 오류!', err);
        return;
    }
    console.log('csv파일 읽기 성공', data);
});
console.log('읽기 종료');