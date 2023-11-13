const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path:'test2.csv',
    header:[
        {id: 'column1', title: 'COULMN1'},
        {id: 'column2', title: 'COULMN2'} // 추가 헤더
    ],

});

const data = [
    {column1: '값 1', column2: '값2'},
    {column1: '값 3', column2: '값4'}
];

csvWriter.writeRecords(data)
    .then(() => console.log('csv 파일 생성 완료'));