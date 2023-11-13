const fs = require('fs');

const filePath ='test.csv';

const dataTowrite = [
    ['Column1', 'Column2'],
    ['Column3'],
    ['Value1', 'Value2'],
    ['Value3', 'Value4'], // 추가 데이터 추가
];

//데이터 변환 작업 필요!
// const csvContent = dataTowrite.map((row) => row.join(',')).join('\n');
// console.log(csvContent);

let csvContent = '';
for (let i=0;i<dataTowrite.length; i++){
    csvContent += dataTowrite[i].join(',');
    if(i<dataTowrite.length -1){
        csvContent += '\n';
    }
    console.log(dataTowrite[i]);
    console.log(csvContent);
}

fs.writeFile(filePath, csvContent, 'utf8', (err) => {
    if(err){
        console.error('에러!에러!');
        return;
    };
    console.log('파일 생성 성공');
});